import { Link, useLocation } from "@remix-run/react";
import Catalog from "./Catalog";
import Fav from "./Fav";
import Search from "./Search";
import User from "./User";
import SearchResult from "./SearchResult";
import MobileSearch from "./MobileSearch";
import MobileHeader from "./MobileHeader";
import Notification from "./Notification";

export default function Header() {
  const { pathname } = useLocation();
  
  return (
    <div className="w-full fixed bottom-[0] z-3 bg-[white] middle:static middle:bg-transparent">
      <header className="navbar w-[90%] h-[4rem] bg-[var(--second-color)] m-[10px_auto_0] rounded-[10px]  justify-evenly items-center hidden middle:flex">
        <Link to={"/"} className='text-[2rem] font-["Playfair_Display",serif] [font-optical-sizing:auto] not-italic font-semibold text-[var(--first-color)] select-none cursor-pointer font-[600] no-underline'>
          EXKO
        </Link>
        <Catalog />
        <Search />
        <Fav />
        <User />
      </header>

      <ul className="navbar2 w-[90%] justify-evenly m-[10px_auto] list-none hidden middle:flex">
        <li
          className={
            `${pathname && pathname?.includes("/electronics") ? "bg-[var(--first-color)]" : ""} p-[5px] rounded-[5px]`
          }
        >
          <Link prefetch="intent" to={"/category/electronics"} className={`${pathname && pathname?.includes("/electronics") ? "text-[white]" : "text-[black]"} no-underline active:text-[white]`}>
            Elektronika
          </Link>
        </li>
        <li className={`${pathname && pathname?.includes("/books") ? "bg-[var(--first-color)]" : ""} p-[5px] rounded-[5px]`}>
          <Link prefetch="intent" to={"/category/books"} className={`${pathname && pathname?.includes("/books") ? "text-[white]" : "text-[black]"} no-underline active:text-[white]`}>
            Kitoblar
          </Link>
        </li>
        <li className={`${pathname && pathname?.includes("/clothes") ? "bg-[var(--first-color)]" : ""} p-[5px] rounded-[5px]`}>
          <Link prefetch="intent" to={"/category/clothes"} className={`${pathname && pathname?.includes("/clothes") ? "text-[white]" : "text-[black]"} no-underline active:text-[white]`}>
            Kiyimlar
          </Link>
        </li>
        <li className={`${pathname && pathname?.includes("/shoes") ? "bg-[var(--first-color)]" : ""} p-[5px] rounded-[5px]`}>
          <Link prefetch="intent" to={"/category/shoes"} className={`${pathname && pathname?.includes("/shoes") ? "text-[white]" : "text-[black]"} no-underline active:text-[white]`}>
            Poyafzal
          </Link>
        </li>
        <li
          className={
            `${pathname && pathname?.includes("/accessuaries") ? "bg-[var(--first-color)]" : ""} p-[5px] rounded-[5px]`
          }
        >
          <Link prefetch="intent" to={"/category/accessuaries"} className={`${pathname && pathname?.includes("/accessuaries") ? "text-[white]" : "text-[black]"} no-underline active:text-[white]`}>
            Aksessuarlar
          </Link>
        </li>
        <li
          className={`${pathname && pathname?.includes("/cosmetics") ? "bg-[var(--first-color)]" : ""} p-[5px] rounded-[5px]`}
        >
          <Link prefetch="intent" to={"/category/cosmetics"} className={`${pathname && pathname?.includes("/cosmetics") ? "text-[white]" : "text-[black]"} no-underline active:text-[white]`}>
            Kosmetika
          </Link>
        </li>
        <li className={`${pathname && pathname?.includes("/health") ? "bg-[var(--first-color)]" : ""} p-[5px] rounded-[5px]`}>
          <Link prefetch="intent" to={"/category/health"} className={`${pathname && pathname?.includes("/health") ? "text-[white]" : "text-[black]"} no-underline active:text-[white]`}>
            Salomatlik
          </Link>
        </li>
        <li className={`${pathname && pathname?.includes("/laptops") ? "bg-[var(--first-color)]" : ""} p-[5px] rounded-[5px]`}>
          <Link prefetch="intent" to={"/category/laptops"} className={`${pathname && pathname?.includes("/laptops") ? "text-[white]" : "text-[black]"} no-underline active:text-[white]`}>
            Kompyuterlar
          </Link>
        </li>
        <li className={`${pathname && pathname?.includes("/toys") ? "bg-[var(--first-color)]" : ""} p-[5px] rounded-[5px]`}>
          <Link prefetch="intent" to={"/category/toys"} className={`${pathname && pathname?.includes("/toys") ? "text-[white]" : "text-[black]"} no-underline active:text-[white]`}>
            O&apos;yinchoqlar
          </Link>
        </li>
        <li className={`${pathname && pathname?.includes("/watches") ? "bg-[var(--first-color)]" : ""} p-[5px] rounded-[5px]`}>
          <Link prefetch="intent" to={"/category/watches"} className={`${pathname && pathname?.includes("/watches") ? "text-[white]" : "text-[black]"} no-underline active:text-[white]`}>
            Saotlar
          </Link>
        </li>
        <li className={`${pathname && pathname?.includes("/bu") ? "bg-[var(--first-color)]" : ""} p-[5px] rounded-[5px]`}>
          <Link prefetch="intent" to={"/category/bu"} className={`${pathname && pathname?.includes("/bu") ? "text-[white]" : "text-[black]"} no-underline active:text-[white]`}>
            B/U
          </Link>
        </li>
      </ul>

      <MobileSearch />
      <MobileHeader />

      <SearchResult />
      <Notification />
    </div>
  );
}
