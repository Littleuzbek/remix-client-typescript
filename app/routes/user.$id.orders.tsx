import { redirect, redirectDocument, useActionData, useFetcher, useLocation } from "@remix-run/react";
import { useEffect, useState } from "react";
import OrderHistory from "~/components/User/Orders/OrderHistory";
import { cancelOrder, getUserOrders, OrderProps, tokenVerifier } from "../utils";
import { ActionFunctionArgs, MetaFunction } from "@remix-run/node";
import { getToken } from "~/components/Extra/Extra";

export const meta: MetaFunction = () => {
  return [
    { title: "MY ORDERS / EXKO" },
    { name: "EXKO orders", content: "Welcome to EXKO!" },
  ];
};

export const action = async ({ request, params }: ActionFunctionArgs) => {
  const { id } = params;
  const formData = await request.formData();
  const idToken = formData.get("idToken") as string;
  const actionType = formData.get("orderType");
  const orderType = formData.get("typ") as string;
  const isOrder = formData.get("ord") as string;
  const order = JSON.parse(isOrder);

  if(id === "undefined" || idToken === "null") return redirect(`/authentication`);

  const tokenUid = await tokenVerifier(idToken);

  if (tokenUid !== id) return redirect(`/authentication`);

  if (actionType === "read") return await getUserOrders(id);

  if (actionType === "action" && order?.orderId) {
    try {
      
      const isNasiya = orderType === "true";
      await cancelOrder(isNasiya, order.orderId, id);

      return redirectDocument(request.url);
    } catch (err) {
      console.log(err);
    }
  }

  return true;
};

export default function Orders() {
  const [orders, setOrders] = useState<false | OrderProps[]>(false);
  const { pathname } = useLocation();
  const fetcher = useFetcher();
  const data = useActionData<typeof action>();

  useEffect(() => {
    const fetchOrders = async (): Promise<void> => {
      const token = await getToken();
      
      fetcher.submit(
        { idToken: token, orderType: "read" },
        { method: "post", action: pathname }
      );
    }
    
    fetchOrders();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    const orderss = fetcher?.data || data;
    if (orderss && Array.isArray(orderss)) {
      setOrders(orderss);
    }
  }, [fetcher?.data, data]);
  return <OrderHistory orderData={orders} />;
}
