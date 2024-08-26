import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Login from "@/components/Login";
import { TopArtists } from "@/components/TopArtists";
import { useLocalStorage } from "usehooks-ts";

function TopArtistsPage() {
  const [tokenLocalStorageValue] = useLocalStorage<
    { access_token: string; refresh_token: string } | undefined
  >("spAuth", undefined);

  return (
    <>
      <Header />
      <main className="flex items-center justify-start min-h-screen flex-col relative px-8 py-4">
        {tokenLocalStorageValue ? (
          <TopArtists
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

export default TopArtistsPage;
