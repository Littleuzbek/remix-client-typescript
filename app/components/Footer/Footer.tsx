import { Link } from "@remix-run/react";
import { translateText } from "../Extra/Translation";

export default function Footer() {
  const redirectHandler = (link: string) => {
    window.open(link, "_blank");
  };
  return (
    <div className="footer w-full h-[17rem] middle:h-[15rem] grid place-items-center bg-[#f0f2f5] ">
      <div className="mb-[3rem] middle:mb-[0]">
        <Link
          to={"/"}
          className='flex w-full text-[2rem] font-["Playfair_Display",serif] [font-optical-sizing:auto] not-italic font-semibold text-[var(--first-color)] select-none cursor-pointer font-[600] no-underline justify-center'
        >
          EXKO
        </Link>
        <div className="flex justify-center gap-[2rem] my-[1rem]">
          <button
          
            className="footer-icon group flex flex-col gap-[5px] justify-center items-center text-[1rem] text-[var(--first-color)]  bg-[transparent] cursor-pointer border-none hover:bg-[linear-gradient(45deg,#f09433_0%,#e6683c_25%,#dc2743_50%,#cc2366_75%,#bc1888_100%)] hover:bg-clip-text hover:text-[transparent]  hover:transition-colors duration-500"
            onClick={() =>
              redirectHandler(
                "https://www.instagram.com/koreakosmetika_uzb?igsh=MTVjbnU3a3hsczVsdA=="
              )
            }
          >
            <a
              onClick={(e: React.MouseEvent<HTMLAnchorElement>) => {
                e.stopPropagation();
                e.preventDefault();
              }}
              href="https://www.instagram.com/koreakosmetika_uzb?igsh=MTVjbnU3a3hsczVsdA=="
              rel="noreferrer"
              target="_blank"
              className="instagram-icon"
              aria-label="Instagram"
            >
              <i className="fab fa-instagram  text-[var(--first-color)] text-[2.2rem] group-hover:bg-[linear-gradient(45deg,#f09433_0%,#e6683c_25%,#dc2743_50%,#cc2366_75%,#bc1888_100%)] group-hover:bg-clip-text group-hover:text-[transparent]  group-hover:transition-colors duration-500"></i>
            </a>
            INSTAGRAM
          </button>
          <button
            className="footer-icon group hover:text-[#0088cc] flex flex-col gap-[5px] justify-center items-center text-[1rem] text-[var(--first-color)] cursor-pointer border-none bg-[transparent] duration-500"
            onClick={() => redirectHandler("https://t.me/Korea_cosmetics_exko")}
          >
            <a
              onClick={(e: React.MouseEvent<HTMLAnchorElement>) => {
                e.stopPropagation();
                e.preventDefault();
              }}
              href="https://t.me/Korea_cosmetics_exko"
              target="_blank"
              rel="noreferrer"
              className="telegram-icon"
              aria-label="Telegram"
            >
              <i className="fab fa-telegram-plane group-hover:text-[#0088cc] text-[var(--first-color)] text-[2.2rem] duration-500"></i>
            </a>
            TELEGRAM
          </button>
        </div>
        <p className="my-[.5rem] text-center">
          {translateText()?.footerPartnership}  👉{" "}
          <button
            className="border-none bg-[transparent] text-[18px] cursor-pointer"
            onClick={() => redirectHandler("https://t.me/MarufRasul")}
          >
            @MarufRasul
          </button>{" "}
        </p>
        <p className="my-[.5rem] text-center">
          {translateText()?.footerRightsMessage}
        </p>
      </div>
    </div>
  );
}
