import { Item } from "@/utils/getTopSongs";

interface SongListProps {
  songs: Item[];
}

export default function TrackList({ songs }: SongListProps) {
  function openSpotifySongPage(destination: string) {
    window.open(destination, "_blank");
  }

  return songs.map((song) => (
    <div key={song.id} className="flex items-center space-x-4">
      <img
        src={song.album.images[0].url}
        alt={song.name}
        className="w-16 h-16 rounded-lg cursor-pointer hover:opacity-80"
        onClick={() => openSpotifySongPage(song.album.external_urls.spotify)}
        title="Open Album in Spotify"
      />
      <div>
        <h3
          className="font-bold cursor-pointer hover:underline"
          onClick={() => openSpotifySongPage(song.external_urls.spotify)}
          title="Open Song in Spotify"
        >
          {song.name}
        </h3>
        <p
          className="text-sm text-gray-500 cursor-pointer hover:underline"
          onClick={() =>
            openSpotifySongPage(song.artists[0].external_urls.spotify)
          }
          title="Open Artist in Spotify"
        >
          {song.artists.map((artist) => artist.name).join(", ")}
        </p>
      </div>
    </div>
  ));
}
