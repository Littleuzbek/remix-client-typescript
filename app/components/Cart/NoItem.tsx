import cat from "../../assets/cart.webp";
import { translateText } from "../Extra/Translation";

export default function NoItem() {
  return (
    <div className="w-full flex flex-col items-center justify-center">
      <img
        src={cat}
        alt=""
        className="w-[25rem] h-[15rem] object-cover my-[1rem]"
      />
      <h3 className="flex items-center gap-[.5rem]">
        {translateText()?.emptyCartMessage?.a}
        <p className="text-[2.2rem]">🙀</p>
      </h3>
      <h3 className="flex items-center gap-[.5rem]">
        {translateText()?.emptyCartMessage?.b}
         <p className="text-[2.2rem]">😽</p>
      </h3>
    </div>
  );
}
