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
import { receiptHandler } from "../Extra/Extra";
import { translateText } from "../Extra/Translation";

export interface stateStr {
  ssr: boolean;
  client: boolean;
}

export default function Cart() {
  const cart = useSelector((state: RootState) => state.cart.cart);
  const totalPrice = useSelector((state: RootState) => state.cart.totalPrice);
  const totalDiscount = useSelector(
    (state: RootState) => state.cart.totalDiscount
  );
  const [loader, setLoader] = useState<stateStr>({ ssr: false, client: false });
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
      setLoader({ ssr: true, client: false });
      const idToken = await verifyUser();
      const formData = new FormData(target);

      if (cart.length === 0) {
        dispatch(cartAction.setClearCart());
        return;
      }

      formData.append("idToken", idToken || "");
      formData.append("items", JSON.stringify(cart));
      formData.append("userId", auth?.currentUser?.uid || "");

      fetcher.submit(formData, {
        method: "post",
        encType: "multipart/form-data",
      });

      dispatch(cartAction.setClearCart());
    } catch (err) {
      setLoader({ ssr: false, client: false });
      console.log(err);
    }
  };

  const nonUserBuy = (e: React.FormEvent<HTMLFormElement>) => {
    const formData = new FormData(e.currentTarget);

    setLoader({ ssr: false, client: true });
    const userName = formData.get("nonUserName");
    const userNumber = formData.get("nonUserNumber");
    const userLocation = formData.get("location");

    const day = new Date().getDate();
    const month = new Date().getMonth() + 1;
    const year = new Date().getFullYear();
    const hours = new Date().getHours();
    const minutes = new Date().getMinutes();

    const token = "8151517328:AAEn05AsKM656h7U5tsZnVUTmQoeWWeJPxs";
    const chat_id = "-1002591740953";

    const newMessage = `
    Name: ${userName}
    Contact-info: ${userNumber}
    Location: ${userLocation}
    Time: ${day}.${month}.${year}, ${hours}:${minutes}
    ${cart?.reduce((receipt, item, index) => {
      return receipt + receiptHandler(item, index + 1);
    }, "")}
    `;

    const url = `https://api.telegram.org/bot${token}/sendMessage?chat_id=${chat_id}&text=${encodeURIComponent(
      newMessage
    )}`;

    const api = new XMLHttpRequest();

    api.open("GET", url, true);

    api.onreadystatechange = function () {
      if (api.readyState === 4) {
        // Request completed
        if (api.status === 200) {
          // setAnim(translateText().sentSeccessfully);
          return;
        } else {
          // setAnim("error");
          // botErrorHandler(newMessage);
          return;
        }
      }
    };

    api.send();
    setLoader({ ssr: false, client: false });
  };

  useEffect(() => {
    if (loader?.ssr && fetcher?.data) {
      setLoader({ ssr: false, client: false });
    }

    if (loader?.client) {
      setLoader({ ssr: false, client: false });
    }

    // eslint-disable-next-line
  }, [fetcher?.data]);

  return (
    <>
      {loader?.ssr || loader?.client || (
        <>
          {cart.length === 0 ? (
            <NoItem />
          ) : (
            <div className="w-[95%] lg:w-[90%] mt-[1rem] mx-auto relative z-3">
              <h2 className="text-[1.5rem] text-center lg:text-start lg:text-[2rem] mb-[1rem] lg:mb-[.5rem]">
                 {translateText()?.cartLabel(cart.length)}
              </h2>
              <div className="flex justify-between flex-col lg:flex-row mb-[1rem]">
                <div className="w-[70%] h-fit rounded-[10px] border-3 border-[rgba(0,0,0,0.2)] hidden lg:block">
                  <div className="w-full h-[3rem] border-b-3 border-[rgba(0,0,0,0.2)] px-[1rem] flex justify-between items-center">
                    <h3>{translateText()?.cartOrdersLabel}</h3>
                  </div>
                  {cart.map((item: CartItem) => (
                    <Item product={item} key={item.cartItemId} />
                  ))}
                </div>

                <div className="w-full flex flex-wrap lg:hidden">
                  {cart?.map((item: CartItem) => (
                    <ItemMobile product={item} key={item.cartItemId} />
                  ))}
                </div>

                <TotalPrice
                  totalPriceVal={totalPrice}
                  totalDiscountVal={totalDiscount}
                  onOrder={orderHandler}
                  onNonUserBuy={nonUserBuy}
                />
              </div>
            </div>
          )}
        </>
      )}

      {(loader.ssr || loader.client) &&  <p className="text-center">Loading...</p>}
    </>
  );
}
