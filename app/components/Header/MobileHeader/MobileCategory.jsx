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

export default function MobileCategory() {
    const category = [
    {
      type: "book",
      image: book,
      title: "Kitob",
    },
    {
      type: "electronic",
      image: cpu,
      title: "Elektronika",
    },
    {
      type: "kids",
      image: kids,
      title: "Bolalar kiyimi",
    },
    {
      type: "women",
      image: women,
      title: "Ayollar kiyimi",
    },
    {
      type: "man",
      image: men,
      title: "Erkaklar kiyimi",
    },
    {
      type: "shoe",
      image: shoe,
      title: "Oyoq kiyimlar",
    },
    {
      type: "access",
      image: earbuds,
      title: "Aksesuar",
    },
    {
      type: "cosmetic",
      image: cosmetics,
      title: "Kosmetika",
    },
    {
      type: "health",
      image: health,
      title: "Salomatlik",
    },
    {
      type: "computer",
      image: laptop,
      title: "Kompyuter",
    },
    {
      type: "toy",
      image: toys,
      title: "O'yinchoq",
    },
    {
      type: "watch",
      image: watch,
      title: "Soat",
    },
    {
      type: "BU",
      image: handshake,
      title: "BU",
    },
  ];
  return (
    <div className="w-screen h-[116px] overflow-x-auto flex gap-2 py-4 lg:hidden">
      {category?.map((cate) => (
        <div
          className="w-[100px]! h-full border-1 rounded-[10px] grid place-items-center flex-shrink-0"
          key={cate?.type}
        >
          <img src={cate?.image} alt={cate?.type} className="w-[50px]" />
          <p className="text-[14px]">{cate?.title}</p>
        </div>
      ))}
    </div>
  )
}
