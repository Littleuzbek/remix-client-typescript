import { useEffect, useRef, useState } from "react";
import { useNavigate } from "@remix-run/react";
// import { onAuthStateChanged } from "firebase/auth";
import {
  ArrowUp,
  Heart,
  ShoppingCart,
  User,
  X,
  Menu,
  Home,
} from "lucide-react";
import MobileUser from "./MobileUser";
// import { auth } from "~/firebase";
import uzFlag from "../../assets/lgUZ.webp";
import ruFlag from "../../assets/lgRU.png";
import krFlag from "../../assets/lgKR.jpg";
import { editLanguage, translateText } from "../Extra/Translation";

type langArray = {
  pic: string | undefined;
  text: string;
};

const MobileHeader = () => {
  const [userMenu, setUserMenu] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);
  const [currLang, setCurrLang] = useState<langArray | null>(null);
  const [drop, setDrop] = useState<boolean>(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const Icon = open ? X : Menu;
  const navigate = useNavigate();

  const menuItems = [
    {
      icon: ArrowUp,
      label: "Up",
      arc: "inner",
      func: () => {
        if (!window) return;
        window.scrollTo(0, 0);
      },
    },
    { icon: ShoppingCart, label: "Cart", arc: "inner", navigation: "/cart" },
    { icon: Home, label: "Home", arc: "inner", navigation: "/" },

    { icon: Heart, label: "Heart", arc: "outer", func: () => {setDrop(true)} },
    { icon: Heart, label: "Favorites", arc: "outer", navigation: "/favourite" },
    {
      icon: User,
      label: "User",
      arc: "outer",
      func: () => {
        setUserMenu(true);
      },
    },
  ];

  const langArr = [
    {
      pic: uzFlag,
      text: "UZ",
    },
    {
      pic: krFlag,
      text: "KR",
    },
    {
      pic: ruFlag,
      text: "RU",
    },
  ];

  // const handleNavigation = (): void => {
  //   const userData = sessionStorage.getItem("userData");
  //   if (userData) {
  //     setUserMenu(true);
  //     return;
  //   }

  //   onAuthStateChanged(auth, async (user) => {
  //     if (user) {
  //       setUserMenu(true);
  //     } else {
  //       navigate("/authentication");
  //     }
  //   });
  // };

  useEffect(() => {
    if (!menuRef.current) return;

    const buttons = menuRef.current.querySelectorAll<HTMLElement>(".menu-item");

    const innerRadius = 80;
    const outerRadius = 140;
    const startAngle = 90;
    const endAngle = 180;

    const innerItems: HTMLElement[] = [];
    const outerItems: HTMLElement[] = [];

    buttons.forEach((btn, index) => {
      if (index < 3) innerItems.push(btn);
      else outerItems.push(btn);
    });

    innerItems.forEach((btn, index) => {
      const angle =
        startAngle +
        (index * (endAngle - startAngle)) / (innerItems.length - 1);
      const radian = (angle * Math.PI) / 180;
      const x = Math.cos(radian) * innerRadius;
      const y = -Math.sin(radian) * innerRadius;

      btn.style.setProperty("--x", `${x}px`);
      btn.style.setProperty("--y", `${y}px`);
    });

    outerItems.forEach((btn, index) => {
      const angle =
        startAngle +
        (index * (endAngle - startAngle)) / (outerItems.length - 1);
      const radian = (angle * Math.PI) / 180;
      const x = Math.cos(radian) * outerRadius;
      const y = -Math.sin(radian) * outerRadius;

      btn.style.setProperty("--x", `${x}px`);
      btn.style.setProperty("--y", `${y}px`);
    });
  }, [open]);

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
    <div className="lg:hidden">
      {open && (
        <button
          className="inset-0 fixed z-3 bg-black opacity-50"
          onClick={() => setOpen(false)}
        ></button>
      )}

      <div ref={menuRef} className="fixed bottom-4 right-4 z-3">
        {menuItems.map((item, index) => {
          const ItemIcon = item.icon;
          const isOuter = item.arc === "outer";

          return (
            <button
              key={index}
              className={`menu-item ${
                isOuter ? "size-11" : "size-12"
              } bg-[var(--first-color)] rounded-full grid place-items-center absolute shadow-lg`}
              style={{
                transform: open
                  ? "translate(var(--x), var(--y)) scale(1)"
                  : "translate(0, 0) scale(0)",
                opacity: open ? 1 : 0,
                transition: "all 0.2s ease",
                transitionDelay: open ? `${index * 0.025}s` : "0s",
                pointerEvents: open ? "auto" : "none",
              }}
              onClick={() => {
                item?.navigation
                  ? navigate(item.navigation)
                  : item.func && item.func();
                setOpen(false);
              }}
            >
              {index === 3 ? (
                <img src={uzFlag} alt="" className="size-6 text-white" />
              ) : (
                <ItemIcon
                  className={`${isOuter ? "size-5" : "size-6"} text-white`}
                />
              )}
            </button>
          );
        })}

        <button
          className="size-14 bg-[var(--first-color)] rounded-full grid place-items-center relative z-10 shadow-xl transition-transform hover:scale-110"
          onClick={() => setOpen(!open)}
        >
          <Icon className="size-7 text-white" />
        </button>
        <style>{`
        .menu-item {
          --x: 0px;
          --y: 0px;
        }
      `}</style>
      </div>

      {userMenu && <MobileUser currLangVal={currLang} onSetDrop={()=> setDrop(true)} onNavigate={() => setUserMenu(false)} />}
        
      {drop && <div className="flex flex-col justify-center items-center fixed z-4 inset-0  bg-white">
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
    </div>
  );
};

export default MobileHeader;
