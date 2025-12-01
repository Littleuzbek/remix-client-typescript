import { Product } from "~/utils";
import Banner from "./Banner";
import Collection from "./Collection";
import { useEffect, useState } from "react";
import { ProductShuffler } from "../Extra/Extra";
import { translateText } from "../Extra/Translation";

type Props = {
  data: Product[] | null;
};

export default function Home({ data }: Props) {
  const [topSeller, setTopSeller] = useState<null | Product[]>(null);
  const [lastProducts, setLastProducts] = useState<null | Product[]>(null);
  const [otherProducts, setOtherProducts] = useState<null | Product[]>(null);

  useEffect(() => {
    if (data) {
      const sortProducts = async () => {
        const newTopSeller = data?.slice(0, 10);
        const newLastProducts = data?.slice(-10);
        const shuffeledProducts = await ProductShuffler(data?.slice(10, data?.length - 10));
        
        setTopSeller(newTopSeller);
        setLastProducts(newLastProducts);
        setOtherProducts(shuffeledProducts);
      }

      sortProducts()
    }
  }, [data]);

  return (
    <>
      <Banner />
      <Collection all={topSeller} section={translateText()?.topSeller} />
      <Banner />
      <Collection all={otherProducts} scroll={true} section={translateText()?.otherProducts} />
      <Banner />
      <Collection all={lastProducts} />
    </>
  );
}
