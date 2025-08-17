import { ActionFunctionArgs, MetaFunction, redirect } from "@remix-run/node";
import Cart from "~/components/Cart/Cart";
import { order, tokenVerifier } from "~/utils";

export const meta: MetaFunction = () => {
  return [
    { title: "CART / EXKO" },
    { name: "EXKO authentication", content: "Welcome to EXKO!" },
  ];
};

export const action = async ({request}: ActionFunctionArgs) => {
  const formData = await request.formData()

  try {
    const location = formData.get("location") as string;
    const nasiyaPeriod = formData.get("nasiyaPeriod") as string;
    const cartString = formData.get("items");
    const userId = formData.get("userId") as string;
    const idToken = formData.get("idToken") as string;
    const cart = JSON.parse(cartString as string) ;

    const tokenUid = await tokenVerifier(idToken);

    if (tokenUid !== userId) return redirect("/authentication");
    
    if (location.trim() === "") return null;

    await order(userId, cart, location, nasiyaPeriod);

    return redirect(`/user/${userId}/orders`);
  } catch (err) {
    return { error: err, success: false };
  }
  
}

export default function CartPage() {
  return (
    <Cart />
  )
}
