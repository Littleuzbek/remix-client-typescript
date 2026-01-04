import { Product } from "~/utils";
import Collection from "../Home/Collection";
import { translateText } from "../Extra/Translation";

interface RelatedProps {
  relatedProducts: Product[] | null;
}

export default function RelatedProducts({ relatedProducts }: RelatedProps) {
  return (
    <div className="w-[90%] mx-auto">
      <Collection
        all={relatedProducts || []}
        section={translateText()?.productRelatedTitle}
      />
    </div>
  );
}
