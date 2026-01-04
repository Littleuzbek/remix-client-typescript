import kr from "../../assets/lgKR.jpg";
import uz from "../../assets/lgUZ.webp";
import ru from "../../assets/lgRU.png";
import globe from "../../assets/globe.png";
import { useEffect, useState } from "react";
import { editLanguage } from "../Extra/Translation";

type langArray = {
  pic: string | undefined;
  text: string;
};

export default function Language() {
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
  const [currLang, setCurrLang] = useState<langArray | null>(null);

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
    <div className="relative cursor-pointer group">
      <div className="flex gap-[.5rem] items-center">
        <img src={currLang?.pic || globe} className="w-[30px] h-[30px] object-cover" alt="" />
        <h3>{currLang?.text}</h3>
      </div>
      <div className="hidden flex-col absolute bg-[white] group-hover:flex z-3">
        {langArr
          .filter((l) => l.text !== currLang?.text)
          .map((lang) => (
            <button
              className="flex gap-[.5rem] items-center hover:bg-[var(--first-color)] hover:scale-[1.2] p-[5px] hover:text-[.7rem]  hover:text-[white] duration-300 rounded-[5px] border-none bg-transparent"
              key={lang.text}
              onClick={() => LanguageHandler(lang)}
            >
              <img
                src={lang.pic}
                className="w-[30px] h-[30px] object-cover"
                alt=""
              />
              <h3>{lang.text}</h3>
            </button>
          ))}
      </div>
    </div>
  );
}
