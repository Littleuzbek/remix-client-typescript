import { useState, useRef } from "react";
import { useFetcher } from "@remix-run/react";
import { auth } from "../../firebase";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { Loader } from "lucide-react";

export default function SignUp() {
  const name = useRef<null | HTMLInputElement>(null);
  const email = useRef<null | HTMLInputElement>(null);
  const password = useRef<null | HTMLInputElement>(null);
  const [error, setError] = useState<false | string>(false);
  const [loader, setLoader] = useState<boolean>(false);
  const fetcher = useFetcher();

  const signUpUser = (
    email: string,
    password: string,
    name: string
  ): void => {
    if (email !== "" && password !== "" && name !== "") {
      setLoader(true);
      createUserWithEmailAndPassword(auth, email, password)
        .then(async (res) => {
          if (res.user.uid) {
            await updateProfile(res.user, {
              displayName: name,
            });
            fetcher.submit(
              {
                newUserData: res.user.uid,
                email: email,
                name: name,
              },
              { method: "post", action: "/authentication" }
            );
          }
        })
        .catch((err) => {
          setLoader(false);
          if (err?.code?.includes("weak")) {
            setError("password is too short");
          } else if (err?.code?.includes("in-use")) {
            setError("email is already in use!");
          } else {
            setError("error happend, please try again later");
          }
        });
    } else {
      console.log("err");
      setError("Please enter requirements");
    }
  };

  const EnterHandler = () => {
    if (email?.current && password?.current && name?.current) {
      signUpUser(
        email?.current?.value?.trim(),
        password?.current?.value?.trim(),
        name?.current?.value?.trim()
      );
    }
  };

  return (
    <form
      className="signup-form w-[25rem] rounded-[10px] border-3 border-[var(--second-color)] py-[1rem] flex flex-col gap-[1rem] items-center text-[black] relative hover:text-[black] hover:cursor-default"
      onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
        loader ? e.preventDefault() : e.preventDefault();
        EnterHandler();
      }}
    >
      <h2>Sign Up</h2>
      <div className="product-info w-[90%] h-fit  relative select-none">
        <p className="left-[5%] text-[.9rem] w-fit bg-[black] text-[white] rounded-[10px] px-[5px] absolute top-[0] left-[2%] z-[2]">
          Name
        </p>
        <input
          type="text"
          required
          ref={name}
          className="w-full h-[3.2rem] rounded-[10px] pt-[5px] px-[10px] mt-[.7rem] text-[1.2rem] border-2 border-[black] relative focus:outline-0"
        />
      </div>
      <div className="product-info w-[90%] h-fit  relative select-none">
        <p className="left-[5%] text-[.9rem] w-fit bg-[black] text-[white] rounded-[10px] px-[5px] absolute top-[0] left-[2%] z-[2]">
          Email
        </p>
        <input
          className="w-full h-[3.2rem] rounded-[10px] pt-[5px] px-[10px] mt-[.7rem] text-[1.2rem] border-2 border-[black] relative focus:outline-0"
          type="text"
          required
          ref={email}
        />
      </div>
      <div className="product-info w-[90%] h-fit  relative select-none">
        <p className="left-[5%] text-[.9rem] w-fit bg-[black] text-[white] rounded-[10px] px-[5px] absolute top-[0] left-[2%] z-[2]">
          Password
        </p>
        <input
          className="w-full h-[3.2rem] rounded-[10px] pt-[5px] px-[10px] mt-[.7rem] text-[1.2rem] border-2 border-[black] relative focus:outline-0"
          type="text"
          required
          ref={password}
        />
      </div>

      <button
        className="login-btn bg-[var(--first-color)] border-none rounded-[10px] text-[18px] text-[white] py-[.5rem] px-[20%] cursor-pointer duration-300 hover:bg-[var(--first-color-light)]"
        type={loader ? "button" : "submit"}
      >
        {loader ? <Loader className="auth-loader" /> : "Sign Up"}
      </button>

      {error && <p className="text-[red] text-[1.2rem]">{error}</p>}
    </form>
  );
}
