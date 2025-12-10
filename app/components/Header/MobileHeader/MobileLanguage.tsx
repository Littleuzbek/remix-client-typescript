import { X } from "lucide-react";

import uzFlag from "../../../assets/lgUZ.webp";
import ruFlag from "../../../assets/lgRU.png";
import krFlag from "../../../assets/lgKR.jpg";
import { editLanguage, translateText } from "~/components/Extra/Translation";

type langArray = {
  pic: string | undefined;
  text: string;
};

export default function MobileLanguage({
  onCurrLang,
  onSetDrop,
  currLangVal,
}: {
  currLangVal: langArray | null;
  onCurrLang: (e: langArray | null) => void;
  onSetDrop: () => void;
}) {
  const langArr = [
    {
      pic: uzFlag,
      text: "UZ",
    },
    {
      pic: krFlag,
      text: "KR",
    },
    {
      pic: ruFlag,
      text: "RU",
    },
  ];

  const LanguageHandler = (lang: langArray) => {
    editLanguage(lang.text);
    onCurrLang(lang);
    onSetDrop()
  };

  return (
    <div className="flex flex-col justify-center items-center fixed z-4 inset-0  bg-white">
      <button
        className="flex gap-[.5rem] p-[1rem] items-center hover:bg-[var(--first-color)] hover:p-[5px] hover:text-[white] duration-300 rounded-[5px] border-none bg-transparent"
        key="close"
        onClick={() => onSetDrop()}
      >
        <X />
        <h2>{translateText()?.userControlLangClose}</h2>
      </button>
      {langArr
        .filter((l) => l.text !== currLangVal?.text)
        .map((lang) => (
          <button
            className="flex gap-[.5rem] p-[1rem] items-center hover:bg-[var(--first-color)] hover:p-[5px] hover:text-[white] duration-300 rounded-[5px] border-none bg-transparent"
            key={lang.text}
            onClick={() => LanguageHandler(lang)}
          >
            <img
              src={lang.pic}
              className="w-[60px] h-[60px] object-cover"
              alt=""
            />
            <h2>{lang.text}</h2>
          </button>
        ))}
    </div>
  );
}
