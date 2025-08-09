import { useEffect } from "react";
import { useSelector } from "react-redux";

import Collection from "../Home/Collection";
import { Product } from "~/utils";
import { RootState } from "~/root";

export default function SearchResult() {
  const results = useSelector((state: RootState) => state.cart.results) as Product[];

  useEffect(() => {
    if (results?.length !== 0) {
      document.body.style.overflow = "hidden";
    }

    if (results?.length === 0) {
      document.body.style.overflow = "";
    }

    return () => {
      if (results?.length === 0) {
        document.body.style.overflow = "";
      }
    };
  }, [results]);

  return (
    <div
      className="results bg-[white] fixed left-[0] right-[0] top-[5rem] bottom-[0] z-[3] py-[1rem] overflow-auto"
      style={results?.length !== 0 ? {} : { display: "none" }}
    >
      <div className="w-[90%] mx-auto">
        <Collection all={results} section={"Qidiruv natijalari"} />
      </div>

    </div>
  );
}
