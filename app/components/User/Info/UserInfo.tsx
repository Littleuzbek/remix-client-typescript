import { useEffect, useState } from "react";
import { GenderSelection } from "./GenderSelect";
import { DatePicker } from "./DatePicker";
import { useFetcher, useNavigate } from "@remix-run/react";
import { formatTimestampToDate, getToken } from "~/components/Extra/Extra";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "~/root";
import { UserData } from "~/utils";
import { cartAction } from "~/store/CartSlice";
import { translateText } from "~/components/Extra/Translation";

interface updateValue {
  name: string;
  isAdmin?: boolean;
  email: string;
  number: null | number;
  createdAt: {
    _seconds: number;
    _nanoseconds: number;
  };
  banned: boolean;
  gender: string | null;
  surname: string | null;
  birthDay: {
    _seconds: string;
    _nanoseconds: string;
  } | null;
}

interface userChangePromise {
  success: boolean
  updated?: updateValue
  error?: string
}

export default function UserInfo() {
  const [name, setName] = useState<string>("");
  const [surname, setSurname] = useState<string>("");
  const [gender, setGender] = useState<string>("male");
  const [birth, setBirth] = useState<string | undefined>("Tug'ilgan sana");
  const [num, setNum] = useState<string>("");
  const [loader, setLoader] = useState<boolean>(false);
  const user = useSelector(
    (state: RootState) => state.cart.user
  ) as UserData | null;
  const fetcher = useFetcher();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      setName(user?.name || "");
      setSurname(user?.surname || "");
      setNum(user?.number || "");
      setGender(user?.gender || "male");
      setBirth(
        formatTimestampToDate(user?.birthDay || null) || "Tug'ilgan sana"
      );
    }
    
  }, [user]);

  const cancelChange = () => {
    setName(user?.name || "");
    setSurname(user?.surname || "");
    setNum(user?.number || "");
    setGender(user?.gender || "male");
    setBirth(formatTimestampToDate(user?.birthDay || null) || "Tug'ilgan sana");
  };

  const userDataChangeHandler = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();
    try {
      const target = e.target as HTMLFormElement;
      const oldBirthDay = await getToken();
      const formData = new FormData(target);

      if (!oldBirthDay) return navigate("/authentication");
      formData.append("oldBirthDay", oldBirthDay);
      formData.append("action", "action");
      fetcher.submit(formData, { method: "post" });
      setLoader(true);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(()=>{
    const changes = fetcher?.data as userChangePromise;
    if(changes?.success){
      dispatch(cartAction.setUser(changes.updated));
      sessionStorage.setItem("userData", JSON.stringify(changes.updated));
      setLoader(false);
    }
    // eslint-disable-next-line
  },[fetcher?.data])

  const hasChanged =
    name !== (user?.name || "") ||
    surname !== (user?.surname || "") ||
    num !== (user?.number || "") ||
    gender !== (user?.gender || "male") ||
    birth !==
      (formatTimestampToDate(user?.birthDay || null) || "Tug'ilgan sana");

  return (
    <div className="h-fit p-[1rem] border-3 border-[var(--first-color)] rounded-[20px]">
      <h2 className="text-center lg:font-bold lg:text-xl">{translateText()?.userControlInfo}</h2>

      <form
        onSubmit={userDataChangeHandler}
        className="flex flex-wrap justify-center"
        id="infoForm"
      >
        <div className="w-[20rem] h-fit my-[1.5rem] mx-[5%] relative select-none">
          <p className="text-[.9rem] w-fit bg-[black] text-[white] rounded-[10px] px-[5px] absolute top-[0] left-[2%] z-[2] ">
            {translateText()?.userNameLabel}
          </p>
          <input
            type="text"
            value={name}
            name="userName"
            onChange={(e) => setName(e.target.value)}
            className="w-full h-[3.2rem] rounded-[10px] pt-[5px] px-[10px] mt-[.7rem] text-[18px] border-2 border-[black] relative focus:outline-none "
          />
        </div>
        <div className="w-[20rem] h-fit my-[1.5rem] mx-[5%] relative select-none">
          <p className="text-[.9rem] w-fit bg-[black] text-[white] rounded-[10px] px-[5px] absolute top-[0] left-[2%] z-[2] ">
            {translateText()?.userSurnameLabel}
          </p>
          <input
            type="text"
            value={surname}
            name="userSurname"
            onChange={(e) => setSurname(e.target.value)}
            className="w-full h-[3.2rem] rounded-[10px] pt-[5px] px-[10px] mt-[.7rem] text-[18px] border-2 border-[black] relative focus:outline-none "
          />
        </div>
        <div className="w-[20rem] h-fit my-[1.5rem] mx-[5%] relative select-none">
          <p className="text-[.9rem] w-fit bg-[black] text-[white] rounded-[10px] px-[5px] absolute top-[0] left-[2%] z-[2] ">
            {translateText()?.userNumberLabel}
          </p>
          <input
            type="text"
            value={num}
            name="userNum"
            onChange={(e) => setNum(e.target.value)}
            className="w-full h-[3.2rem] rounded-[10px] pt-[5px] px-[10px] mt-[.7rem] text-[18px] border-2 border-[black] relative focus:outline-none "
          />
        </div>
        <div className="w-[20rem] h-fit my-[1.5rem] mx-[5%] relative select-none">
          <p className="text-[.9rem] w-fit bg-[black] text-[white] rounded-[10px] px-[5px] absolute top-[0] left-[2%] z-[2] ">
            {translateText()?.userMailLabel}
          </p>
          <input
            type="text"
            value={user?.email || ""}
            readOnly
            className="w-full h-[3.2rem] rounded-[10px] pt-[5px] px-[10px] mt-[.7rem] text-[18px] border-2 border-[black] relative focus:outline-none "
          />
        </div>
        <div className="w-[20rem] h-fit my-[1.5rem] mx-[5%] relative select-none">
          <p className="text-[.9rem] w-fit bg-[black] text-[white] rounded-[10px] px-[5px] absolute top-[0] left-[2%] z-[2] ">
            {translateText()?.userBirthdayLabel}
          </p>
          <DatePicker
            onDateChange={(e) => setBirth(e as string | undefined)}
            placeholder={birth}
          />
          <input type="hidden" readOnly value={birth || ""} name="birthDay" />
        </div>
        <GenderSelection
          onChange={(gender) => setGender(gender)}
          defaultValue={gender}
          name="user-gender"
        />
      </form>

      {hasChanged ? (
        <div className="w-full flex items-center justify-center gap-[1rem]">
          {loader ? (
            "Loading..."
          ) : (
            <>
              <button
                type="button"
                form="infoForm"
                className="bg-[var(--second-color)] text-[black] w-fit py-[5px] px-[1.5rem] text-[18px] border-none rounded-[5px] relative cursor-pointer"
                onClick={() => cancelChange()}
              >
                Cancel
              </button>
              <button
                type="submit"
                form="infoForm"
                className="w-fit py-[5px] px-[1.5rem] text-[18px] text-[white] bg-[var(--first-color)] border-none rounded-[5px] relative cursor-pointer hover:bg-[var(--first-color-light)] duration-300"
              >
                Submit
              </button>
            </>
          )}
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}
