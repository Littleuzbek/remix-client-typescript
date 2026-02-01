import { translateText } from "~/components/Extra/Translation";

export default function CardPaymentType({
  totalDiscountVal,
  paymentMethodVal,
}: {totalDiscountVal?: string,
  paymentMethodVal?: boolean,
}) {
  const CardNumberFormatter = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    e.target.value = value.startsWith(" ") ? value.trimStart() : value;

    const numericValue = value.replace(/[^0-9]/g, "");
    e.target.value = numericValue.startsWith(" ")
      ? numericValue.trimStart()
      : numericValue;

    const formattedValue =
      numericValue
        .match(/.{1,4}/g) // Group digits into chunks of 4
        ?.join(" ") || ""; // Join with spaces
    e.target.value = formattedValue; // Update the input value
    
    // Custom validation for 16 digits (19 chars with spaces)
    if (numericValue.length < 16) {
      e.target.setCustomValidity("Karta raqami 16 raqamdan iborat bo'lishi kerak");
    } else {
      e.target.setCustomValidity("");
    }
  };

  const inputStyle =
    "w-full h-[2.5rem] text-[19px] p-[.5rem] rounded-[10px] border-3 border-[rgba(0,0,0,.2)] outline-none";
  return (
    <>
      <input
        className={inputStyle}
        type="text"
        inputMode="numeric"
        name="paymentAmount"
        value={totalDiscountVal}
        readOnly={true}
      />

      <input
        className={inputStyle}
        type="text"
        inputMode="numeric"
        maxLength={19}
        minLength={19}
        placeholder={translateText()?.cartPaymentCartNumber}
        name="cardNumber"
        required
        onChange={CardNumberFormatter}
      />

      {paymentMethodVal && (
        <input
          className={inputStyle}
          type="text"
          inputMode="numeric"
          maxLength={5}
          minLength={5}
          name="cardExp"
          placeholder={translateText()?.cartPaymentCartPeriod}
          required
          onChange={(e) => {
            const value = e.target.value;
            e.target.value = value.startsWith(" ") ? value.trimStart() : value;

            const numericValue = value.replace(/[^0-9]/g, "");
            e.target.value = numericValue.startsWith(" ")
              ? numericValue.trimStart()
              : numericValue;

            const month = numericValue.slice(0, 2);
            if (month && parseInt(month) > 12) {
              e.target.value = "";
              return;
            }

            const year = numericValue.slice(2, 6);
            if (year && year.length === 4 && parseInt(year) < 1900) {
              e.target.value = "";
              return;
            }

            const formattedValue =
              numericValue.slice(0, 2) +
              (numericValue.length > 2 ? "/" + numericValue.slice(2, 4) : "");
            e.target.value = formattedValue;
          }}
        />
      )}

      {paymentMethodVal || (
        <div className="grid grid grid-cols-2 middle:grid-cols-[12rem_12rem] gap-[1rem]">
          <input
            className={inputStyle}
            type="text"
            inputMode="numeric"
            maxLength={3}
            minLength={3}
            name="cardCvv"
            placeholder="CVV"
            required
            onChange={(e) => {
              const value = e.target.value;
              e.target.value = value.startsWith(" ")
                ? value.trimStart()
                : value;

              const numericValue = value.replace(/[^0-9]/g, "");
              e.target.value = numericValue.startsWith(" ")
                ? numericValue.trimStart()
                : numericValue;
            }}
          />

          <input
            className={inputStyle}
            type="text"
            inputMode="numeric"
            name="cardExp"
            placeholder="mm/yyyy"
            maxLength={7}
            minLength={7}
            autoComplete="off"
            required
            onChange={(e) => {
              const value = e.target.value;
              e.target.value = value.startsWith(" ")
                ? value.trimStart()
                : value;

              const numericValue = value.replace(/[^0-9]/g, "");
              e.target.value = numericValue.startsWith(" ")
                ? numericValue.trimStart()
                : numericValue;

              const month = numericValue.slice(0, 2);
              if (month && parseInt(month) > 12) {
                e.target.value = "";
                return;
              }

              const year = numericValue.slice(2, 6);
              if (year && year.length === 4 && parseInt(year) < 1900) {
                e.target.value = "";
                return;
              }

              const formattedValue =
                numericValue.slice(0, 2) +
                (numericValue.length > 2 ? "/" + numericValue.slice(2, 6) : "");
              e.target.value = formattedValue;
            }}
          />
        </div>
      )}
    </>
  );
}
