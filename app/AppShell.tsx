import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useFetcher, useLoaderData } from "@remix-run/react";
import { loader } from "./root";
import { cartAction } from "./store/CartSlice";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import CartBtn from "./components/Cart/CartBtn";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";
import { UserData } from "./utils";
import { action } from "./routes/user.$id.main";
import { getToken } from "./components/Extra/Extra";

type Props = {
  children: React.ReactNode;
};

export default function AppShell({ children }: Props) {
  const data = useLoaderData<typeof loader>();
  const dispatch = useDispatch();
  const fetcher = useFetcher<typeof action>();
  const [fontLink, setFontLink] = useState<string>("");
  const [fontType, setFontType] = useState<string>("");

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        dispatch(cartAction.setLogged(true));

        const userData = sessionStorage.getItem("userData");
        if (!userData) {
          const formData = new FormData();
          const oldBirthDay = await getToken();

          if (oldBirthDay) {
            formData.append("oldBirthDay", oldBirthDay);
          }
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

    if (localStorage.getItem("exkoLang") === "KR") {
      setFontLink(
        "https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@300;400;500;700&display=swap"
      );
      setFontType("Noto Sans KR");
    }
    if (localStorage.getItem("exkoLang") === "UZ") {
      setFontLink(
        "https://fonts.googleapis.com/css2?family=Barlow+Condensed:ital,wght@0,600;1,300;1,400&display=swap"
      );
      setFontType("Barlow Condensed");
    }
    if (localStorage.getItem("exkoLang") === "RU") {
      setFontLink(
        "https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700&display=swap"
      );
      setFontType("Montserrat");
    }

    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (fetcher?.data) {
      const user = (fetcher?.data as { userData: UserData | undefined | null })
        ?.userData;

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
    <>
      <style>{`
        @import url(${fontLink});
        
        .font-fixed {
          font-family: ${fontType} sans-serif !important;
          `}</style>
      <div className="w-full h-full mt-[3rem] middle:mt-[0] font-fixed">
        <Header />
        {children}
        <Footer />
        <CartBtn />
      </div>
    </>
  );
}
