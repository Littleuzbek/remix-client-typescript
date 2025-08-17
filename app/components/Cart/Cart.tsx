import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { onAuthStateChanged } from "firebase/auth";
import { useFetcher } from "@remix-run/react";
import { RootState } from "~/root";
import { CartItem } from "~/utils";
import { auth } from "~/firebase";
import NoItem from "./NoItem";
import TotalPrice from "./TotalPrice";
import Item from "./Item";
import { cartAction } from "~/store/CartSlice";
import ItemMobile from "./ItemMobile";

export default function Cart() {
  const cart = useSelector((state: RootState) => state.cart.cart);
  const totalPrice = useSelector((state: RootState) => state.cart.totalPrice);
  const totalDiscount = useSelector(
    (state: RootState) => state.cart.totalDiscount
  );
  const [loader, setLoader] = useState<boolean>(false);
  const dispatch = useDispatch();
  const fetcher = useFetcher();

  const verifyUser = async (): Promise<string | null> => {
    return new Promise((resolve) => {
      onAuthStateChanged(auth, async (user) => {
        if (user) {
          const token = await user.getIdToken();
          resolve(token);
        } else {
          resolve(null);
        }
      });
    });
  };

  const orderHandler = async (e: React.FormEvent) => {
    const target = e.target as HTMLFormElement;
    try {
      setLoader(true);
      const idToken = await verifyUser();
      const formData = new FormData(target);

      if (cart.length === 0) return;

      formData.append("idToken", idToken || "");
      formData.append("items", JSON.stringify(cart));
      formData.append("userId", auth?.currentUser?.uid || "");

      fetcher.submit(formData, {
        method: "post",
        encType: "multipart/form-data",
      });

      dispatch(cartAction.setClearCart());
    } catch (err) {
      setLoader(false);
      console.log(err);
    }
  };

  useEffect(() => {
    if (loader && fetcher?.data) {
      setLoader(false);
    }
  }, [fetcher?.data, loader]);

  return (
    <>
      {loader || (
        <>
          {cart.length === 0 ? (
            <NoItem />
          ) : (
            <div className="w-[95%] middle:w-[90%] mt-[1rem] mx-auto">
              <h2 className="text-[1.5rem] text-center middle:text-start middle:text-[2rem] mb-[1rem] middle:mb-[.5rem]">
                Savatingizda {cart.length} mahsulot
              </h2>
              <div className="flex justify-between flex-col middle:flex-row mb-[1rem]">
                <div className="w-[70%] h-fit rounded-[10px] border-3 border-[rgba(0,0,0,0.2)] hidden middle:block">
                  <div className="w-full h-[3rem] border-b-3 border-[rgba(0,0,0,0.2)] px-[1rem] flex justify-between items-center">
                    <h3>Barcha mahsulotlar</h3>
                  </div>
                  {cart.map((item: CartItem) => (
                    <Item product={item} key={item.cartItemId} />
                  ))}
                </div>

                <div className="w-full flex flex-wrap middle:hidden">
                  {cart?.map((item: CartItem) => (
                    <ItemMobile product={item} key={item.cartItemId} />
                  ))}
                </div>

                <TotalPrice
                  totalPriceVal={totalPrice}
                  totalDiscountVal={totalDiscount}
                  onOrder={orderHandler}
                />
              </div>
            </div>
          )}
        </>
      )}

      {loader && <p className="text-center">Loading...</p>}
    </>
  );
}
