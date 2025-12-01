import { Link, useLocation } from "@remix-run/react";
import { CiHeart } from "react-icons/ci";
import { translateText } from "../Extra/Translation";

export default function Fav() {
  const { pathname } = useLocation();
  return (
    <Link
      className="navbar-fav-btn h-[2.5rem] text-[black] text-[18px] no-underline rounded-[5px] p-[5px] flex items-center justify-center gap-[5px] transition-all duration-300 cursor-pointer hover:text-[white] hover:bg-[var(--first-color)]"
      style={
        pathname?.includes("/favourite")
          ? { backgroundColor: "var(--first-color)", color: "white" }
          : {}
      }
      to={"/favourite"}
    >
      <CiHeart className="text-[25px]"/>
      {translateText()?.headerFavouriteButton}
    </Link>
  );
}
