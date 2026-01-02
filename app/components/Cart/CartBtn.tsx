import { useLocation, useNavigate } from "@remix-run/react";
import { MdOutlineShoppingCart } from "react-icons/md";
import { useSelector } from "react-redux";
import { RootState } from "~/root";

export default function CartBtn() {
  const cart = useSelector((state: RootState) => state.cart.cart);
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const cartBtnStyle =
    "hidden lg:grid place-items-center fixed z-1 right-[2.5rem] bottom-[2rem] p-[.8rem] bg-[var(--first-color)] rounded-[.4rem] duration-500 cursor-pointer";
  return (
    <div
      className={pathname?.includes("/cart") ? "hidden" : cartBtnStyle}
      style={cart?.length === 0 ? {} : { padding: "1.2rem .8rem .4rem" }}
      onClick={() => {
        navigate("/cart");
      }}
      onKeyDown={() => {}}
      tabIndex={0}
      role="button"
    >
      <MdOutlineShoppingCart className="text-[2rem] text-[white]" />
      <span
        className="absolute top-[0] text-[19px] font-semibold text-[white] rounded-full"
        style={cart?.length === 0 ? { display: "none" } : {}}
      >
        {cart?.length !== 0 && cart?.length}
      </span>
    </div>
  );
}
