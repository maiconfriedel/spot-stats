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
import { useEffect } from "react";

interface StatsProps {
  spotifyToken: string;
}

export function Stats({ spotifyToken }: StatsProps) {
  useEffect(() => {
    console.log("spotifyToken", spotifyToken);
  }, [spotifyToken]);

  return (
    <Tabs defaultValue="short-term" className="w-full">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="short-term">Top Tracks (last 4 weeks)</TabsTrigger>
        <TabsTrigger value="medium-term">
          Top Tracks (last 6 months)
        </TabsTrigger>
        <TabsTrigger value="long-term">Top Tracks (all time)</TabsTrigger>
      </TabsList>
      <TabsContent value="short-term">
        <Card>
          <CardHeader>
            <CardTitle>Top tracks (last 4 weeks)</CardTitle>
            <CardDescription>
              You can view your top tracks from the last 4 weeks here.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <LoadingSkeleton quantity={20} />
          </CardContent>
          <CardFooter></CardFooter>
        </Card>
      </TabsContent>
      <TabsContent value="medium-term">
        <Card>
          <CardHeader>
            <CardTitle>Top tracks (last 6 weeks)</CardTitle>
            <CardDescription>
              You can view your top tracks from the last 6 weeks here.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <LoadingSkeleton quantity={20} />
          </CardContent>
          <CardFooter></CardFooter>
        </Card>
      </TabsContent>
      <TabsContent value="long-term">
        <Card>
          <CardHeader>
            <CardTitle>Top tracks (all time)</CardTitle>
            <CardDescription>
              You can view your top tracks from all time here.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <LoadingSkeleton quantity={20} />
          </CardContent>
          <CardFooter></CardFooter>
        </Card>
      </TabsContent>
    </Tabs>
  );
}
