import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { X } from "lucide-react";
import { IoSearch } from "react-icons/io5";
import { MdErrorOutline } from "react-icons/md";
import { Product } from "~/utils";
import { RootState } from "~/root";
import { cartAction } from "~/store/CartSlice";
import { translateText } from "../Extra/Translation";
import { useLocation } from "@remix-run/react";

export default function Search() {
  const products = useSelector((state: RootState) => state.cart.products) as
    | Product[]
    | null;
  const searchResults = useSelector(
    (state: RootState) => state.cart.results
  ) as Product[];
  const [result, setResult] = useState<boolean>(false);
  const inpRef = useRef<HTMLInputElement | null>(null);
  const location = useLocation();
  const dispatch = useDispatch();

  const searchEngine = (
    content: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const target = content.target as HTMLInputElement;
    const value = target.value;

    if (!value?.trim()) {
      dispatch(cartAction.setResults([]));
      setResult(false);
    } else {
      console.log(value?.trim().length);
      if (value?.trim().length > 2) {
        const find = products?.filter((item) =>
          (item?.title?.toLowerCase() || item?.name?.toLowerCase())?.includes(
            value.toLowerCase()
          )
        );
        dispatch(cartAction.setResults(find));

        return find?.length === 0 ? setResult(true) : setResult(false);
      }

      if (value?.trim().length <= 2) {
        dispatch(cartAction.setResults([]));
        return setResult(false);
      }
    }
  };

  useEffect(()=>{
      dispatch(cartAction.setResults([]));
    // eslint-disable-next-line
  },[location])

  return (
    <div className="w-full lg:w-auto h-[2.5rem] flex items-center relative bg-white">
      <input
        className="w-full lg:w-[20rem] h-[100%] rounded-[5px_0_0_5px] border-r-0 border border-[var(--first-color)] px-[10px] text-[18px] focus:outline-0"
        type="text"
        id="searchInput"
        placeholder={translateText()?.headerSearchPlaceHolder}
        onChange={searchEngine}
        ref={inpRef}
      />
      <button
        className="search-btn w-[4rem] h-full text-[25px] text-[white] flex items-center justify-center rounded-[0_5px_5px_0] bg-[var(--first-color)] border-0 cursor-pointer hover:bg-[var(--first-color-light)]"
        onClick={() => {
          if (searchResults?.length !== 0) {
            dispatch(cartAction.setResults([]));
            setResult(false);
            if (inpRef.current) inpRef.current.value = "";
          }
        }}
      >
        {searchResults?.length !== 0 ? <X /> : <IoSearch />}
      </button>

      {result && (
        <span className="no-result w-full lg:w-[25rem] py-[10px] bg-[white] text-[red] text-[18px] border-2 border-[var(--first-color)] border-t-0 rounded-[0_0_10px_10px] absolute z-[4] top-[100%] flex items-center justify-center gap-[.1rem]">
          {translateText()?.searchResultNotFound} <MdErrorOutline />
        </span>
      )}
    </div>
  );
}
