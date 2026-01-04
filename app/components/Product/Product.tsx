import { useSelector } from "react-redux";
import { RootState } from "~/root";
import { useNavigate } from "@remix-run/react";
import type { Product } from "~/utils";
import { IoMdArrowRoundBack } from "react-icons/io";
import { useEffect, useState } from "react";
import ProductImage from "./ProductImage";
import ShoppingDetails from "./ShoppingDetails";
import RelatedProducts from "./RelatedProducts";
import { ProductShuffler } from "../Extra/Extra";
import Viewer from "../Extra/Viewer";
import { translateText } from "../Extra/Translation";

export default function Product({
  productId,
}: {
  productId: string | undefined;
}) {
  const allProducts = useSelector((state: RootState) => state.cart.products) as
    | Product[]
    | null;
  const product = allProducts?.find((item: Product) => item.id === productId) as Product;
  const navigate = useNavigate();
  const [relatedProducts, setRelatedProducts] = useState<Product[] | null>(null);

  useEffect(() => {
    const getRelatedProducts = async () => {
      if (!allProducts || !product) return;
      const filteredProducts = await ProductShuffler(allProducts, product);
      setRelatedProducts(filteredProducts);
      window.scrollTo(0, 0);
    };

    getRelatedProducts();
    
    // eslint-disable-next-line
  }, [product]);

  return (
    <>
      <button
        className="w-full bg-transparent border-none hidden middle:block"
        onClick={() => window?.history?.state.idx > 0 ? navigate(-1) : navigate("/")}
      >
        <h2 className="w-fit mt-[2rem] mx-auto mb-0 cursor-pointer text-[1.5rem]">
            <IoMdArrowRoundBack /> {translateText()?.productBackButton}
        </h2>
      </button>
      <div className="w-[95%] middle:w-[90%] flex flex-col middle:flex-row rounded-[20px] my-[2rem] mx-auto">
        <ProductImage productImage={product?.image || product?.images} currentProduct={product} />
        <ShoppingDetails productDetails={product} />
      </div>

      <RelatedProducts relatedProducts={relatedProducts}/>
      <Viewer productImage={product?.image || product?.images}/>
    </>
  );
}
