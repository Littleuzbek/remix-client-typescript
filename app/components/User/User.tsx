import { Outlet, useLocation, useNavigate } from "@remix-run/react";
import { useDispatch, useSelector } from "react-redux";
import { signOut } from "firebase/auth";
import { auth } from "~/firebase";
import { cartAction } from "../../store/CartSlice";
import { RootState } from "~/root";
import avatar1 from "../../assets/avatar/avatar1.png";
import { UserData } from "~/utils";

export default function User() {
  const userInfo = useSelector((state: RootState) => state.cart.user) as UserData | false;
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  return (
    <div className="w-[90%] my-[1rem] mx-auto">
      <div className="grid place-items-center">
        <img src={avatar1} alt="" className="w-[150px] h-[150px] rounded-[50%]" />
        <h1 className="text-[var(--first-color)]">{userInfo && userInfo?.name || "..."}</h1>
      </div>

      <div className="grid grid-cols-[20%_79%] gap-[1%] mt-[2rem]">
        <div className="sticky top-[1rem] h-fit p-[1rem] border-3 border-[var(--first-color)] rounded-[20px]">
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
            Buyurtmalar
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
            Ma&apos;lumotlarim
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
            EXKO support
          </button>
          <button
            className="mb-[1rem] text-[1.2rem] w-full flex items-center justify-center gap-[5px] cursor-pointer select-none rounded-[10px] py-[.5rem] bg-transparent border-none"
            onClick={() => {
              signOut(auth);
              dispatch(cartAction?.setUser(false));
              dispatch(cartAction?.manageWish(false));
              dispatch(cartAction?.setLogged(false));
              dispatch(cartAction?.setClearCart());
              navigate("/authentication");
            }}
          >
            Tizimdan chiqish
          </button>
        </div>

        <Outlet />
      </div>
    </div>
  );
}
