import { Item } from "@/utils/getRecentSongs";

interface RecentTrackistProps {
  songs: Item[];
}

export default function RecentTrackList({ songs }: RecentTrackistProps) {
  function openSpotifySongPage(destination: string) {
    window.open(destination, "_blank");
  }

  return songs.map((song) => (
    <div key={song.track.id} className="flex items-center space-x-4">
      <img
        src={song.track.album.images[0].url}
        alt={song.track.name}
        className="w-16 h-16 rounded-lg cursor-pointer hover:opacity-80"
        onClick={() =>
          openSpotifySongPage(song.track.album.external_urls.spotify)
        }
        title="Open Album in Spotify"
      />
      <div>
        <h3
          className="font-bold cursor-pointer hover:underline"
          onClick={() => openSpotifySongPage(song.track.external_urls.spotify)}
          title="Open Song in Spotify"
        >
          {song.track.name}
        </h3>
        <p
          className="text-sm text-gray-500 cursor-pointer hover:underline"
          onClick={() =>
            openSpotifySongPage(song.track.artists[0].external_urls.spotify)
          }
          title="Open Artist in Spotify"
        >
          {song.track.artists.map((artist) => artist.name).join(", ")}
        </p>
      </div>
    </div>
  ));
}
