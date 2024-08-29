import { AudioLines } from "lucide-react";
import querystring from "query-string";

import { generateRandomString } from "@/utils/generateRandomString";

export default function Login() {
  function handleLogin() {
    const state = generateRandomString(16);
    const scope = "user-top-read user-read-recently-played user-read-private";

    window.location.href =
      "https://accounts.spotify.com/authorize?" +
      querystring.stringify({
        response_type: "code",
        client_id: import.meta.env.VITE_SPOTIFY_CLIENT_ID,
        scope: scope,
        redirect_uri: import.meta.env.VITE_CALLBACK_URL,
        state: state,
      });
  }

  return (
    <>
      <div className="flex flex-row items-center justify-center gap-2">
        <AudioLines strokeWidth={3} size={60} className="mt-2 text-primary" />
        <h1 className="font-bold text-6xl text-green-600">Statify</h1>
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
