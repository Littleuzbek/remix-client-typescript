import cpu from "../../../assets/header_icons/cpu.png";
import book from "../../../assets/header_icons/book.png";
import kids from "../../../assets/header_icons/kids_clothes.png";
import women from "../../../assets/header_icons/dress.png";
import men from "../../../assets/header_icons/suit.png";
import shoe from "../../../assets/header_icons/shoe.png";
import earbuds from "../../../assets/header_icons/earbuds.png";
import cosmetics from "../../../assets/header_icons/cosmetics.png";
import health from "../../../assets/header_icons/health.png";
import laptop from "../../../assets/header_icons/laptop.png";
import toys from "../../../assets/header_icons/toys.png";
import watch from "../../../assets/header_icons/watch.png";
import handshake from "../../../assets/header_icons/handshake.png";
import { Link } from "@remix-run/react";
import { translateText } from "../../Extra/Translation";

export default function MobileCategory() {
  const category = [
    {
      type: "electronic",
      image: cpu,
      title: translateText()?.catalogElectronics,
      link: "/category/electronics"
    },
    {
      type: "cosmetic",
      image: cosmetics,
      title: translateText()?.catalogCosmetics,
      link: "/category/cosmetics"
    },
    {
      type: "kids",
      image: kids,
      title: translateText()?.catalogChildClothes,
      link: "/category/kidsClothes"
    },
    {
      type: "women",
      image: women,
      title: translateText()?.catalogWomanClothes,
      link: "/category/womenClothes"
    },
    {
      type: "man",
      image: men,
      title: translateText()?.catalogMenClothes,
      link: "/category/menClothes"
    },
    {
      type: "shoe",
      image: shoe,
      title: translateText()?.catalogShoes,
      link: "/category/shoes"
    },
    {
      type: "access",
      image: earbuds,
      title: translateText()?.catalogAccess,
      link: "/category/accessuaries"
    },
    {
      type: "health",
      image: health,
      title: translateText()?.catalogHealth,
      link: "/category/health"
    },
    {
      type: "computer",
      image: laptop,
      title: translateText()?.catalogComputers,
      link: "/category/laptops"
    },
    {
      type: "toy",
      image: toys,
      title: translateText()?.catalogToys,
      link: "/category/toys"
    },
    {
      type: "watch",
      image: watch,
      title: translateText()?.catalogWatches,
      link: "/category/watches"
    },
    {
      type: "book",
      image: book,
      title: translateText()?.catalogBooks,
      link: "/category/books"
    },
    {
      type: "BU",
      image: handshake,
      title: translateText()?.catalogBU,
      link: "/category/bu"
    },
  ];

  const scrollStyle = `scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100
  [&::-webkit-scrollbar]:h-2
  [&::-webkit-scrollbar-track]:bg-gray-100
  [&::-webkit-scrollbar-thumb]:bg-[var(--first-color)]
  [&::-webkit-scrollbar-thumb]:rounded-full`

  return (
    <div className={`w-screen h-[120px] overflow-x-auto flex gap-2 py-4 lg:hidden ` + scrollStyle}>
      {category?.map((cate) => (
        <Link to={cate.link}
          className="w-[120px]! h-full border-1 rounded-[10px] grid place-items-center flex-shrink-0"
          key={cate?.type}
        >
          <img src={cate?.image} alt={cate?.type} className="w-[50px]" />
          <p className="text-[14px] text-black">{cate?.title}</p>
        </Link>
      ))}
    </div>
  );
}
