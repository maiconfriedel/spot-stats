import { AudioLines } from "lucide-react";

export default function Header() {
  return (
    <div className="bg-black p-3 text-white sticky top-0 z-50 font-bold text-xl flex flex-1 flex-row gap-2 justify-start items-center">
      <AudioLines strokeWidth={3} size={30} color="white" className="ml-1" />
      Spot Stats
    </div>
  );
}
