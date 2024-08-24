import { Item } from "@/utils/getTopSongs";

interface SongListProps {
  songs: Item[];
}

export default function SongList({ songs }: SongListProps) {
  return songs.map((song) => (
    <div key={song.id} className="flex items-center space-x-4">
      <img
        src={song.album.images[0].url}
        alt={song.name}
        className="w-16 h-16 rounded-lg"
      />
      <div>
        <h3 className="font-bold">{song.name}</h3>
        <p className="text-sm text-gray-500">
          {song.artists.map((artist) => artist.name).join(", ")}
        </p>
      </div>
    </div>
  ));
}
