import Carousel from "~/components/Card/Carousel";
import { formatDate, getToken, PriceFormatter } from "~/components/Extra/Extra";
import { OrderProps } from "~/utils";
import NasiyaIndicators from "./NasiyaIndicators";
import { useFetcher } from "@remix-run/react";
import { useState } from "react";
import { FaArrowDown } from "react-icons/fa6";
import OrderItem from "./OrderItem";

export default function Order({ order }: { order: OrderProps }) {
  const productImages = order?.orderItems?.map((item) =>
    Array?.isArray(item?.image) ? item?.image[0] : item?.image
  ) as string[];
  const [showItem, setShowItem] = useState<boolean>(false);
  const fetcher = useFetcher();

  const active = "text-[rgb(255,166,0)]";
  const bad = "text-[red]";
  const good = "text-[var(--success-color)]";

  const handleCancel = async (e: React.FormEvent) => {
    e.preventDefault();
    const target = e.target as HTMLFormElement;
    const token = await getToken();
    const formData = new FormData(target);

    if (token) {
      formData.append("idToken", token);
    }
    formData.append("typ", JSON.stringify(order?.nasiya ? true : false));
    formData.append("ord", JSON.stringify(order));
    formData.append("orderType", "action");

    fetcher.submit(formData, {
      method: "post",
      encType: "multipart/form-data",
    });
  };

  return (
    <div className="border-3 border-[var(--first-color)] rounded-[10px] middle:bg-[var(--second-color)] middle:mx-[1rem] mb-[2rem]">
      <div className="middle:mx-[1rem] flex flex-col middle:grid grid-cols-[45%_50%] gap-[5%] px-[.5rem] pb-[1rem] middle:p-[1rem]">
        <Carousel productImg={productImages} />
        <div className="flex flex-col gap-[2rem] justify-center">
          <span
            className={`
             flex gap-[1rem] text-[18px] items-center
            ${order?.confirmed === null && active}
            ${order?.confirmed === false && bad}
            ${order?.orderCondition === true && good}
            ${order?.orderCondition === false && bad}
            ${
              order?.confirmed === null ||
              (order?.confirmed === true &&
                order?.orderCondition === null &&
                active)
            }
            `}
          >
            <p className="bg-[var(--first-color)] text-[white] py-[3px] px-[10px] rounded-[10px]">
              Holat:
            </p>
            {order?.confirmed === null && "Tasdiqlanmagan"}
            {order?.confirmed === false && "EXKO tomonidan rad etilgan"}
            {order?.orderCondition === true && "Xaridor qabul qilgan"}
            {order?.orderCondition === false && "Rad etilgan"}
            {order?.confirmed === null ||
              (order?.confirmed === true &&
                order?.orderCondition === null &&
                "Jarayonda")}
          </span>
          {order?.confirmed !== false && order?.orderCondition !== false && (
            <span
              className={`
              flex gap-[1rem] text-[18px] items-center
                ${
                  order?.orderCondition
                    ? good
                    : order?.orderCondition !== null
                    ? bad
                    : active
                }
              `}
            >
              <p className="bg-[var(--first-color)] text-[white] py-[3px] px-[10px] rounded-[10px]">
                Yetkazib berish sanasi:
              </p>{" "}
              {order?.orderCondition
                ? order?.orderDeliveryDate
                : order?.orderCondition !== null
                ? "Rad etilgan"
                : "Jarayonda"}
            </span>
          )}
          <span className="flex gap-[1rem] text-[18px] items-center">
            <p className="bg-[var(--first-color)] text-[white] py-[3px] px-[10px] rounded-[10px]">
              Yetkazib berish manzili:
            </p>{" "}
            {order?.orderAdress}
          </span>
          <span className="flex gap-[1rem] text-[18px] items-center">
            <p className="bg-[var(--first-color)] text-[white] py-[3px] px-[10px] rounded-[10px]">
              Buyurtma sanasi:
            </p>{" "}
            {formatDate(order?.orderDate)}
          </span>
          <span className="flex gap-[1rem] text-[18px] items-center">
            <p className="bg-[var(--first-color)] text-[white] py-[3px] px-[10px] rounded-[10px]">
              Buyurtma qiymati:
            </p>{" "}
            {PriceFormatter(order?.orderTotalPrice)} so&apos;m
          </span>

          <NasiyaIndicators order={order} />

          {/* Buyurtmani rad etish start */}

          {order?.confirmed === null && (
            <form
              className="w-[50%] flex justify-center items-center py-[1rem] bg-[var(--first-color)] text-[19px] text-[white] rounded-[10px] relative select-none overflow-hidden"
              onSubmit={handleCancel}
            >
              Buyurtmani bekor qilish
              <button
                type="submit"
                className="left-[0] top-[0] bottom-[0] right-[0] bg-transparent border-none cursor-pointer absolute"
              ></button>
            </form>
          )}

          {/* Buyurtmani rad etish end */}
        </div>
      </div>

      <div className="w-full p-[1rem] border-t-3 border-[var(--first-color)]">
        <button
          className="w-full flex justify-between cursor-pointer bg-transparent border-none text-[19px] text-[black]"
          onClick={() => setShowItem(!showItem)}
        >
          <p>Mahsulotlar soni: {order?.orderItems.length}</p>
          <FaArrowDown
            style={
              showItem
                ? { rotate: "180deg", cursor: "pointer", transition: ".3s" }
                : { cursor: "pointer", transition: ".3s" }
            }
          />
        </button>
        <div>
          {showItem && (
            <>
              {order?.orderItems?.map((item, i) => (
                <OrderItem orderItem={item} key={item?.id + i} />
              ))}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
