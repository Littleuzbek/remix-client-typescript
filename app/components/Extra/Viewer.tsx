import { useDispatch, useSelector } from "react-redux";
import Carousel from "../Card/Carousel";
import { cartAction } from "../../store/CartSlice";
import { RootState } from "~/root";

export default function Viewer({ productImage }: {productImage: string | string[] | undefined}) {
  const viewer = useSelector((state: RootState) => state.cart.viewer);
  const dispatch = useDispatch();
  return (
    <div
      className="fixed top-[0] left-[0] right-[0] bottom-[0] z-100 bg-[rgba(0,0,0,.8)] grid place-items-center"
      style={viewer ? {} : { display: "none" }}
      onClick={() => {
        dispatch(cartAction.setViewer(false));
      }}
      tabIndex={-1}
      onKeyDown={()=>{}}
      role="button"
    >
      <button className="viewer w-[45%] h-full max-h-[100vh] grid place-items-center bg-transparent border-none" onClick={(e) => e.stopPropagation()}>
        <Carousel productImg={productImage} viewMode={true} />
      </button>
    </div>
  );
}
