import { useLocation, useNavigate } from "@remix-run/react";
// import { useSelector } from "react-redux";
import { LuUserRound } from "react-icons/lu";
import { auth } from "../../firebase";
import { onAuthStateChanged } from "firebase/auth";

export default function User() {
  // const isLogged = useSelector((state) => state.cart.isLogged);
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const handleNavigation = () => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        navigate(`/user/${auth?.currentUser?.uid}/orders`);
      } else {
        navigate("/authentication");
      }
    });
  };

  return (
    <button
      className="navbar-user h-[2.5rem] text-[black] text-[18px] rounded-[5px] p-[5px_1.5rem_5px_1rem] flex items-center justify-center gap-[5px] transition-all duration-300 cursor-pointer hover:text-[white] hover:bg-[var(--first-color)] relative select-none border-none"
      style={
        pathname?.includes("/authentication")
          ? { backgroundColor: "var(--first-color)", color: "white" }
          : {}
      }
      onClick={() => handleNavigation()}
    >
      <LuUserRound className="text-[25px]" />
      {auth?.currentUser?.displayName ? auth.currentUser.displayName : "Kirish"}
      {/* Kirish */}
    </button>
  );
}
