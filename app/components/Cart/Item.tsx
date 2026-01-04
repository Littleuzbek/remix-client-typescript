import { BsTrash3Fill } from "react-icons/bs";
import { FaMinus, FaPlus } from "react-icons/fa";
import { PriceFormatter } from "../Extra/Extra";
import { CartItem } from "~/utils";
import { useDispatch } from "react-redux";
import { cartAction } from "~/store/CartSlice";
import { Link } from "@remix-run/react";
import { translateText } from "../Extra/Translation";

export default function Item({ product }: { product: CartItem }) {
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
    <div className="w-full my-[1rem] ">
      <div className="w-full flex">
        <img
          src={product?.image}
          alt=""
          className="w-[20%] aspect-square mx-[2.5%] object-cover"
        />
        <div className="w-full">
          <div className="w-full h-[40%] flex">
            <Link
              className="w-[80%] text-[19px] text-[black] no-underline flex items-center"
              to={`/product/${product?.id}`}
            >
              {product?.name}
            </Link>
            <button
              className="w-[20%] text-[18px] text-[#a8a8a8] bg-transparent border-none cursor-pointer flex justify-center items-center gap-[.2rem] duration-500 hover:text-[black]"
              onClick={() => amountHandler("delete")}
            >
              <BsTrash3Fill /> {translateText()?.cartItemDeleteBtn}
            </button>
          </div>

          <div className="w-full h-[60%] flex">
            <div className="w-[40%] flex justify-evenly flex-col">
              <span className="flex gap-[.4rem] text-[#a8a8a8]">
                {translateText()?.cartItemSellerLabel}: <p className="text-[black]">EXKO {translateText()?.cartItemSeller}</p>{" "}
              </span>
              {product?.color && (
                <span className="flex gap-[.4rem] text-[#a8a8a8]">
                  {translateText()?.cartItemColorLabel}:{" "}
                  <p className="text-[black]">{product?.color || "Rangsiz"}</p>
                </span>
              )}
              {product?.size && (
                <span className="flex gap-[.4rem] text-[#a8a8a8]">
                  {translateText()?.cartItemSizLabel}:{" "}
                  <p className="text-[black]">
                    {product?.size || "O'lchamsiz"}
                  </p>
                </span>
              )}
            </div>

            <div className="w-[20%] max-h-[2.3rem] flex justify-center items-center border-1 border-[#a0a0a0] rounded-[20px]">
              <button
                className="w-[35%] bg-transparent border-none cursor-pointer grid place-items-center"
                style={
                  product.quantity === 1
                    ? {
                        color: "rgb(177, 177, 177)",
                        cursor: "not-allowed",
                      }
                    : {}
                }
                onClick={() => amountHandler("-")}
              >
                <FaMinus className="p-[.1rem]" />
              </button>
              <p className="w-[30%] text-center">{product?.quantity || 1}</p>
              <button
                className="w-[35%] bg-transparent border-none cursor-pointer grid place-items-center"
                onClick={() => amountHandler("+")}
              >
                <FaPlus className="p-[.1rem]" />
              </button>
            </div>

            <div className="w-[40%] flex justify-evenly items-end flex-col pr-[4%]">
              <p className="text-[1.8rem] ">
                {PriceFormatter(product?.discount * product?.quantity)}{" "}
                {translateText()?.orderPrice_currency}
              </p>
              <s>
                {PriceFormatter(product?.price * product?.quantity)} {translateText()?.orderPrice_currency}
              </s>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
