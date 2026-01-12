import { useRef, useState } from "react";
import { useFetcher } from "@remix-run/react";
import { signInWithEmailAndPassword } from "firebase/auth";

import { auth } from "../../firebase";

import { Loader } from "lucide-react";
import { translateText } from "../Extra/Translation";

export default function Login() {
  const email = useRef<null | HTMLInputElement>(null);
  const password = useRef<null | HTMLInputElement>(null);
  const [error, setError] = useState<false | string>(false);
  const [loader, setLoader] = useState<boolean>(false);
  const fetcher = useFetcher();

  const signInUser = async (email: string, password: string): Promise<void> => {
    if (email !== "" && password !== "") {
      setLoader(true);
      signInWithEmailAndPassword(auth, email, password)
        .then(async (res) => {
          if (res.user.uid) {
            fetcher.submit(
              {
                userId: res.user.uid,
                email: email,
                password: password,
              },
              { method: "post", action: "/authentication" }
            );
          }
        })
        .catch(() => {
          setLoader(false);
          setError("email or password is wrong!");
        });
    } else {
      setLoader(false);
      setError("Please enter requirements");
    }
  };

  const EnterHandler = (): void => {
    if (email?.current && password?.current) {
      signInUser(
        email?.current?.value?.trim(),
        password?.current?.value?.trim()
      );
    }
  };

  return (
    <form
      className={`login-form w-full lg:w-[25rem] rounded-[10px] border-3 border-[var(--second-color)] py-[1rem] flex flex-col gap-[1rem] items-center text-[black] relative hover:text-[black] hover:${loader ?  "cursor-progress" : "cursor-default"} `}
      onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
        loader ? e.preventDefault() : 
        e.preventDefault();
        EnterHandler();
      }}
    >
      <h2>{translateText()?.login}</h2>
      <div className="product-info w-[90%] h-fit  relative select-none">
        <p className="left-[5%] text-[.9rem] w-fit bg-[black] text-[white] rounded-[10px] px-[5px] absolute top-[0] z-[2]">
          {translateText()?.labelEmail}
        </p>
        <input
          type="text"
          required
          ref={email}
          className="w-full h-[3.2rem] rounded-[10px] pt-[5px] px-[10px] mt-[.7rem] text-[1.2rem] border-2 border-[black] relative focus:outline-0"
        />
      </div>
      <div className="product-info w-[90%] h-fit  relative select-none">
        <p className="left-[5%] text-[.9rem] w-fit bg-[black] text-[white] rounded-[10px] px-[5px] absolute top-[0] z-[2]">
          {translateText()?.labelPassword}
        </p>
        <input
          type="text"
          required
          ref={password}
          className="w-full h-[3.2rem] rounded-[10px] pt-[5px] px-[10px] mt-[.7rem] text-[1.2rem] border-2 border-[black] relative focus:outline-0"
        />
      </div>

      <button
        className="login-btn bg-[var(--first-color)] border-none rounded-[10px] text-[18px] text-[white] py-[.5rem] px-[20%] cursor-pointer duration-300 hover:bg-[var(--first-color-light)]"
        // onClick={(e: React.MouseEvent<HTMLButtonElement>) => (loader ? e.preventDefault() : EnterHandler())}
        type={loader ? "button" : "submit"}
      >
        {loader ? <Loader className="auth-loader" /> : `${translateText()?.login}`}
      </button>

      {error && <p className="text-[red] text-[1.2rem]">{error}</p>}
    </form>
  );
}
