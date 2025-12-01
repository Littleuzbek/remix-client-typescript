// import { LoaderFunctionArgs } from "@remix-run/node";
import {
  ClientLoaderFunctionArgs,
  data,
  useLoaderData,
} from "@remix-run/react";
import { useSelector } from "react-redux";
import { RootState } from "~/root";
import { Product } from "~/utils";
import Collection from "~/components/Home/Collection";
import { translateText } from "~/components/Extra/Translation";

export const clientLoader = async ({ params }: ClientLoaderFunctionArgs) => {
  const { id } = params;

  const category = [
    {
      path: "electronics",
      category: "electronics",
      title: translateText()?.catalogElectronics,
    },
    { path: "books", category: "books", title: "Kitoblar" },
    {
      path: "kidsClothes",
      category: "kidsClothes",
      title: translateText()?.catalogChildClothes,
    },
    {
      path: "womenClothes",
      category: "clothes",
      title: translateText()?.catalogWomanClothes,
    },
    {
      path: "clothes",
      category: "clothes",
      title: translateText()?.catalogWomanClothes,
      title2: translateText()?.catalogMenClothes,
      title3: translateText()?.catalogChildClothes,
    },
    {
      path: "menClothes",
      category: "menClothes",
      title: translateText()?.catalogMenClothes,
    },
    { path: "shoes", category: "shoes", title: translateText()?.catalogShoes },
    { path: "cosmetics", category: "shampoo", title: translateText()?.catalogCosmetics },
    { path: "health", category: "health", title: translateText()?.catalogHealth },
    { path: "laptops", category: "laptops", title: translateText()?.catalogComputers },
    { path: "toys", category: "toys", title: translateText()?.catalogToys },
    { path: "watches", category: "watches", title: translateText()?.catalogWatches },
    {
      path: "accessuaries",
      category: "accessuaries",
      title: translateText()?.catalogAccess,
    },
    { path: "bu", category: "bu", title: "B/U" },
  ];

  const foundCategory = category.find((ctg) => ctg.path === id);

  if (!foundCategory) {
    throw data("Category not found", { status: 404 });
  }

  return { foundCategory };
};

export default function Category() {
  const products = useSelector((state: RootState) => state.cart.products) as
    | Product[]
    | null;
  const { foundCategory } = useLoaderData<typeof clientLoader>();

  return (
    <div className="home-page w-[90%] mx-[auto]">
      <Collection
        all={
          products?.filter(
            (sortingItems: Product) =>
              foundCategory?.category === sortingItems.proType
          ) || null
        }
        section={
          foundCategory?.category === "clothes"
            ? "Ayollar kiyimlari"
            : foundCategory?.title
        }
      />
    </div>
  );
}
