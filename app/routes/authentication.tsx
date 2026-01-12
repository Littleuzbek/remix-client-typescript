import { useState } from "react";
import { ActionFunctionArgs, MetaFunction } from "@remix-run/node";
import Login from "../components/Auth/Log";
import SignUp from "../components/Auth/SingUp";
import { login, signUp } from "../utils";
import { translateText } from "~/components/Extra/Translation";

export const meta: MetaFunction = () => {
  return [
    { title: "Auth / EXKO" },
    { name: "EXKO authentication", content: "Welcome to EXKO!" },
  ];
};

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const newUserUid = formData.get("newUserData");

  if(newUserUid){
    const singUpData = await signUp(formData);
    return singUpData;
  }else{
    const loginData = await login(formData);
    return loginData;
  }
}

export default function Authentication() {
  const [form, setForm] = useState<boolean>(false);

  return (
    <div className="login-page w-full my-[2rem] grid place-items-center gap-[1rem]">
      {form ? <SignUp /> : <Login />}
      <div className="change-form w-full lg:w-[25rem] p-[.5rem] rounded-[10px] text-[18px] flex justify-center items-center gap-[.5rem] border-3 border-[var(--second-color)]">
        {form ? `${translateText()?.notNewComer}` : `${translateText()?.newComer}`} 
        <button className="text-[18px] bg-[var(--first-color)] text-[white] py-[.5rem] px-[1rem] rounded-[10px] border-none cursor-pointer duration-300 hover:bg-[var(--first-color-light)]" onClick={() => setForm(!form)}>
          {form ? `${translateText()?.login}` : `${translateText()?.signup}`}
        </button>
      </div>
    </div>
  );
}
