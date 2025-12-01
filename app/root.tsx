import {
  ClientLoaderFunctionArgs,
  data,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import type { LinksFunction } from "@remix-run/node";
import { Provider } from "react-redux";

import "./tailwind.css";
import { getProducts, Product } from "./utils";
import store from "./store/store";
import AppShell from "./AppShell";

export const links: LinksFunction = () => [
  {
    rel: "preconnect",
    href: "https://fonts.googleapis.com",
  },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400..900;1,400..900&display=swap",
  },
  {
    rel: "stylesheet",
    href: "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.7.2/css/all.min.css",
  },
];

export type RootState = ReturnType<typeof store.getState>;

export const loader = async () => {
  const products = await getProducts();

  return data(
    { products },
    {
      status: 200,
      headers: { "Cache-Control": "public, max-age=21600, s-maxage=21600" },
    }
  );
};

export const clientLoader = async ({ serverLoader }: ClientLoaderFunctionArgs) => {
  const state = store.getState();
  if (state?.cart?.products) return { products: state?.cart?.products || [] };
  
  const loaderData = await serverLoader() as { products: Product[] };
  const query = loaderData?.products;
  return { products: query };
};

clientLoader.hydrate = true;

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <Provider store={store}>
          <AppShell>{children}</AppShell>
          <ScrollRestoration />
          <Scripts />
        </Provider>
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}
