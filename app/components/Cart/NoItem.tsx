import cat from "../../assets/cart.webp";

export default function NoItem() {
  return (
    <div className="w-full flex flex-col items-center justify-center">
      <img
        src={cat}
        alt=""
        className="w-[25rem] h-[15rem] object-cover my-[1rem]"
      />
      <h3 className="flex items-center gap-[.5rem]">
        Savat bo&apos;m bo&apos;shku
        <p className="text-[2.2rem]">🙀</p>
      </h3>
      <h3 className="flex items-center gap-[.5rem]">
        Bor bor biror narsa olib kel <p className="text-[2.2rem]">😽</p>
      </h3>
    </div>
  );
}
