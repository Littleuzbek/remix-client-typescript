import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "@remix-run/react";
import {
  ArrowLeftToLine,
  BadgeQuestionMark,
  FileUser,
  ShoppingBag,
  X,
} from "lucide-react";
import { autoPicture } from "../Extra/Extra";
import { RootState } from "~/root";
import { auth } from "~/firebase";
import { UserData } from "~/utils";
import { editLanguage, translateText } from "../Extra/Translation";
import kr from "../../assets/lgKR.jpg";
import uz from "../../assets/lgUZ.webp";
import ru from "../../assets/lgRU.png";
import globe from "../../assets/globe.png";

type langArray = {
  pic: string | undefined;
  text: string;
};

export default function MobileUser({ onNavigate }: { onNavigate: () => void }) {
  const userInfo = useSelector(
    (state: RootState) => state.cart.user
  ) as UserData | null;
  const [picture, setPicture] = useState<string | null>(null);
  const [currLang, setCurrLang] = useState<langArray | null>(null);
  const [drop, setDrop] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    const getUserImages = async () => {
      const image = await autoPicture();

      setPicture(image);
    };

    getUserImages();
  }, []);

  const userNavigation = [
    {
      id: "orders",
      icon: ShoppingBag,
      label: translateText()?.userControlOrders,
      navigation: `/user/${auth?.currentUser?.uid}/orders`,
    },
    {
      id: "user",
      icon: FileUser,
      label: translateText()?.userControlInfo,
      navigation: `/user/${auth?.currentUser?.uid}/main`,
    },
    {
      id: "support",
      icon: BadgeQuestionMark,
      label: translateText()?.userControlSupport,
      navigation: `/user/${auth?.currentUser?.uid}/support`,
    },
  ];

  const langArr = [
    {
      pic: uz,
      text: "UZ",
    },
    {
      pic: kr,
      text: "KR",
    },
    {
      pic: ru,
      text: "RU",
    },
  ];

  function setDefaultLanguageAction() {
    const savedLanguage = localStorage?.getItem("exkoLang");
    if (savedLanguage === null) {
      localStorage.setItem("exkoLang", "UZ");
    } else {
      if (savedLanguage === "UZ") return setCurrLang(langArr[0]);
      if (savedLanguage === "KR") return setCurrLang(langArr[1]);
      if (savedLanguage === "RU") return setCurrLang(langArr[2]);
    }
  }

  const LanguageHandler = (lang: langArray) => {
    editLanguage(lang.text);
    setCurrLang(lang);
  };

  useEffect(() => {
    setDefaultLanguageAction();
  }, []);

  return (
    <div className="flex flex-col fixed z-3 top-[0] left-[0] right-[0] bottom-[0] bg-[white]">
      <div className="w-full h-fit py-[10px] flex flex-col items-center justify-center">
        <img src={picture || ""} alt="" className="w-[13rem] h-[13rem]" />
        <h1 className="text-[var(--first-color)]">{userInfo?.name || "..."}</h1>
      </div>

      <div className="grid grid-cols-2 gap-[5px]">
        {userNavigation.map((key, i) => (
          <button
            className="h-[6rem] flex flex-col items-center justify-center gap-[5px] text-[18px] border-none bg-transparent text-[black]"
            key={i + "btn"}
            onClick={() => {
              onNavigate();
              return (
                key.id === "language" || navigate(key.navigation as string)
              );
            }}
          >
            <key.icon className="w-[30px] h-[30px]" />
            {key.label}
          </button>
        ))}
        <button className="h-[6rem] flex flex-col items-center justify-center gap-[5px] text-[18px] border-none bg-transparent text-[black]" onClick={()=> setDrop(!drop)}>
          <img
            src={currLang?.pic || globe}
            alt=""
            className="w-[30px] h-[30px] object-cover"
          />
          {currLang?.text}
          {drop && <div className="flex flex-col justify-center items-center absolute inset-px  bg-[white]">
            <button
                  className="flex gap-[.5rem] p-[1rem] items-center hover:bg-[var(--first-color)] hover:p-[5px] hover:text-[white] duration-300 rounded-[5px] border-none bg-transparent"
                  key="close"
                  onClick={() => setDrop(false)}
                >
                  <X />
                  <h2>{translateText()?.userControlLangClose}</h2>
                </button>
            {langArr
              .filter((l) => l.text !== currLang?.text)
              .map((lang) => (
                <button
                  className="flex gap-[.5rem] p-[1rem] items-center hover:bg-[var(--first-color)] hover:p-[5px] hover:text-[white] duration-300 rounded-[5px] border-none bg-transparent"
                  key={lang.text}
                  onClick={() => LanguageHandler(lang)}
                >
                  <img
                    src={lang.pic}
                    className="w-[60px] h-[60px] object-cover"
                    alt=""
                  />
                  <h2>{lang.text}</h2>
                </button>
              ))}
          </div>}
        </button>
        <button className="h-[6rem] flex flex-col items-center justify-center gap-[5px] text-[18px] border-none bg-transparent text-[black]">
          <ArrowLeftToLine /> {translateText()?.userControlExit}
        </button>
        <button
          className="h-[6rem] flex flex-col items-center justify-center gap-[5px] text-[18px] border-none bg-transparent text-[black]"
          onClick={() => onNavigate()}
        >
          <X /> {translateText()?.userControlMenuClose}
        </button>
      </div>
    </div>
  );
}
