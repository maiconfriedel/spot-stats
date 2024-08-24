import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Login from "@/components/Login";
import { Stats } from "@/components/Stats";
import { authenticateSpotify } from "@/utils/authenticateSpotify";
import { generateRandomString } from "@/utils/generateRandomString";
import querystring from "query-string";
import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useLocalStorage } from "usehooks-ts";

function App() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [tokenLocalStorageValue, setTokenLocalStorageValue] = useLocalStorage<
    object | undefined
  >("spAuth", undefined);

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

  async function getToken() {
    const token = await authenticateSpotify(searchParams.get("code")!);

    setTokenLocalStorageValue(token);
    navigate("/");
  }

  useEffect(() => {
    if (searchParams.has("code")) getToken();
  }, []);

  return (
    <>
      <Header />
      <main className="flex items-center justify-start min-h-screen flex-col relative px-8 py-4">
        {tokenLocalStorageValue ? (
          <Stats />
        ) : (
          <Login handleLogin={handleLogin} />
        )}
      </main>
      <Footer />
    </>
  );
}

export default App;
