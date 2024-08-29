import { useLocalStorage } from "usehooks-ts";

import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Login from "@/components/Login";
import RecentTracks from "@/components/RecentTracks";

export default function RecentTrackesPage() {
  const [tokenLocalStorageValue] = useLocalStorage<
    { access_token: string; refresh_token: string } | undefined
  >("spAuth", undefined);

  return (
    <>
      <Header />
      {tokenLocalStorageValue ? (
        <RecentTracks
          spotifyToken={tokenLocalStorageValue.access_token}
          spotifyRefreshToken={tokenLocalStorageValue.refresh_token}
        />
      ) : (
        <Login />
      )}
      <Footer />
    </>
  );
}
