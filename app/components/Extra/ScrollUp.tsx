import { useEffect } from "react";
import { useLocation } from "@remix-run/react";
import { FaArrowUp } from "react-icons/fa6";
import "./scrollUp.css";

const Scrollup = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      const scrollUp = document.querySelector(".scrollup");
      if (!scrollUp) return;

      if (window.scrollY >= 560) {
        if (pathname?.includes("/cart")) {
          scrollUp.classList.remove("show-scroll");
          scrollUp.classList.add("show-lower-scroll");
        } else {
          scrollUp.classList.remove("show-lower-scroll");
          scrollUp.classList.add("show-scroll");
        }
      } else {
        if (pathname?.includes("/cart")) {
          scrollUp.classList.remove("show-lower-scroll");
        } else {
          scrollUp.classList.remove("show-scroll");
        }
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [pathname]);

  return (
    <button
      onClick={() => {
        window.scrollTo(0, 0);
      }}
      className="scrollup"
    >
      <FaArrowUp className="uil uil-arrow-up scrollup__icon" />
    </button>
  );
};

export default Scrollup;
