import { Copyright } from "lucide-react";

export default function Footer() {
  return (
    <div className="bg-zinc-900 p-3 text-gray-300 text-sm flex flex-1 flex-col gap-2 justify-center items-end">
      <div className="flex flex-row gap-2 items-center justify-center">
        <Copyright strokeWidth={3} size={20} color="white" />
        {new Date().getFullYear()} - Statify
      </div>
      <div>
        We are not related to Spotify or any of it´s partners in any way
      </div>
    </div>
  );
}
