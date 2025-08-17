import { useState } from "react";
import { useLocation, useNavigate } from "@remix-run/react";
import { onAuthStateChanged } from "firebase/auth";
import { Home, ShoppingCart, Heart, User } from "lucide-react";
import MobileUser from "./MobileUser";
import { auth } from "~/firebase";

const MobileHeader = () => {
  const [userMenu, setUserMenu] = useState<boolean>(false);
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const navItems = [
    { id: "home", icon: Home, label: "EXKO", navigation: "/", navigation2: "musaffoOsmon" },
    {
      id: "favourite",
      icon: Heart,
      label: "Favourite",
      navigation: "/favourite",
      navigation2: "musaffoOsmon"
    },
    { id: "cart", icon: ShoppingCart, label: "Cart", navigation: "/cart", navigation2: "musaffoOsmon" },
    {
      id: "profile",
      icon: User,
      label:
        (pathname?.includes("authentication") && "Login") ||
        (pathname?.includes("orders") && "Orders") ||
        (pathname?.includes("main") && "Me") ||
        (pathname?.includes("support") && "Support"),
      navigation: "/authentication",
      navigation2: "/user",
    },
  ];

  const handleNavigation = (): void => {
    const userData = sessionStorage.getItem("userData");
    if (userData) {
      setUserMenu(true);
      return;
    }

    onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUserMenu(true);
      } else {
        navigate("/authentication");
      }
    });
  };

  return (
    <>
      <div className="mobile-navigation middle:hidden" style={pathname?.includes("product") ? {display:"none"} : {}}>
        <div className="navigation-bar">
          {navItems.map((item) => {
            const Icon = item.icon;

            return (
              <button
                key={item.id}
                className={`nav-itemm ${
                  pathname === item.navigation ||
                  pathname?.includes(item.navigation2)
                    ? "active"
                    : ""
                }`}
                onClick={() =>
                  item.id !== "profile"
                    ? navigate(item?.navigation)
                    : handleNavigation()
                }
              >
                <div className="nav-content">
                  <Icon className="nav-icon"/>
                  {(pathname.includes(item.navigation) ||
                    pathname.includes(item.navigation2)) && (
                    <span className="nav-label">{item?.label}</span>
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {userMenu && <MobileUser onNavigate={() => setUserMenu(false)} />}
    </>
  );
};

export default MobileHeader;
