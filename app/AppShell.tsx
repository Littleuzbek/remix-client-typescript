import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useFetcher, useLoaderData } from "@remix-run/react";
import { loader } from "./root";
import { cartAction } from "./store/CartSlice";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Scrollup from "./components/Extra/ScrollUp";
import CartBtn from "./components/Cart/CartBtn";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";
import { UserData } from "./utils";
import { action } from "./routes/user.$id.main";

type Props = {
  children: React.ReactNode;
};

export default function AppShell({ children }: Props) {
  const data = useLoaderData<typeof loader>();
  const dispatch = useDispatch();
  const fetcher = useFetcher<typeof action>();

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        dispatch(cartAction.setLogged(true));

        const userData = sessionStorage.getItem("userData");
        if (!userData) {
          const formData = new FormData();
          formData.append("action", "read");
          fetcher.submit(formData, {
            method: "post",
            action: `/user/${user.uid}/main`,
          });
        } else {
          const parsedData = JSON.parse(userData);
          dispatch(cartAction.setUser(parsedData));
        }
      } else {
        dispatch(cartAction.setLogged(false));
      }
    });
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (fetcher?.data) {
      const user = (fetcher?.data as {userData: UserData | undefined | null})?.userData

      if (user) {
        dispatch(cartAction.setUser(user));
        sessionStorage.setItem("userData", JSON.stringify(user));
      } else {
        sessionStorage.removeItem("userData");
      }
    }
  }, [fetcher.data, dispatch]);

  useEffect(() => {
    if (data?.products) {
      dispatch(cartAction.setProducts(data?.products));
    }
  }, [data, dispatch]);

  return (
    <div className="w-full h-full mt-[3rem] middle:mt-[0]">
      <Header />
      {children}
      <Footer />
      <Scrollup />
      <CartBtn />
    </div>
  );
}
