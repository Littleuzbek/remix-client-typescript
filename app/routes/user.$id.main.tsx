import { ActionFunctionArgs, LoaderFunctionArgs, MetaFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import UserInfo from "~/components/User/Info/UserInfo";
import { changeData, changeUserData, getUserData } from "~/utils";

export const meta: MetaFunction = () => {
  return [
    { title: "ME / EXKO" },
    { name: "MY EXKO PROFILE", content: "Welcome to EXKO!" },
  ];
};

export const loader = async ({ params }: LoaderFunctionArgs) => {
  const { id } = params;

  if(typeof id !== "string") return null

  const userData = await getUserData(id);
  return { userData };
};

export async function action({ request, params }: ActionFunctionArgs) {
  const { id } = params;
  const formData = await request.formData();

  const userGender = formData.get("user-gender");
  const birthDay = formData.get("birthDay");
  const userName = formData.get("userName");
  const userSurname = formData.get("userSurname");
  const userNum = formData.get("userNum");
  const idToken = formData.get("oldBirthDay");

  const newUserData = {
    userGender,
    birthDay,
    userName,
    userSurname,
    userNum,
  };

  await changeUserData(id as string, newUserData as changeData, idToken as string);

  return true;
}

export default function Main() {
  const userData = useLoaderData<typeof loader>();
  return <UserInfo user={userData?.userData}/>;
}
