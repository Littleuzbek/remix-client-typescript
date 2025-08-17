import { ActionFunctionArgs, MetaFunction, redirect } from "@remix-run/node";
import { sendSupportMessage, setUserSupportChat, tokenVerifier } from "~/utils";
import Support from "~/components/User/Support/Support";

export const meta: MetaFunction = () => {
  return [
    { title: "SUPPORT / EXKO" },
    { name: "EXKO support", content: "Welcome to EXKO!" },
  ];
};

export const action = async ({ request, params }: ActionFunctionArgs) => {
  const { id } = params;
  const formData = await request.formData();
  const idToken = formData.get("idToken");
  const chatExists = formData.get("exist");
  const message = formData.get("message") as string;
  const file = formData.get("image");

  if (message?.trim() === "") return false;

  const tokenUid = await tokenVerifier(idToken as string);

  if (tokenUid !== id)
    return tokenUid ? redirect(`/user/${tokenUid}/support`) : redirect(`/`);

  if (chatExists === "false") {
    if (file instanceof File) {
      if (!file.type.startsWith("image/")) return { success: false };

      await setUserSupportChat(id, file, true);
      return { success: true };
    }

    await setUserSupportChat(id, message);
    return { success: true };
  }

  if (chatExists === "true") {
    if (file instanceof File) {
      if (!file.type.startsWith("image/")) return { success: false };

      await sendSupportMessage(id, file, true);
      return { success: true };
    }

    await sendSupportMessage(id, message);
    return { success: true };
  }

  return { success: true };
};

export default function UserSupport() {
  return (
    <Support />
  )
}
