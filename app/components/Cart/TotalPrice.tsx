import { useState } from "react";
import { PriceFormatter } from "../Extra/Extra";
import nasiyaImage from "../../assets/payam.png";
import NasiyaPeriod from "./NasiyaPeriod";
import CardPayment from "./Payment/CardPayment";

interface Props {
  totalPriceVal: number;
  totalDiscountVal: number;
  onOrder: (e: React.FormEvent<HTMLFormElement>) => void;
}

export default function TotalPrice({
  totalPriceVal,
  totalDiscountVal,
  onOrder,
}: Props) {
  const [cardPayment, setCardPayment] = useState<boolean>(false);
  const [nasiya, setNasiya] = useState<boolean>(false);
  const [nasiyaPeriod, setNasiyaPeriod] = useState<number>(0);
  // const user = useSelector((state) => state.cart.user);

  const nasiyaPeriodHandler = (period: number) => {
    setNasiyaPeriod(period);
    setNasiya(false);
  };

  const endPaymentHandler = (e: React.FormEvent<HTMLFormElement>) => {
    setCardPayment(false);
    onOrder(e);
  };

  return (
    <form
      className="w-full middle:w-[29%] h-fit rounded-[10px] border-3 border-[rgba(0,0,0,0.2)] sticky top-[5px]"
      onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        return cardPayment ? endPaymentHandler(e) : setCardPayment(true);
      }}
    >
      <h5 className="text-[1.1rem] text-center mt-[.5rem] mt-[1rem]">
        Buyurtmangiz
      </h5>
      <div className="flex h-fit justify-between m-[1rem]">
        <p className="text-[1.1rem]">Mahsulotlaringiz:</p>
        <p className="text-[1.1rem]">
          {PriceFormatter(totalPriceVal)} so&apos;m
        </p>
      </div>

      <div className="flex h-fit justify-between m-[1rem]">
        <p className="text-[1.1rem]">Jami</p>
        <div>
          <p className="text-[1.7rem] text-end">
            {PriceFormatter(totalDiscountVal)} so&apos;m
          </p>
          <p className="text-[#00ad3a]">
            Tejovingiz: {PriceFormatter(totalPriceVal - totalDiscountVal)}{" "}
            so&apos;m
          </p>
        </div>
      </div>

      {nasiyaPeriod ? (
        <div className="flex h-fit justify-between m-[1rem]">
          <p className="text-[1.1rem]">
            Muddatli to&apos;lov (birinchi to&apos;lov):
          </p>
          <div>
            <p className="text-[1.7rem]">
              {PriceFormatter(totalDiscountVal / nasiyaPeriod)} so&apos;m
            </p>
          </div>
        </div>
      ) : (
        ""
      )}

      <div className="w-[90%] m-[1rem] flex flex-col gap-[1rem]">
        <input
          type="text"
          name="location"
          required
          placeholder="Manzilingiz"
          className="p-[.5rem] text-[19px] rounded-[10px] border-3 border-[rgba(0,0,0,0.2)] outline-none"
        />
        <input type="hidden" name="nasiyaPeriod" value={nasiyaPeriod} />
      </div>

      <div className="w-[90%] m-[1rem] rounded-[10px] border-none bg-[var(--first-color)] cursor-pointer">
        <button
          type="submit"
          className="w-full p-[10px] text-[1.2rem] text-[white] bg-transparent border-none cursor-pointer"
        >
          Buyurtma berish
        </button>
      </div>

      <div className="w-[90%] m-[1rem] flex flex-col gap-[1rem]">
        {/* <p className="text-center">Sizga nasiya xizmatidan foydalanish cheklangan!</p> */}
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
              )} so'm`
            : "Muddatli to'lov bilan olish"}
        </button>
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
