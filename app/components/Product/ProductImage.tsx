import { Product } from "~/utils";
import Carousel from "../Card/Carousel";
import WishButton from "../Card/WishButton";

export default function ProductImage({productImage, currentProduct}: {productImage: undefined | string | string[], currentProduct: Product}) {
  return (
    <div className="w-full lg:w-[35rem] h-fit lg:max-h-[35rem] flex justify-around middle:sticky top-[10px] mx-auto">
        <Carousel productImg={productImage} inProduct={true}/>
        <WishButton product={currentProduct}/>
    </div>
  )
}
