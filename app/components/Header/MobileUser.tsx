import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "@remix-run/react";
import {
    ArrowLeftToLine,
    BadgeQuestionMark,
    FileUser,
    Globe,
    ShoppingBag,
    X,
} from "lucide-react";
import { autoPicture } from "../Extra/Extra";
import { RootState } from "~/root";
import { auth } from "~/firebase";
import { UserData } from "~/utils";

export default function MobileUser({ onNavigate }: { onNavigate: () => void }) {
  const userInfo = useSelector((state: RootState) => state.cart.user) as UserData | null;
  const [picture, setPicture] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const getUserImages = async () => {
      const image = await autoPicture();

      setPicture(image);
    };

    getUserImages();
  }, []);

  const userNavigation = [
    {
      id: "orders",
      icon: ShoppingBag,
      label: "Buyurtmalar",
      navigation: `/user/${auth?.currentUser?.uid}/orders`,
    },
    {
      id: "user",
      icon: FileUser,
      label: "Ma'lumotlarim",
      navigation: `/user/${auth?.currentUser?.uid}/main`,
    },
    {
      id: "support",
      icon: BadgeQuestionMark,
      label: "Yordam",
      navigation: `/user/${auth?.currentUser?.uid}/support`,
    },
    { id: "language", icon: Globe, label: "Sayt tili" },
  ];

  return (
    <div className="flex flex-col fixed z-3 top-[0] left-[0] right-[0] bottom-[0] bg-[white]">
      <div className="w-full h-fit py-[10px] flex flex-col items-center justify-center">
        <img src={picture || ""} alt="" className="w-[13rem] h-[13rem]"/>
        <h1 className="text-[var(--first-color)]">{userInfo?.name || "..."}</h1>
      </div>

      <div className="grid grid-cols-2 gap-[5px]">
        {userNavigation.map((key, i) => (
          <button
            className="h-[6rem] flex flex-col items-center justify-center gap-[5px] text-[18px] border-none bg-transparent text-[black]"
            key={i + "btn"}
            onClick={() => {
              onNavigate();
              return key.id === "language" || navigate(key.navigation as string);
            }}
          >
            <key.icon className="w-[30px] h-[30px]" />
            {key.label}
          </button>
        ))}
        <button className="h-[6rem] flex flex-col items-center justify-center gap-[5px] text-[18px] border-none bg-transparent text-[black]">
          <ArrowLeftToLine /> Akkauntdan chiqish
        </button>
        <button className="h-[6rem] flex flex-col items-center justify-center gap-[5px] text-[18px] border-none bg-transparent text-[black]"
        onClick={()=>onNavigate()}>
          <X /> Menyudan chiqish
        </button>
      </div>
    </div>
  );
}
