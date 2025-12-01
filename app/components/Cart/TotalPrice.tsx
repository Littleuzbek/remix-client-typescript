import { useEffect, useState } from "react";
import { PriceFormatter } from "../Extra/Extra";
import nasiyaImage from "../../assets/payam.png";
import NasiyaPeriod from "./NasiyaPeriod";
import CardPayment from "./Payment/CardPayment";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "~/firebase";
import { translateText } from "../Extra/Translation";

interface Props {
  totalPriceVal: number;
  totalDiscountVal: number;
  onOrder: (e: React.FormEvent<HTMLFormElement>) => void;
  onNonUserBuy: (e: React.FormEvent<HTMLFormElement>) => void
}

export default function TotalPrice({
  totalPriceVal,
  totalDiscountVal,
  onOrder,
  onNonUserBuy
}: Props) {
  const [cardPayment, setCardPayment] = useState<boolean>(false);
  const [nasiya, setNasiya] = useState<boolean>(false);
  const [nasiyaPeriod, setNasiyaPeriod] = useState<number>(0);
  const [isUser, setIsUser] = useState<boolean>(false);

  const nasiyaPeriodHandler = (period: number) => {
    setNasiyaPeriod(period);
    setNasiya(false);
  };

  const endPaymentHandler = (e: React.FormEvent<HTMLFormElement>) => {
    setCardPayment(false);
    onOrder(e);
  };

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        setIsUser(true);
      }
    });
  }, []);

  return (
    <form
      className="w-full middle:w-[29%] h-fit rounded-[10px] border-3 border-[rgba(0,0,0,0.2)] sticky top-[5px]"
      onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if(!isUser){
          onNonUserBuy(e)     
          return
        }

          return cardPayment ? endPaymentHandler(e) : setCardPayment(true);
      }}
    >
      <h5 className="text-[1.1rem] text-center mt-[.5rem] mt-[1rem]">
        {translateText()?.cartTotalLabel}
      </h5>
      <div className="flex h-fit justify-between m-[1rem]">
        <p className="text-[1.1rem]">{translateText()?.cartTotalLabel}:</p>
        <p className="text-[1.1rem]">
          {PriceFormatter(totalPriceVal)} {translateText()?.orderPrice_currency}
        </p>
      </div>

      <div className="flex h-fit justify-between m-[1rem]">
        <p className="text-[1.1rem]">{translateText()?.cartTotalSum}</p>
        <div>
          <p className="text-[1.7rem] text-end">
            {PriceFormatter(totalDiscountVal)} {translateText()?.orderPrice_currency}
          </p>
          <p className="text-[#00ad3a]">
            {translateText()?.cartTotalSaving}: {PriceFormatter(totalPriceVal - totalDiscountVal)}{" "}
            {translateText()?.orderPrice_currency}
          </p>
        </div>
      </div>

      {nasiyaPeriod ? (
        <div className="flex h-fit justify-between m-[1rem]">
          <p className="text-[1.1rem]">
            {translateText()?.cartNasiyaFirstPayment}
          </p>
          <div>
            <p className="text-[1.7rem]">
              {PriceFormatter(totalDiscountVal / nasiyaPeriod)} {translateText()?.orderPrice_currency}
            </p>
          </div>
        </div>
      ) : (
        ""
      )}

      <div className="w-[90%] m-[1rem] flex flex-col gap-[1rem]">
        {isUser ? (
          ""
        ) : (
          <>
            <input
              type="text"
              name="nonUserName"
              required
              placeholder={translateText()?.userNameLabel}
              className="p-[.5rem] text-[19px] rounded-[10px] border-3 border-[rgba(0,0,0,0.2)] outline-none"
            />
            <input
              type="text"
              name="nonUserNumber"
              required
              placeholder={translateText()?.userNumberLabel}
              className="p-[.5rem] text-[19px] rounded-[10px] border-3 border-[rgba(0,0,0,0.2)] outline-none"
            />
          </>
        )}

        <input
          type="text"
          name="location"
          required
          placeholder={translateText()?.cartTotalAddress}
          className="p-[.5rem] text-[19px] rounded-[10px] border-3 border-[rgba(0,0,0,0.2)] outline-none"
        />
        <input type="hidden" name="nasiyaPeriod" value={nasiyaPeriod} />
      </div>

      <div className="w-[90%] m-[1rem] rounded-[10px] border-none bg-[var(--first-color)] cursor-pointer">
        <button
          type="submit"
          className="w-full p-[10px] text-[1.2rem] text-[white] bg-transparent border-none cursor-pointer"
        >
          {translateText()?.cartTotalOrderBtn}
        </button>
      </div>

      <div className="w-[90%] m-[1rem] flex flex-col gap-[1rem]">
        {!isUser ? (
          <p className="text-center">
            {translateText()?.cartTotalNotNasiya}
          </p>
        ) : (
          <button
            type="button"
            className="w-full h-[2.7rem] px-[10px] rounded-[10px] bg-transparent border-3 border-[rgba(0,0,0,0.2)] flex items-center gap-[1rem] text-[19px] cursor-pointer select-none"
            style={
              nasiyaPeriod
                ? { border: "3px solid #00ad3a", color: "#00ad3a" }
                : {}
            }
            onClick={() => setNasiya(true)}
          >
            <img src={nasiyaImage} alt="" className="h-[90%]" />
            {nasiyaPeriod
              ? `${nasiyaPeriod} oy x ${PriceFormatter(
                  totalDiscountVal / nasiyaPeriod
                )} ${translateText()?.orderPrice_currency}`
              : translateText()?.cartTotalNasiyaBtn}
          </button>
        )}
      </div>

      {nasiya && (
        <NasiyaPeriod
          totalDiscountVal={PriceFormatter(totalDiscountVal)}
          on3={PriceFormatter(Math.round(totalDiscountVal / 3))}
          on6={PriceFormatter(Math.round(totalDiscountVal / 6))}
          on12={PriceFormatter(Math.round(totalDiscountVal / 12))}
          selectedPeriodVal={nasiyaPeriod}
          onSetNasiyaPeriod={nasiyaPeriodHandler}
        />
      )}

      {cardPayment && (
        <CardPayment
          totalDiscountVal={PriceFormatter(totalDiscountVal)}
          onCardPayment={() => setCardPayment(false)}
        />
      )}
    </form>
  );
}
