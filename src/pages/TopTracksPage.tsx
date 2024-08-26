import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Login from "@/components/Login";
import { TopTracks } from "@/components/TopTracks";
import { authenticateSpotify } from "@/utils/authenticateSpotify";

import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useLocalStorage } from "usehooks-ts";

function TopTracksPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [tokenLocalStorageValue, setTokenLocalStorageValue] = useLocalStorage<
    { access_token: string; refresh_token: string } | undefined
  >("spAuth", undefined);

  useEffect(() => {
    if (searchParams.has("code")) {
      getToken();
    }

    async function getToken() {
      const token = await authenticateSpotify(searchParams.get("code")!);

      setTokenLocalStorageValue(token);
      navigate("/");
    }
  }, [
    searchParams,
    navigate,
    setTokenLocalStorageValue,
    tokenLocalStorageValue,
  ]);

  return (
    <>
      <Header />
      <main className="flex items-center justify-start min-h-screen flex-col relative px-8 py-4">
        {tokenLocalStorageValue ? (
          <TopTracks
            spotifyToken={tokenLocalStorageValue.access_token}
            spotifyRefreshToken={tokenLocalStorageValue.refresh_token}
          />
        ) : (
          <Login />
        )}
      </main>
      <Footer />
    </>
  );
}

export default TopTracksPage;
