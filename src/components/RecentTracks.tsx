import { AxiosError } from "axios";
import { useEffect, useMemo, useState } from "react";
import { useLocalStorage } from "usehooks-ts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import LoadingSkeleton from "./LoadingSkeleton";
import RecentTrackList from "./RecentTrackList";

import { refreshTokenSpotify } from "@/utils/authenticateSpotify";
import { getRecentSongs, Item } from "@/utils/getRecentSongs";

interface RecentTracksProps {
  spotifyToken: string;
  spotifyRefreshToken: string;
}

export default function RecentTracks({
  spotifyToken,
  spotifyRefreshToken,
}: RecentTracksProps) {
  const [recent, setRecent] = useState<Item[]>([]);
  const [, setTokenLocalStorage] = useLocalStorage<
    { access_token: string; refresh_token: string } | undefined
  >("spAuth", undefined);
  const { toast } = useToast();

  const getRecent = useMemo(
    () => async () => {
      if (spotifyToken) {
        try {
          const response = await getRecentSongs(spotifyToken);

          if (response) {
            setRecent(response);
          }
        } catch (ex: unknown) {
          if (ex instanceof AxiosError && ex.response?.status === 401) {
            const token = await refreshTokenSpotify(spotifyRefreshToken);

            setTokenLocalStorage({
              refresh_token: spotifyRefreshToken,
              access_token: token.access_token,
            });
          } else {
            toast({
              title: "Error",
              description:
                "An error occurred while fetching data from Spotify.",
              variant: "destructive",
            });
          }
        }
      }
    },
    [spotifyToken, setTokenLocalStorage, spotifyRefreshToken, toast]
  );

  useEffect(() => {
    getRecent();
  }, [getRecent]);

  return (
    <main className="flex w-full flex-col items-center justify-start py-4 px-8">
      <Card className="flex w-full flex-col items-start justify-start my-4">
        <CardHeader>
          <CardTitle>Recent</CardTitle>
          <CardDescription>
            You can view your recently played songs here.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {recent.length === 0 ? (
            <LoadingSkeleton quantity={20} />
          ) : (
            <RecentTrackList songs={recent} />
          )}
        </CardContent>
      </Card>
    </main>
  );
}
