import { useState } from "react";
import { X, Check } from "lucide-react";

interface Props {
  totalDiscountVal: string;
  on3: string;
  on6: string;
  on12: string;
  onSetNasiyaPeriod: (period: number) => void;
  selectedPeriodVal: number;
}

export default function NasiyaPeriod({
  totalDiscountVal,
  on3,
  on6,
  on12,
  onSetNasiyaPeriod,
  selectedPeriodVal,
}: Props) {
  const [period, setPeriod] = useState(selectedPeriodVal);
  const periodOff = "border-[rgba(0,0,0,0.2)]";
  const periodOn =
    "border-[var(--first-color)] shadow-[0_0_10px_var(--first-color)]";
  return (
    <div className="w-full h-full bg-[rgba(0,0,0,0.3)] fixed top-[0] left-[0] z-100 flex items-center justify-center">
      <div className="w-[95%] middle:w-[27rem] bg-[white] rounded-[10px] py-[1rem] px-[1.5rem] grid gap-[1rem] text-[19px]">
        <h2>Muddatli to&apos;lov</h2>
        <p>Birinchi to&apos;lov vaqti: Hozir</p>

        <button
          type="button"
          className={`w-full h-[3rem] bg-transparent border-3 rounded-[10px] px-[10px] flex items-center justify-between text-[19px] cursor-pointer ${
            period === 3 ? periodOn : periodOff
          }`}
          onClick={() => setPeriod(3)}
        >
          <p>3 oy</p>
          <p>{on3} so&apos;m/oyiga</p>
        </button>
        <button
          type="button"
          className={`w-full h-[3rem] bg-transparent border-3 rounded-[10px] px-[10px] flex items-center justify-between text-[19px] cursor-pointer ${
            period === 6 ? periodOn : periodOff
          }`}
          onClick={() => setPeriod(6)}
        >
          <p>6 oy</p>
          <p>{on6} so&apos;m/oyiga</p>
        </button>
        <button
          type="button"
          className={`w-full h-[3rem] bg-transparent border-3 rounded-[10px] px-[10px] flex items-center justify-between text-[19px] cursor-pointer ${
            period === 12 ? periodOn : periodOff
          }`}
          onClick={() => setPeriod(12)}
        >
          <p>12 oy</p>
          <p>{on12} so&apos;m/oyiga</p>
        </button>

        <div className="flex justify-between border-t-3 border-[rgba(0,0,0,0.2)] pt-[.5rem]">
          <p>Jami:</p>
          <p>{totalDiscountVal} so&apos;m</p>
        </div>
        <div className="h-[2.2rem] flex gap-[.5rem] justify-end">
          <button
            type="button"
            className="w-[20%] h-full rounded-[10px] border-none text-19px grid place-items-center select-none bg-[var(--first-color)] text-[white] relative"
            style={period !== 0 ? {} : { cursor: "not-allowed" }}
            onClick={() => period !== 0 && onSetNasiyaPeriod(period)}
          >
            <Check />
          </button>
          <button
            type="button"
            className="w-[20%] h-full rounded-[10px] border-none text-19px grid place-items-center select-none bg-[var(-second-color)] shadow-[0_0_5_rgb(211, 211, 211)] cursor-pointer"
            onClick={() => {
              onSetNasiyaPeriod(0);
            }}
          >
            <X />
          </button>
        </div>
      </div>
    </div>
  );
}
