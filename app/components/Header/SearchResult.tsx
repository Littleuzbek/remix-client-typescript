import { useEffect } from "react";
import { useSelector } from "react-redux";

import Collection from "../Home/Collection";
import { Product } from "~/utils";
import { RootState } from "~/root";
import { translateText } from "../Extra/Translation";

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
      className="bg-[white] fixed left-[0] right-[0] top-[3rem] lg:top-[5rem] bottom-[0] z-100 pb-[1rem] overflow-auto"
      style={results?.length !== 0 ? {} : { display: "none" }}
    >
      <div className="w-[95%] mx-auto">
        <Collection all={results} section={translateText()?.searchResultTitle} />
      </div>

    </div>
  );
}
