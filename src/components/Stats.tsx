import LoadingSkeleton from "@/components/LoadingSkeleton";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { refreshTokenSpotify } from "@/utils/authenticateSpotify";
import { getTopSongs, Item } from "@/utils/getTopSongs";
import { useEffect, useMemo, useState } from "react";
import { useLocalStorage } from "usehooks-ts";
import SongList from "./SongList";

interface StatsProps {
  spotifyToken: string;
  spotifyRefreshToken: string;
}

export function Stats({ spotifyToken, spotifyRefreshToken }: StatsProps) {
  const [shortTermSongs, setShortTermSongs] = useState<Item[]>([]);
  const [mediumTermSongs, setMediumTermSongs] = useState<Item[]>([]);
  const [longTermSongs, setLongTermSongs] = useState<Item[]>([]);
  const [timeRange, setTimeRange] = useState("short_term");
  const [, setTokenLocalStorage] = useLocalStorage<
    { access_token: string; refresh_token: string } | undefined
  >("spAuth", undefined);

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
        } catch {
          const token = await refreshTokenSpotify(spotifyRefreshToken);

          setTokenLocalStorage({
            refresh_token: spotifyRefreshToken,
            access_token: token.access_token,
          });
        }
      }
    },
    [spotifyToken, timeRange, setTokenLocalStorage, spotifyRefreshToken]
  );

  useEffect(() => {
    getSongs();
  }, [getSongs]);

  function handleChangeTab(value: string) {
    setTimeRange(value);
    getSongs();
  }

  return (
    <Tabs
      defaultValue="short_term"
      className="w-full"
      onValueChange={handleChangeTab}
    >
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="short_term">Top Tracks (last 4 weeks)</TabsTrigger>
        <TabsTrigger value="medium_term">
          Top Tracks (last 6 months)
        </TabsTrigger>
        <TabsTrigger value="long_term">Top Tracks (all time)</TabsTrigger>
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
              <SongList songs={shortTermSongs} />
            )}
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="medium_term">
        <Card>
          <CardHeader>
            <CardTitle>Top tracks (last 6 weeks)</CardTitle>
            <CardDescription>
              You can view your top tracks from the last 6 weeks here.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {mediumTermSongs.length === 0 ? (
              <LoadingSkeleton quantity={20} />
            ) : (
              <SongList songs={mediumTermSongs} />
            )}
          </CardContent>
          <CardFooter></CardFooter>
        </Card>
      </TabsContent>
      <TabsContent value="long_term">
        <Card>
          <CardHeader>
            <CardTitle>Top tracks (all time)</CardTitle>
            <CardDescription>
              You can view your top tracks from all time here.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {longTermSongs.length === 0 ? (
              <LoadingSkeleton quantity={20} />
            ) : (
              <SongList songs={longTermSongs} />
            )}
          </CardContent>
          <CardFooter></CardFooter>
        </Card>
      </TabsContent>
    </Tabs>
  );
}
