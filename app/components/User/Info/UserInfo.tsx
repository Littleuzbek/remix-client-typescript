import { useEffect, useState } from "react";
import { GenderSelection } from "./GenderSelect";
import { DatePicker } from "./DatePicker";
import { useFetcher, useNavigate } from "@remix-run/react";
import { formatTimestampToDate } from "~/components/Extra/Extra";
import { auth } from "~/firebase";
import { useSelector } from "react-redux";
import { RootState } from "~/root";
import { UserData } from "~/utils";

export default function UserInfo() {
  const [name, setName] = useState<string>("");
  const [surname, setSurname] = useState<string>("");
  const [gender, setGender] = useState<string>("male");
  const [birth, setBirth] = useState<string>("Tug'ilgan sana");
  const [num, setNum] = useState<string>("");
  const user = useSelector((state: RootState) => state.cart.user) as UserData | null;
  const fetcher = useFetcher();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      setName(user?.name || "");
      setSurname(user?.surname || "");
      setNum(user?.number || "");
      setGender(user?.gender || "male");
      setBirth(formatTimestampToDate(user?.birthDay || null) || "Tug'ilgan sana");
    }
  }, [user]);

  const cancelChange = () => {
    setName(user?.name || "");
    setSurname(user?.surname || "");
    setNum(user?.number || "");
    setGender(user?.gender || "male");
    setBirth(formatTimestampToDate(user?.birthDay || null) || "Tug'ilgan sana");
  };

    const userDataChangeHandler = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    try {
      const target = e.target as HTMLFormElement;
      const oldBirthDay = await auth?.currentUser?.getIdToken();
      const formData = new FormData(target);

      if(!oldBirthDay) return navigate("/authentication");
      formData.append("oldBirthDay", oldBirthDay);
      formData.append("action", "action");
      fetcher.submit(formData, { method: "post" });
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="h-fit p-[1rem] border-3 border-[var(--first-color)] rounded-[20px]">
      <h2 className="text-center">Ma&apos;lumotlarim</h2>

      <form onSubmit={userDataChangeHandler} className="flex flex-wrap justify-center" id="infoForm">
        <div className="w-[20rem] h-fit my-[1.5rem] mx-[5%] relative select-none">
          <p className="text-[.9rem] w-fit bg-[black] text-[white] rounded-[10px] px-[5px] absolute top-[0] left-[2%] z-[2] ">
            Ism
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
            Familiya
          </p>
          <input
            type="text"
            value={surname}
            name="userSurname"
            onChange={(e) => setName(e.target.value)}
            className="w-full h-[3.2rem] rounded-[10px] pt-[5px] px-[10px] mt-[.7rem] text-[18px] border-2 border-[black] relative focus:outline-none "
          />
        </div>
        <div className="w-[20rem] h-fit my-[1.5rem] mx-[5%] relative select-none">
          <p className="text-[.9rem] w-fit bg-[black] text-[white] rounded-[10px] px-[5px] absolute top-[0] left-[2%] z-[2] ">
            Telfon raqam
          </p>
          <input
            type="text"
            value={num}
            name="userNum"
            onChange={(e) => setName(e.target.value)}
            className="w-full h-[3.2rem] rounded-[10px] pt-[5px] px-[10px] mt-[.7rem] text-[18px] border-2 border-[black] relative focus:outline-none "
          />
        </div>
        <div className="w-[20rem] h-fit my-[1.5rem] mx-[5%] relative select-none">
          <p className="text-[.9rem] w-fit bg-[black] text-[white] rounded-[10px] px-[5px] absolute top-[0] left-[2%] z-[2] ">
            Email
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
            Tug&apos;ilgan sana
          </p>
          <DatePicker onDateChange={() => setBirth("")} placeholder={birth} />
          <input type="hidden" readOnly value={birth || ""} name="birthDay" />
        </div>
        <GenderSelection
          onChange={(gender) => setGender(gender)}
          defaultValue={gender}
          name="user-gender"
        />
      </form>

      {name !== (user?.name || "") ||
      surname !== (user?.surname || "") ||
      num !== (user?.number || "") ||
      gender !== (user?.gender || "male") ||
      birth !== (user?.birthDay || "Tug'ilgan sana") ? (
        <div className="w-full flex items-center justify-center gap-[1rem]">
          <button
            type="button"
            form="infoForm"
            className="bg-[var(--second-color)] text-[black] w-fit py-[5px] px-[1.5rem] text-[18px] border-none rounded-[5px] relative cursor-pointer"
            onClick={() => cancelChange()}
          >
            Cancel
          </button>
          <button type="submit" form="infoForm" className="w-fit py-[5px] px-[1.5rem] text-[18px] text-[white] bg-[var(--first-color)] border-none rounded-[5px] relative cursor-pointer hover:bg-[var(--first-color-light)] duration-300">
            Submit
          </button>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}
