import { Link } from "@remix-run/react";
import { PriceFormatter } from "~/components/Extra/Extra";
import { OrderProps } from "../../../utils";
import Carousel from "../../Card/Carousel";

export default function OrderItem({
  orderItem,
}: {
  orderItem: OrderProps["orderItems"][0];
}) {
  return (
    <div className="grid grid-cols-auto middle:grid-cols-[20%_auto] gap-[2%] py-[1.5rem] animate-[comeout_.5s_linear] select-none border-b-3 border-[rgba(0,0,0,.2)] nth-last-1:border-b-0">
      <Carousel productImg={orderItem?.image} />
      <div className="grid gap-[1rem]">
        <Link
          to={`/product/${orderItem?.id}`}
          className="flex gap-[1rem] text-[19px] items-center no-underline"
        >
          <p className="bg-[var(--first-color)] text-[white] py-[3px] px-[10px] rounded-[10px]">
            Nomi:
          </p>
          <p className="text-[black]">{orderItem?.name}</p>
        </Link>
        <span
          style={orderItem?.color ? {} : { display: "none" }}
          className="flex gap-[1rem] text-[19px] items-center"
        >
          <p className="bg-[var(--first-color)] text-[white] py-[3px] px-[10px] rounded-[10px]">
            Rangi:
          </p>
          <p>{orderItem?.color}</p>
        </span>
        <span
          style={orderItem?.size ? {} : { display: "none" }}
          className="flex gap-[1rem] text-[19px] items-center"
        >
          <p className="bg-[var(--first-color)] text-[white] py-[3px] px-[10px] rounded-[10px]">
            O&apos;lchami:
          </p>
          <p>{orderItem?.size}</p>
        </span>
        <span className="flex gap-[1rem] text-[19px] items-center">
          <p className="bg-[var(--first-color)] text-[white] py-[3px] px-[10px] rounded-[10px]">
            Soni:
          </p>
          <p>{orderItem?.quantity}</p>
        </span>
        <span className="flex gap-[1rem] text-[19px] items-center">
          <p className="bg-[var(--first-color)] text-[white] py-[3px] px-[10px] rounded-[10px]">
            Narxi:
          </p>
          <p>{PriceFormatter(orderItem?.price)} so&apos;m</p>
        </span>
        <span
          style={orderItem?.quantity === 1 ? { display: "none" } : {}}
          className="flex gap-[1rem] text-[19px] items-center"
        >
          <p className="bg-[var(--first-color)] text-[white] py-[3px] px-[10px] rounded-[10px]">
            Umumiy narxi:
          </p>
          <p>{PriceFormatter(orderItem?.totalPrice)} so&apos;m</p>
        </span>
      </div>
    </div>
  );
}
