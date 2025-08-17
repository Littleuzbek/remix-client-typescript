import { Link } from "@remix-run/react";
import { PriceFormatter } from "../Extra/Extra";
import { Product } from "~/utils";
import Carousel from "./Carousel";
import WishButton from "./WishButton";
import AddToCart from "./AddToCart";

interface Props extends Product {
  product: Product;
}

function Card({ id, image, price, oldPrice, product, title }: Props) {
  return (
    <Link
      rel="preload"
      to={`/product/${id}`}
      key={id}
      className="card w-full h-fit flex flex-col cursor-pointer duration-[.5s] rounded-[10px] decoration-none overflow-hidden text-[black] hover:shadow-[0_5px_15px_rgb(158,158,158)] no-underline"
    >
      <div className="img-container w-full relative">
        <Carousel productImg={image} />
        <WishButton product={product} />
      </div>

      <div className="shortInfo h-[6.5rem] px-[5px]">
        <p className="w-full middle:text-[1.1rem] leading-[1.4rem] mx-[5px] my-[.5rem] pt-[2px] line-clamp-2 text-ellipsis">
          {title}
        </p>
        {/* <p>⭐ {`${rating} (${feedback} sharhlar)`}</p> */}
        <p className="w-fit text-[.8rem] middle:text-[.9rem] leading-[1.4rem] line-clamp-2 text-ellipsis px-[5px] bg-[yellow]">
          {PriceFormatter(price / 12)} so&apos;m /oyiga
        </p>
      </div>

      <div className="w-full flex items-end justify-between">
        <div className="price m-[5px]">
          <p className="text-[.8rem] middle:text-[1.1rem]">
            <s>{PriceFormatter(oldPrice)} so&apos;m</s>
          </p>
          <p className="middle:text-[1.3rem] font-semibold">
            {PriceFormatter(price)} so&apos;m
          </p>
        </div>
        <AddToCart product={product} />
      </div>
    </Link>
  );
}

export default Card;
