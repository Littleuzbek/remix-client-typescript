import { Check, X } from "lucide-react";
import {
  HumoCartIcon,
  MasterCartIcon,
  UzCardIcon,
  VisaCartIcon,
} from "./PaymentSVG";
import { useState } from "react";
import CardPaymentType from "./CardPaymentType";
import { translateText } from "~/components/Extra/Translation";

interface paymentProps {
  totalDiscountVal: string;
  onCardPayment: () => void;
}

export default function CardPayment({
  totalDiscountVal,
  onCardPayment,
}: paymentProps) {
  const [paymentMethod, setPaymentMethod] = useState<boolean>(true);
  return (
    <div className="w-full h-full bg-[rgba(0,0,0,0.3)] fixed top-[0] left-[0] z-1000 flex items-center justify-center">
      <div className="w-[95%] middle:w-auto bg-[white] rounded-[10px] py-[1rem] px-[1.5rem] flex flex-col gap-[1rem] text-[1.5rem]">
        <h3>{translateText()?.cartPaymentTitle}</h3>
        <div className="flex flex-col gap-[1rem]">
          <div className="w-full border-none grid grid-cols-2 middle:grid-cols-[12rem_12rem] items-center gap-[1rem] cursor-default select-none">
            <button
              type="button"
              onClick={() => setPaymentMethod(true)}
              className="flex justify-around border-3 border-[rgba(0,0,0,.2)] rounded-[10px] bg-transparent"
            >
              <UzCardIcon />
              <HumoCartIcon />
            </button>
            <button
              type="button"
              onClick={() => setPaymentMethod(false)}
              className="flex justify-around border-3 border-[rgba(0,0,0,.2)] rounded-[10px] bg-transparent"
            >
              <VisaCartIcon />
              <MasterCartIcon />
            </button>
          </div>
        </div>
        <CardPaymentType
          totalDiscountVal={totalDiscountVal}
          paymentMethodVal={paymentMethod}
        />

        <div className="h-[2.2rem] flex gap-[.5rem] justify-end">
          <button
            type="submit"
            className="w-[20%] h-full rounded-[10px] border-none text-19px grid place-items-center select-none bg-[var(--first-color)] text-[white] relative cursor-pointer"
          >
            <Check />
          </button>
          <button
            type="button"
            className="w-[20%] h-full rounded-[10px] border-none text-19px grid place-items-center select-none bg-[var(-second-color)] shadow-[0_0_5_rgb(211, 211, 211)] cursor-pointer"
            onClick={() => {
              onCardPayment();
            }}
          >
            <X />
          </button>
        </div>
      </div>
    </div>
  );
}
