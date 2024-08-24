import { AudioLines } from "lucide-react";

interface LoginProps {
  handleLogin: () => void;
}

export default function Login({ handleLogin }: LoginProps) {
  return (
    <>
      <div className="flex flex-row items-center justify-center gap-2">
        <AudioLines strokeWidth={3} size={60} className="mt-2 text-primary" />
        <h1 className="font-bold text-6xl text-green-600">Spot Stats</h1>
      </div>
      <span className="font-semibold text-md text-primary mt-2">
        Get your statistics from Spotify
      </span>

      <button
        className="bg-green-600 text-primary rounded-md py-2 px-4 font-bold mt-4 hover:bg-green-800"
        onClick={handleLogin}
      >
        Login with Spotify
      </button>
    </>
  );
}
