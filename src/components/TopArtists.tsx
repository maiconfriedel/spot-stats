import LoadingSkeletonArtists from "@/components/LoadingSkeletonArtists";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";
import { refreshTokenSpotify } from "@/utils/authenticateSpotify";
import { getTopArtists, Item } from "@/utils/getTopArtists";
import { AxiosError } from "axios";
import { useEffect, useMemo, useState } from "react";
import { useLocalStorage } from "usehooks-ts";
import ArtistList from "./ArtistList";

interface TopArtistsProps {
  spotifyToken: string;
  spotifyRefreshToken: string;
}

export function TopArtists({
  spotifyToken,
  spotifyRefreshToken,
}: TopArtistsProps) {
  const [shortTermArtists, setShortTermArtists] = useState<Item[]>([]);
  const [mediumTermArtists, setMediumTermArtists] = useState<Item[]>([]);
  const [longTermArtists, setLongTermArtists] = useState<Item[]>([]);
  const [timeRange, setTimeRange] = useState("short_term");
  const [, setTokenLocalStorage] = useLocalStorage<
    { access_token: string; refresh_token: string } | undefined
  >("spAuth", undefined);
  const { toast } = useToast();

  const getArtists = useMemo(
    () => async () => {
      if (spotifyToken) {
        try {
          const response = await getTopArtists(spotifyToken, timeRange);

          if (response) {
            switch (timeRange) {
              case "short_term":
                setShortTermArtists(response);
                break;
              case "medium_term":
                setMediumTermArtists(response);
                break;
              case "long_term":
                setLongTermArtists(response);
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
    getArtists();
  }, [getArtists]);

  function handleChangeTab(value: string) {
    setTimeRange(value);
  }

  return (
    <>
      <div className="flex w-full items-center justify-start mb-4">
        <h1 className="font-bold text-3xl">Top Artists</h1>
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
              <CardTitle>Top artists (last 4 weeks)</CardTitle>
              <CardDescription>
                You can view your most listened artists from the last 4 weeks
                here.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {shortTermArtists.length === 0 ? (
                <LoadingSkeletonArtists quantity={20} />
              ) : (
                <ArtistList artists={shortTermArtists} />
              )}
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="medium_term">
          <Card>
            <CardHeader>
              <CardTitle>Top artists (last 6 months)</CardTitle>
              <CardDescription>
                You can view your most listened artists from the last 6 months
                here.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {mediumTermArtists.length === 0 ? (
                <LoadingSkeletonArtists quantity={20} />
              ) : (
                <ArtistList artists={mediumTermArtists} />
              )}
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="long_term">
          <Card>
            <CardHeader>
              <CardTitle>Top artists (last 12 months)</CardTitle>
              <CardDescription>
                You can view your most listened artists from the last 12 months
                here.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {longTermArtists.length === 0 ? (
                <LoadingSkeletonArtists quantity={20} />
              ) : (
                <ArtistList artists={longTermArtists} />
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </>
  );
}
