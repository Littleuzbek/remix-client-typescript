import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "@remix-run/react";
import { useSelector } from "react-redux";

import { IoCloseOutline } from "react-icons/io5";
import { RootState } from "~/root";
import { CartItem } from "~/utils";
import { translateText } from "../Extra/Translation";

export default function Notification() {
  const [notific, setNotific] = useState(false);
  const cart = useSelector((state: RootState) => state.cart.cart);
  const noAuthBuy = useSelector((state: RootState) => state.cart.noAuthBuy);
  const newItem = useSelector(
    (state: RootState) => state.cart.notificationItem
  ) as CartItem | null;
  const ref = useRef<NodeJS.Timeout | null>(null);
  const { pathname } = useLocation();

  useEffect(() => {
    if (cart.length !== 0) {
      if (ref.current) {
        clearTimeout(ref.current);
      }

      setNotific(false);

      setTimeout(() => {
        setNotific(true);
      }, 50);

      ref.current = setTimeout(() => {
        setNotific(false);
      }, 1500);
    }
  }, [cart]);

  useEffect(() => {
    const hasBought = () => {
      if (noAuthBuy) {
        if (ref.current) {
          clearTimeout(ref.current);
        }

        setNotific(false);

        setTimeout(() => {
          setNotific(true);
        }, 50);

        ref.current = setTimeout(() => {
          setNotific(false);
        }, 1500);
      }
    };

    return () => hasBought();
  }, [noAuthBuy]);

  return (
    <>
      {!pathname?.includes("/cart") && notific && (
        <div className="w-full flex justify-center fixed top-[50px] z-100 animate-[appear_.5s_ease]">
          <div className="w-[95%] mx-auto middle:w-[40rem] h-[8rem] shadow-[0_0_10px_black] bg-[white] flex items-center">
            <img
              src={newItem?.image || ""}
              alt=""
              className="w-[7rem] h-[7rem] relative mx-[1rem] p-[5px] object-contain"
            />
            <div className="w-[76%] mt-[.5rem]">
              <div className="w-full flex justify-between">
                <p className="font-[500] text-[1.1rem]">
                  {noAuthBuy ? "" : translateText()?.headerNotificationProductAdded}
                </p>
                <IoCloseOutline
                  onClick={() => setNotific(false)}
                  className="w-[1.5rem] h-[1.5rem] cursor-pointer mr-[10px]"
                />
              </div>  
              <div className="w-full flex flex-col">
                <p className="w-[80%] text-[.9rem] line-clamp-2 text-ellipsis">
                  {noAuthBuy ? "Siz" : newItem?.name}
                </p>
                <Link
                  to="/cart"
                  className="no-underline self-end text-[var(--first-color)] mr-[10px] py-[10px]"
                  prefetch="intent"
                >
                  {translateText()?.headerNotificationCartButton}
                </Link>
                {/* <Link
                  to="/cart"
                  className="middle:hidden"
                  prefetch="intent"
                >
                  <MdOutlineShoppingCart />
                </Link> */}
              </div>
            </div>
          </div>
          {/* <p className="">Mahsulot savatga qo&apos;shildi.</p> */}
        </div>
      )}
    </>
  );
}
