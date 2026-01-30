import { useEffect, useRef, useState } from "react";
import { useNavigate } from "@remix-run/react";
import { onAuthStateChanged } from "firebase/auth";
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
import { auth } from "~/firebase";
import MobileLanguage from "./MobileLanguage";
import uzFlag from "../../../assets/lgUZ.webp";
import ruFlag from "../../../assets/lgRU.png";
import krFlag from "../../../assets/lgKR.jpg";
import { useSelector } from "react-redux";
import { RootState } from "~/root";

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
  // const dispatch = useDispatch();
  const cart = useSelector((state: RootState) => state.cart.cart);

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

    {
      icon: Heart,
      label: "Heart",
      arc: "outer",
      func: () => {
        setDrop(true);
      },
    },
    { icon: Heart, label: "Favorites", arc: "outer", navigation: "/favourite" },
    {
      icon: User,
      label: "User",
      arc: "outer",
      func: () => {
        handleNavigation();
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

  const handleNavigation = (): void => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUserMenu(true);
      } else {
        navigate("/authentication");
      }
    });
  };

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

  useEffect(() => {
    setDefaultLanguageAction();
    // eslint-disable-next-line
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
                <img
                  src={currLang?.pic}
                  alt=""
                  className="size-6 text-white object-contain"
                />
              ) : (
                  <div className="relative">
                    <div
                      className={`${
                        item.label === "Cart" && cart?.length
                          ? "text-bold text-white absolute top-[-15px] right-0 left-0"
                          : "hidden"
                      }`}
                    >
                      {cart?.length}
                    </div>
                    <ItemIcon
                      className={`${isOuter ? "size-5" : "size-6"} text-white`}
                    />
                  </div>
              )}
            </button>
          );
        })}

        <button
          className="size-14 bg-[var(--first-color)] rounded-full grid place-items-center  shadow-xl transition-transform"
          onClick={() => setOpen(!open)}
        >
          <Icon className="size-7 text-white" />
          <p
            className={`${cart?.length ? "" : "hidden"} ${
              open ? "hidden" : ""
            } absolute text-white right-0 top-[-10px] bg-[var(--first-color)] rounded-full px-[10px]`}
          >
            {cart?.length}
          </p>
        </button>
        <style>{`
        .menu-item {
          --x: 0px;
          --y: 0px;
        }
      `}</style>
      </div>

      {userMenu && (
        <MobileUser
          currLangVal={currLang}
          onSetDrop={() => setDrop(true)}
          onNavigate={() => setUserMenu(false)}
        />
      )}

      {drop && (
        <MobileLanguage
          onCurrLang={setCurrLang}
          onSetDrop={() => setDrop(false)}
          currLangVal={currLang}
        />
      )}
    </div>
  );
};

export default MobileHeader;
