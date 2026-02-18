import { useState } from "react";
import PaymentPeriod from "./PaymentPeriod";
import { FaArrowDown } from "react-icons/fa6";
import { nasiyaItems, OrderProps } from "~/utils";
import { translateText } from "~/components/Extra/Translation";

export default function NasiyaIndicators({ order }: {order: OrderProps}) {
  const [showNasiya, setShowNasiya] = useState<boolean>(false);
  const nasiya = order.nasiya as nasiyaItems;

  const active = "text-[rgb(255,166,0)]";
  const bad = "text-[red]";
  const good = "text-[var(--success-color)]";
  return (
    <>
      {order?.nasiya && (
        <span
          className={`
            flex gap-[1rem] text-[18px] items-center
            ${order?.nasiyaCondition
              ? good
              : order?.nasiyaCondition !== null
              ? bad
              : active}
          `}
        >
          <p className="bg-[var(--first-color)] text-[white] py-[3px] px-[10px] rounded-[10px]">{translateText()?.orderNasiyaLabel}:</p>{" "}
          {order?.nasiyaCondition
            ? translateText()?.orderCondition_paid
            : order?.nasiyaCondition !== null
            ? translateText()?.orderCondition_canceled
            : translateText()?.orderShowNasiyaBtn}{" "}
          <FaArrowDown
          className=""
            onClick={() => {
              order?.nasiyaCondition === false || setShowNasiya(!showNasiya);
            }}
            style={
              showNasiya
                ? {
                    rotate: "180deg",
                    cursor: "pointer",
                    transition: ".3s",
                  }
                : { cursor: "pointer", transition: ".3s" }
            }
          />
        </span>
      )}

      {showNasiya && (
        <span className="flex items-center justify-center gap-[1rem] py-[1rem] border-b-3 border-[rgba(0,0,0,0.2)]">
          <PaymentPeriod
            nasiya={{
              payment1: nasiya.payment1,
              payment2: nasiya.payment2,
              payment3: nasiya.payment3,
            }}
          />
        </span>
      )}
      {showNasiya && order?.nasiya?.payment4 && (
        <span className="flex items-center justify-center gap-[1rem] py-[1rem] border-b-3 border-[rgba(0,0,0,0.2)]">
          <PaymentPeriod
            nasiya={{
              payment1: nasiya.payment4,
              payment2: nasiya.payment5,
              payment3: nasiya.payment6,
            }}
          />
        </span>
      )}
      {showNasiya && order?.nasiya?.payment7 && (
        <span className="flex items-center justify-center gap-[1rem] py-[1rem] border-b-3 border-[rgba(0,0,0,0.2)]">
          <PaymentPeriod
            nasiya={{
              payment1: nasiya.payment7,
              payment2: nasiya.payment8,
              payment3: nasiya.payment9,
            }}
          />
        </span>
      )}
      {showNasiya && order?.nasiya?.payment7 && (
        <span className="flex items-center justify-center gap-[1rem] py-[1rem]">
          <PaymentPeriod
            nasiya={{
              payment1: nasiya.payment10,
              payment2: nasiya.payment11,
              payment3: nasiya.payment12,
            }}
          />
        </span>
      )}
    </>
  );
}
