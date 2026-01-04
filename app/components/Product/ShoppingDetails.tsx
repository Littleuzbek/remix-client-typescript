import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "@remix-run/react";
import { CartItem, Product } from "~/utils";
import { PriceFormatter } from "../Extra/Extra";
import { cartAction } from "~/store/CartSlice";
import { RootState } from "~/root";
import { FaShoppingCart } from "react-icons/fa";
import AmountHandler from "./ShoppingDetails/AmountHandler";
import Options from "./ShoppingDetails/Options";
import { translateText } from "../Extra/Translation";

export default function ShoppingDetails({
  productDetails,
}: {
  productDetails: Product;
}) {
  const [quantity, setQuantity] = useState<number>(1);
  const [activeColor, setActiveColor] = useState<null | string>(null);
  const [activeSize, setActiveSize] = useState<null | string>(null);
  const cart = useSelector((state: RootState) => state.cart.cart) as CartItem[];
  const inCart =
    cart?.filter((product) => product.id === productDetails.id)?.length === 0;
  const quantityForMobile = cart?.filter(
    (product) => product?.id === productDetails?.id
  )[0]?.quantity;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const amountHandler = (action: string): void => {
    if (action === "-") {
      quantity === 1 ? "" : setQuantity((prevN) => prevN - 1);
    }

    if (action === "+") {
      setQuantity((prevN) => prevN + 1);
    }
  };

  const addToCart = (): void => {
    const addingItem = {
      discount: productDetails.discount || productDetails.price,
      id: productDetails.id,
      name: productDetails.name || productDetails.title,
      image: productDetails.image,
      price: productDetails.oldPrice || productDetails.price,
      rating: productDetails.rating || 0,
      specs: productDetails.specs,
      proType: productDetails.proType || productDetails.category,
      quantity: quantity,
      color: activeColor || null,
      size: activeSize || null,
    };

    dispatch(cartAction.addItem(addingItem));
    dispatch(cartAction.setNotificationItem(addingItem));
    dispatch(cartAction.setOnlyBuyItem(false));
  };

  const buyItem = () => {
    addToCart();

    setTimeout(() => {
      navigate("/cart");
    }, 100);
  };

  return (
    <div className="w-full middle:w-[40rem]">
      <div className="w-full">
        <p className="text-[1.5rem] my-[.5rem]">
          {productDetails?.name || productDetails?.title || "NO NAME PRODUCT"}
        </p>
        {/* <div className={classes.priceContainerMobile}>
                  <p>{translateText().price}:</p>
                  <div className={classes.price}>
                    <p>{PriceFormatter(productDetails?.price * quantity)} so'm</p>
                    <s>
                      {PriceFormatter(
                        productDetails?.discount || productDetails?.oldPrice
                      )}{" "}
                      so'm
                    </s>
                  </div>
                </div> */}
        <p className="w-full flex text-[1.1rem] mt-[.5rem] mb-[1rem]">
          {translateText()?.productSeller}: <q className="ml-[2rem] text-[.95rem]">EXKO shop</q>
        </p>
        <Options
          productDetails={productDetails}
          activeColor={activeColor}
          onSetActiveColor={setActiveColor}
          activeSize={activeSize}
          onSetActiveSize={setActiveSize}
        />
        <AmountHandler quantity={quantity} onAmountHandler={amountHandler} />
      </div>
      <div className="hidden middle:block w-full my-[.5rem]">
        {/* <p>{translateText().price}:</p> */}
        <p className="text-[1rem] font-[500]">{translateText()?.productPriceLabel
          }:</p>
        <div className="flex items-center gap-[1rem] my-[.5rem]">
          <p className="text-[1.5rem] font-[600]">
            {PriceFormatter(
              (productDetails?.discount || productDetails?.price) * quantity
            )}{" "}
            {translateText()?.orderPrice_currency}
          </p>
          <s>
            {PriceFormatter(
              (productDetails?.price || productDetails?.oldPrice || 0) *
                quantity
            )}{" "}
            {translateText()?.orderPrice_currency}
          </s>
        </div>
      </div>
      <p className="mt-[1rem] middle:mt-[2rem] px-[1rem] h-[2.5rem] rounded-[10px] bg-[var(--credit-background)] text-[.9rem] flex items-center gap-[.3rem] duration-300 cursor-pointer ">
        <span className="bg-[var(--credit-number-background)] rounded-[20px] py-[3px] px-[5px] mr-[10px]">
          {translateText()?.productMonthLabel}{" "}
          {PriceFormatter(
            (productDetails?.discount || productDetails?.price || 0) / 12
          )}{" "}
          {translateText()?.orderPrice_currency}
        </span>
        {translateText()?.productInstallmentPeriod}
      </p>
      <div className="hidden middle:flex w-full h-[3rem] items-center justify-evenly my-[1rem]">
        <button
          className="w-[45%] h-full text-[1.15rem] rounded-[10px] border-none bg-[var(--first-color)] cursor-pointer duration-300 text-[white] hover:bg-[var(--first-color-light)]"
          onClick={() => {
            addToCart();
          }}
        >
          {translateText()?.productAddButton}
        </button>
        <button
          className="w-[45%] h-full text-[1.15rem] rounded-[10px] border-2 border-[var(--first-color)] bg-[white] cursor-pointer duration-300 text-[var(--first-color)]"
          onClick={() => buyItem()}
        >
          {translateText()?.productGoToButton}
        </button>
      </div>
      <div
        className="w-full h-auto"
        style={productDetails?.specs ? {} : { display: "none" }}
      >
        {/* <p>{translateText().aboutPro}:</p> */}
        <p className="text-[1.3rem] mb-[.5rem]">{translateText()?.productDescription}:</p>
        <p className="text-[1rem]">{productDetails?.specs}</p>
      </div>

      <div className="middle:hidden w-full h-[4rem] bg-[white] fixed bottom-[0] left-[0] flex justify-between items-center px-[.5rem] z-2">
        <div>
          <p className="text-[1.2rem] font-[550]">
            {PriceFormatter(
              (productDetails?.discount || 0) * (quantityForMobile || 1)
            )}{" "}
            {translateText()?.orderPrice_currency}
          </p>
          {quantityForMobile && <p>{translateText()?.productAmount}: {quantityForMobile}</p>}
          {quantityForMobile !>= 1 || (
            <s>
              {PriceFormatter(productDetails?.price * (quantityForMobile || 1))}{" "}
              {translateText()?.orderPrice_currency}
            </s>
          )}
        </div>
        {inCart || (
          <button className="bg-[var(--first-color)] border-none py-[.7rem] px-[1rem] text-[white] rounded-[10px]" onClick={() => addToCart()}>
            + 1
          </button>
        )}
        {inCart && <button className="bg-[var(--first-color)] border-none py-[.7rem] px-[2rem] mr-[.5rem] text-[white] text-[1rem] rounded-[10px]" onClick={() => addToCart()}>{translateText()?.productMobileAddButton}</button>}
        {inCart || (
          <Link to={"/cart"} className="border-1 border-[var(--first-color)] py-[.6rem] px-[1rem] mr-[.5rem] text-[var(--first-color)] rounded-[10px] font-[550] no-underline flex items-center gap-[.5rem]">
            <FaShoppingCart />
            {translateText()?.productMobileGoToButton}
          </Link>
        )}
      </div>
    </div>
  );
}
