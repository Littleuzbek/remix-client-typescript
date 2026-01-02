import type { MetaFunction } from "@remix-run/node";
import { useSelector } from "react-redux";
import Home from "~/components/Home/Home";
import { RootState } from "~/root";
import { Product } from "~/utils";

export const meta: MetaFunction = () => {
  return [
    { title: "EXKO" },
    { name: "EXKO shop", content: "Welcome to EXKO!" },
  ];
};

export default function Index() {
  const products = useSelector((state: RootState) => state.cart.products) as Product[] | null;
  return (
    <div className="home-page w-[95%] m-[0_auto]">
      <Home data={products} />
    </div>
  );
}
