import { OrderProps } from "~/utils";
import Order from "./Order";
import { useState } from "react";

export default function OrderHistory({
  orderData,
}: {
  orderData: OrderProps[] | false;
}) {
  const [category, setCategory] = useState(true);

  return (
    <div className="h-fit pb-[1rem] overflow-hidden border-0 middle:border-3 border-[var(--first-color)] rounded-[20px]">
      <div className="mb-[1rem] grid grid-cols-2">
        <button
          className={`text-center py-[1rem]  border-0 border-b-3 border-[var(--first-color)] cursor-pointer rounded-br-[10px] text-[18px] bg-transparent text-[black] ${
            category ? "!bg-[var(--first-color)] !text-[white]" : ""
          }`}
          onClick={() => setCategory(true)}
        >
          Faol
        </button>
        <button
          className={`text-center py-[1rem] border-0 border-b-3 border-[var(--first-color)] border-x-none cursor-pointer rounded-bl-[10px] text-[18px] bg-transparent text-[black] ${
            category ? "" : "!bg-[var(--first-color)] !text-[white]"
          }`}
          onClick={() => setCategory(false)}
        >
          Barchasi
        </button>
      </div>

      {orderData ? (
        orderData
          ?.sort(
            (a, b) =>
              (b?.orderDate?.seconds || b?.orderDate?._seconds || 0) -
              (a?.orderDate?.seconds || a?.orderDate?._seconds || 0)
          )
          ?.map((item, index) =>
            category ? (
              // if order installments has been not paid all
              item?.nasiyaCondition !== true &&
              // if order wasn't cancelled
              item?.nasiyaCondition !== false &&
              item?.orderCondition !== false &&
              item?.confirmed !== false && (
                <Order order={item} key={item?.orderId + index + "tuya"} />
              )
            ) : (
              <Order order={item} key={item?.orderId + index + "tuya"} />
            )
          )
      ) : (
        <p style={{ textAlign: "center" }}>
          {orderData ? "No orders yet" : "Loading..."}
        </p>
      )}
    </div>
  );
}
