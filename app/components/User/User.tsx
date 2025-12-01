import { Outlet, useLocation, useNavigate } from "@remix-run/react";
import { useSelector } from "react-redux";
import { signOut } from "firebase/auth";
import { auth } from "~/firebase";
import { RootState } from "~/root";
import avatar1 from "../../assets/avatar/avatar1.png";
import { UserData } from "~/utils";
import { translateText } from "../Extra/Translation";

export default function User() {
  const userInfo = useSelector((state: RootState) => state.cart.user) as UserData | null;
  const { pathname } = useLocation();
  const navigate = useNavigate();

  return (
    <div className="w-[95%] middle:w-[90%] my-[1rem] mx-auto">
      <div className="grid place-items-center">
        <img src={avatar1} alt="" className="w-[150px] h-[150px] rounded-[50%]" />
        <h1 className="text-[var(--first-color)]">{userInfo && userInfo?.name || "..."}</h1>
      </div>

      <div className="block middle:grid grid-cols-[20%_79%] gap-[1%] mt-[2rem]">
        <div className="hidden middle:block sticky top-[1rem] h-fit p-[1rem] border-3 border-[var(--first-color)] rounded-[20px]">
          <button
            className="mb-[1rem] text-[1.2rem] w-full flex items-center justify-center gap-[5px] cursor-pointer select-none rounded-[10px] py-[.5rem] bg-transparent border-none"
            onClick={() => {
              navigate(`/user/${auth?.currentUser?.uid}/orders`);
            }}
            style={
              pathname.includes("orders")
                ? { backgroundColor: "var(--first-color)", color: "white" }
                : {}
            }
          >
            {translateText()?.userControlOrders}
          </button>
          <button
            className="mb-[1rem] text-[1.2rem] w-full flex items-center justify-center gap-[5px] cursor-pointer select-none rounded-[10px] py-[.5rem] bg-transparent border-none"
            onClick={() => {
              navigate(`/user/${auth?.currentUser?.uid}/main`);
            }}
            style={
              pathname.includes("main")
                ? { backgroundColor: "var(--first-color)", color: "white" }
                : {}
            }
          >
            {translateText()?.userControlInfo}
          </button>
          <button
            className="mb-[1rem] text-[1.2rem] w-full flex items-center justify-center gap-[5px] cursor-pointer select-none rounded-[10px] py-[.5rem] bg-transparent border-none"
            onClick={() => navigate(`/user/${auth?.currentUser?.uid}/support`)}
            style={
              pathname.includes("support")
                ? { backgroundColor: "var(--first-color)", color: "white" }
                : {}
            }
          >
            {translateText()?.userControlSupport}
          </button>
          <button
            className="mb-[1rem] text-[1.2rem] w-full flex items-center justify-center gap-[5px] cursor-pointer select-none rounded-[10px] py-[.5rem] bg-transparent border-none"
            onClick={() => {
              signOut(auth);
              sessionStorage.clear()
              window.location.href = "/authentication"
            }}
          >
            {translateText()?.userControlExit}
          </button>
        </div>

        <Outlet />
      </div>
    </div>
  );
}
