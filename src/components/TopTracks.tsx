import { AxiosError } from "axios";
import { useEffect, useMemo, useState } from "react";
import { useLocalStorage } from "usehooks-ts";

import LoadingSkeleton from "@/components/LoadingSkeleton";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";

import TrackList from "./TrackList";

import { refreshTokenSpotify } from "@/utils/authenticateSpotify";
import { getTopSongs, Item } from "@/utils/getTopSongs";

interface TopTracksProps {
  spotifyToken: string;
  spotifyRefreshToken: string;
}

export default function TopTracks({
  spotifyToken,
  spotifyRefreshToken,
}: TopTracksProps) {
  const [shortTermSongs, setShortTermSongs] = useState<Item[]>([]);
  const [mediumTermSongs, setMediumTermSongs] = useState<Item[]>([]);
  const [longTermSongs, setLongTermSongs] = useState<Item[]>([]);
  const [timeRange, setTimeRange] = useState("short_term");
  const [, setTokenLocalStorage] = useLocalStorage<
    { access_token: string; refresh_token: string } | undefined
  >("spAuth", undefined);
  const { toast } = useToast();

  const getSongs = useMemo(
    () => async () => {
      if (spotifyToken) {
        try {
          const response = await getTopSongs(spotifyToken, timeRange);

          if (response) {
            switch (timeRange) {
              case "short_term":
                setShortTermSongs(response);
                break;
              case "medium_term":
                setMediumTermSongs(response);
                break;
              case "long_term":
                setLongTermSongs(response);
                break;
            }
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
    [spotifyToken, timeRange, setTokenLocalStorage, spotifyRefreshToken, toast]
  );

  useEffect(() => {
    getSongs();
  }, [getSongs]);

  function handleChangeTab(value: string) {
    setTimeRange(value);
  }

  return (
    <>
      <div className="flex w-full items-center justify-start mb-4">
        <h1 className="font-bold text-3xl">Top Tracks</h1>
      </div>
      <Tabs
        defaultValue="short_term"
        className="w-full"
        onValueChange={handleChangeTab}
      >
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="short_term">4 weeks</TabsTrigger>
          <TabsTrigger value="medium_term">6 months</TabsTrigger>
          <TabsTrigger value="long_term">12 months</TabsTrigger>
        </TabsList>
        <TabsContent value="short_term">
          <Card>
            <CardHeader>
              <CardTitle>Top tracks (last 4 weeks)</CardTitle>
              <CardDescription>
                You can view your top tracks from the last 4 weeks here.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {shortTermSongs.length === 0 ? (
                <LoadingSkeleton quantity={20} />
              ) : (
                <TrackList songs={shortTermSongs} />
              )}
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="medium_term">
          <Card>
            <CardHeader>
              <CardTitle>Top tracks (last 6 months)</CardTitle>
              <CardDescription>
                You can view your top tracks from the last 6 months here.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {mediumTermSongs.length === 0 ? (
                <LoadingSkeleton quantity={20} />
              ) : (
                <TrackList songs={mediumTermSongs} />
              )}
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="long_term">
          <Card>
            <CardHeader>
              <CardTitle>Top tracks (all time)</CardTitle>
              <CardDescription>
                You can view your top tracks from the last 12 months here.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {longTermSongs.length === 0 ? (
                <LoadingSkeleton quantity={20} />
              ) : (
                <TrackList songs={longTermSongs} />
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </>
  );
}
