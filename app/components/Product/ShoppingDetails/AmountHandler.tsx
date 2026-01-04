import { FaMinus, FaPlus } from "react-icons/fa";
import { translateText } from "~/components/Extra/Translation";

interface AmountProps {
  quantity: number;
  onAmountHandler: (amount: string) => void;
}

export default function AmountHandler({
  quantity,
  onAmountHandler,
}: AmountProps) {
  return (
    <div className="hidden middle:block w-[8rem] my-[.5rem]">
      {/* <p>{translateText().amount}:</p> */}
      <p className="mt-[.5rem] mb-[.3rem]">{translateText()?.productAmount}:</p>
      <div className="w-full h-[2.2rem] flex justify-between items-center bg-[white] border border-[rgb(160, 160, 160)] rounded-[20px] overflow-hidden">
        <button
          className="w-[3rem] h-full flex items-center justify-center border-none bg-[white] cursor-pointer"
          style={
            quantity === 1
              ? { color: "rgb(177, 177, 177)", cursor: "default" }
              : {}
          }
        >
          <FaMinus
            onClick={() => {
              onAmountHandler("-");
            }}
          >
            -
          </FaMinus>
        </button>
        <p className="font-[900]">{quantity}</p>
        <button className="w-[3rem] h-full flex items-center justify-center border-none bg-[white] cursor-pointer">
          <FaPlus
            onClick={() => {
              onAmountHandler("+");
            }}
          >
            +
          </FaPlus>
        </button>
      </div>
    </div>
  );
}
