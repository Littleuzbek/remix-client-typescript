import { useLocation, useNavigate } from "@remix-run/react";
import { useSelector } from "react-redux";
import { ChevronLeft } from "lucide-react";
import Search from "./Search";
import { RootState } from "~/root";

export default function MobileSearch() {
  const searchResults = useSelector((state: RootState) => state.cart.results);
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const inProduct = pathname?.includes("/product");
  return (
    <div
      className="w-full h-[3rem] py-[.2rem] px-[10px] fixed top-[0] right-[0] z-2 flex middle:hidden"
      style={
        inProduct || searchResults?.length !== 0
          ? { backgroundColor: "white" }
          : {}
      }
    >
      {inProduct && (
        <button className="w-[10%] h-full bg-transparent border-none" onClick={() => navigate(-1)}>
          <ChevronLeft color="black" width="100%" height="100%" />
        </button>
      )}
      <div style={inProduct ? { width: "90%" } : { width: "100%" }}>
        <Search />
      </div>
    </div>
  );
}
