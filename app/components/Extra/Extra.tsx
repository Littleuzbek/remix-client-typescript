import { onAuthStateChanged } from "firebase/auth";
import { auth } from "~/firebase";
import { manualTimestamp, Product } from "~/utils";

export const isString = (value: unknown) => typeof value === "string";

export const PriceFormatter = (price: number | undefined): string => {
  if (price) {
    const formattedPrice = price
      ?.toLocaleString("en-US", { minimumFractionDigits: 2 })
      .split(".")[0]
      .replaceAll(",", " ");

    return formattedPrice;
  } else {
    return "";
  }
};

export function getRandomNumbersWithoutRepeating(max: number) {
  // Step 1: Create an array of numbers from 1 to max
  const numbers = Array.from({ length: max }, (_, i) => i + 1);

  // Step 2: Shuffle the array using Fisher-Yates algorithm
  for (let i = numbers.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [numbers[i], numbers[j]] = [numbers[j], numbers[i]]; // Swap elements
  }
  return numbers;
}

export const ProductShuffler = async (
  products: Product[],
  product?: undefined | Product
): Promise<Product[]> => {
  if (product) {
    const filteredProducts = products?.filter((item) =>
      item.id !== product.id
        ? (item.proType || item.category) ===
          (product.category || product.proType)
        : false
    );
    const randomNumber = getRandomNumbersWithoutRepeating(
      filteredProducts?.length
    );
    const shuffeledProducts = randomNumber?.map(
      (index) => filteredProducts?.[index - 1]
    );

    return shuffeledProducts;
  } else {
    const randomNumber = getRandomNumbersWithoutRepeating(products?.length);
    const shuffeledProducts = randomNumber?.map((index) => products?.[index]);

    return shuffeledProducts;
  }
};

export type timeFormat = {
  seconds?: number;
  _seconds?: number;
  nanoseconds?: number;
  _nanoseconds?: number;
};

export function formatTimestampToDate(timeObj: null | timeFormat): string | null {
  if (!timeObj) return null;
  const seconds = timeObj?.seconds || timeObj?._seconds || 0;
  const nanoSeconds = timeObj?.nanoseconds || timeObj?._nanoseconds || 0;
  const milliseconds = seconds * 1000 + Math.floor(nanoSeconds / 1_000_000);

  const date = new Date(milliseconds);

  const options: Intl.DateTimeFormatOptions = { year: "numeric", month: "long", day: "numeric" };
  return date.toLocaleDateString("en-US", options);
}

export const formatDate = (unformatted: manualTimestamp | undefined, day?: undefined | boolean): string | null => {
  if(!unformatted) return null;
  const formattedDate = new Date(
    (unformatted.seconds || unformatted._seconds || 0) * 1000
  );
  const date =
    formattedDate.getDate() +
    "-" +
    formattedDate.toLocaleString("en-US", { month: "short" });

  const time = formattedDate?.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });

  return day ? `${date}` : `${date}  ${time}`;
};

export const getToken = (): Promise<string | null> => {
  return new Promise((resolve)=>{
    onAuthStateChanged(auth, async (user) => {
      if(user){
        const token = await user.getIdToken();
        resolve(token)
      }else{
        resolve(null)
      }
    })
  })
}

export const autoPicture = async () => {
  const randomNumber = Math.floor(Math.random() * 8) + 1;

  const images = [
    { image: () => import("../../assets/avatar/avatar1.png") },
    { image: () => import("../../assets/avatar/avatar2.png") },
    { image: () => import("../../assets/avatar/avatar3.png") },
    { image: () => import("../../assets/avatar/avatar4.png") },
    { image: () => import("../../assets/avatar/avatar5.png") },
    { image: () => import("../../assets/avatar/avatar6.png") },
    { image: () => import("../../assets/avatar/avatar7.png") },
    { image: () => import("../../assets/avatar/avatar8.png") },
  ];

  const image = await images?.[randomNumber].image().then(promise => promise.default); 
  return image;
};