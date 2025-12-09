import { useDispatch } from "react-redux";
import { BsTrash3Fill } from "react-icons/bs";
import { FaMinus, FaPlus } from "react-icons/fa";
import { cartAction } from "../../store/CartSlice";
import { PriceFormatter } from "../Extra/Extra";
import { CartItem } from "~/utils";

export default function ItemMobile({ product }: { product: CartItem }) {
  const dispatch = useDispatch();

  const amountHandler = (action: string) => {
    if (action === "delete") {
      dispatch(cartAction.removeItem({ product: product, delete: action }));
    }

    if (action === "-") {
      if (product.quantity !== 1) {
        dispatch(cartAction.removeItem(product));
      }
    }

    if (action === "+") {
      const newItem = {
        discount: product.discount,
        id: product.id,
        name: product.name,
        image: product.image,
        price: product.price,
        rating: product.rating,
        specs: product.specs,
        quantity: 1,
        color: product.color,
        size: product.size,
      };

      dispatch(cartAction.addItem(newItem));
    }
  };
  return (
    <>
      <div className="w-[40%]">
        <img
          src={product?.image}
          alt=""
          className="w-full h-[10rem] object-cover mb-[1rem]"
        />
      </div>

      <div className="w-[60%]">
        <p
          title={product?.name || "no name"}
          className="max-h-[3.5rem] line-clamp-2 text-ellipsis ml-[.5rem]"
        >
          {product?.name || "no name"}
        </p>
        <div className="w-full flex justify-evenly flex-col my-[.5rem] ml-[.5rem]">
          <span className="flex gap-[.4rem] text-[#a8a8a8]">
            Sotuvchi: <p className="text-[black]">EXKO shop</p>
          </span>
          {product?.color && (
            <span className="flex gap-[.4rem] text-[#a8a8a8]">
              Rang: <p className="text-[black]">{product?.color}</p>
            </span>
          )}
          {product?.size && (
            <span className="flex gap-[.4rem] text-[#a8a8a8]">
              O&apos;lcham: <p className="text-[black]">{product?.size}</p>
            </span>
          )}
        </div>
        <div className="w-full my-[.5rem] mr-[.5rem] flex justify-evenly flex-col items-end pr-[4%]">
          <p className="text-[1.2rem]">
            {PriceFormatter(product?.discount * product?.quantity)} so&apos;m
          </p>
          <s>{PriceFormatter(product?.price * product?.quantity)} so&apos;m</s>
        </div>
      </div>

      <div className="w-full flex items-center justify-between border-b-3 border-[black] pb-[1rem] mb-[1rem]">
        <div className="flex items-center justify-center w-[8rem] h-[3rem] border-1 border-[#a0a0a0] rounded-[5px]">
          <button
            className="w-[35%] bg-transparent border-none cursor-pointer grid place-items-center"
            style={
              product?.quantity === 1
                ? {
                    color: "rgb(177, 177, 177)",
                    cursor: "default",
                  }
                : {}
            }
            onClick={() => amountHandler("-")}
          >
            <FaMinus className="text-[black]" />
          </button>
          <p className="w-[30%] text-center">{product?.quantity || 1}</p>
          <button
            className="w-[35%] bg-transparent border-none cursor-pointer grid place-items-center"
            onClick={() => amountHandler("+")}
          >
            <FaPlus className="text-[black]" />
          </button>
        </div>
        <p className="text-[black] text-[.9rem]">
          {PriceFormatter(product?.discount)} so&apos;m
          {" / "}
          birlik
        </p>
        <button className="w-fit h-full bg-transparent border-none text-[1.2rem] text-[black] cursor-pointer flex items-center justify-center gap-[.2rem] duration-500" onClick={() => amountHandler("delete")}>
          <BsTrash3Fill /> Yo&apos;q qilish
        </button>
      </div>
    </>
  );
}
