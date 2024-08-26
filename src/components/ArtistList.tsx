import { Item } from "@/utils/getTopArtists";

interface ArtistListProps {
  artists: Item[];
}

export default function ArtistList({ artists }: ArtistListProps) {
  function openSpotifySongPage(destination: string) {
    window.open(destination, "_blank");
  }

  return (
    <div className="grid grid-cols-2 gap-5 lg:grid-cols-4">
      {artists.map((artist) => (
        <div
          className="flex flex-col justify-start items-center"
          key={artist.id}
        >
          <img
            src={artist.images[0].url}
            alt={artist.name}
            className="rounded-lg w-32 h-32 cursor-pointer hover:opacity-80 lg:w-48 lg:h-48"
            onClick={() => openSpotifySongPage(artist.external_urls.spotify)}
          />
          <h2 className="text-sm lg:text-lg font-bold mt-4">{artist.name}</h2>
          <p className="text-sm text-gray-500">{artist.genres.join(", ")}</p>
        </div>
      ))}
    </div>
  );
}
