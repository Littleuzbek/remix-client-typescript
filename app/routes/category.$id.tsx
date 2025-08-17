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

export const clientLoader = async ({ params }: ClientLoaderFunctionArgs) => {
  const { id } = params;

  const category = [
    {
      path: "electronics",
      category: "electronics",
      title: "Elektronika",
    },
    { path: "books", category: "books", title: "Kitoblar" },
    {
      path: "kidsClothes",
      category: "kidsClothes",
      title: "Bolalar kiyimlari",
    },
    {
      path: "womenClothes",
      category: "clothes",
      title: "Ayollar kiyimlari",
    },
    {
      path: "clothes",
      category: "clothes",
      title: "Ayollar kiyimlari",
      title2: "Erkaklar kiyimlari",
      title3: "Bolalar kiyimlari",
    },
    {
      path: "menClothes",
      category: "menClothes",
      title: "Erkaklar kiyimlari",
    },
    { path: "shoes", category: "shoes", title: "Poyafzal" },
    { path: "cosmetics", category: "shampoo", title: "Kosmetika" },
    { path: "health", category: "health", title: "Salomatlik" },
    { path: "laptops", category: "laptops", title: "Kompyuterlar" },
    { path: "toys", category: "toys", title: "O'yinchoqlar" },
    { path: "watches", category: "watches", title: "Saotlar" },
    {
      path: "accessuaries",
      category: "accessuaries",
      title: "Aksessuarlar",
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
