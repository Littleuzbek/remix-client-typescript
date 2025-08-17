import { useLoaderData } from "@remix-run/react";
import {default as ProductPage} from "../components/Product/Product"
import { LoaderFunctionArgs, MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => {
  return [
    { title: "PRODUCT / EXKO" },
    { name: "EXKO product", content: "Welcome to EXKO!" },
  ];
};

export const loader = ({ params }: LoaderFunctionArgs): string | undefined => {
  const { id } = params;
  return id;
};

export default function Product() {
  const productId = useLoaderData<string | undefined>();
  return (
    <ProductPage productId={productId}/>
  )
}
