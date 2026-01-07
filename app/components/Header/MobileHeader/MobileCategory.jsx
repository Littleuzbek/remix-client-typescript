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

export default function MobileCategory() {
  const category = [
    {
      type: "electronic",
      image: cpu,
      title: "Elektronika",
      link: "/category/electronics"
    },
    {
      type: "cosmetic",
      image: cosmetics,
      title: "Kosmetika",
      link: "/category/cosmetics"
    },
    {
      type: "kids",
      image: kids,
      title: "Bolalar kiyimi",
      link: "/category/kidsClothes"
    },
    {
      type: "women",
      image: women,
      title: "Ayollar kiyimi",
      link: "/category/womenClothes"
    },
    {
      type: "man",
      image: men,
      title: "Erkaklar kiyimi",
      link: "/category/menClothes"
    },
    {
      type: "shoe",
      image: shoe,
      title: "Oyoq kiyimlar",
      link: "/category/shoes"
    },
    {
      type: "access",
      image: earbuds,
      title: "Aksesuar",
      link: "/category/accessuaries"
    },
    {
      type: "health",
      image: health,
      title: "Salomatlik",
      link: "/category/health"
    },
    {
      type: "computer",
      image: laptop,
      title: "Kompyuter",
      link: "/category/laptops"
    },
    {
      type: "toy",
      image: toys,
      title: "O'yinchoq",
      link: "/category/toys"
    },
    {
      type: "watch",
      image: watch,
      title: "Soat",
      link: "/category/watches"
    },
    {
      type: "book",
      image: book,
      title: "Kitob",
      link: "/category/books"
    },
    {
      type: "BU",
      image: handshake,
      title: "BU",
      link: "/category/bu"
    },
  ];
  return (
    <div className="w-screen h-[116px] overflow-x-auto flex gap-2 py-4 lg:hidden">
      {category?.map((cate) => (
        <Link to={cate.link}
          className="w-[100px]! h-full border-1 rounded-[10px] grid place-items-center flex-shrink-0"
          key={cate?.type}
        >
          <img src={cate?.image} alt={cate?.type} className="w-[50px]" />
          <p className="text-[14px] text-black">{cate?.title}</p>
        </Link>
      ))}
    </div>
  );
}
