import { ActionFunctionArgs, MetaFunction } from "@remix-run/node";
import UserInfo from "~/components/User/Info/UserInfo";
import {
  changeData,
  changeUserData,
  getUserData,
  tokenVerifier,
} from "~/utils";

export const meta: MetaFunction = () => {
  return [
    { title: "ME / EXKO" },
    { name: "MY EXKO PROFILE", content: "Welcome to EXKO!" },
  ];
};

export async function action({ request, params }: ActionFunctionArgs) {
  const { id } = params;
  const formData = await request.formData();
  const actionType = formData.get("action");
  const idToken = formData.get("oldBirthDay") as string;
  
  if (actionType === "action") {
    const userGender = formData.get("user-gender");
    const birthDay = formData.get("birthDay");
    const userName = formData.get("userName");
    const userSurname = formData.get("userSurname");
    const userNum = formData.get("userNum");

    const newUserData = {
      userGender,
      birthDay,
      userName,
      userSurname,
      userNum,
    };

    await changeUserData(id as string, newUserData as changeData, idToken);

    return true;
  }

  if (actionType === "read") {
    if (idToken === "null" || idToken === "") return null;

    try {
      const checkedToken = await tokenVerifier(idToken);
      if (typeof id !== "string" || !checkedToken || checkedToken !== id) return null;
      const userData = await getUserData(id);
      return { userData };
    } catch (err) {
      console.log(err);
    }
  }
  
  return null;
}

export default function Main() {
  return <UserInfo />;
}
