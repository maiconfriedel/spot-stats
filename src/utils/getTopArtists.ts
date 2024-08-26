import axios from 'axios';

export async function getTopArtists(token: string, timeRange: string) {
  const response = await axios.get<TopArtistsResponse>(`https://api.spotify.com/v1/me/top/artists?time_range=${timeRange}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  return response.data.items;
}

export interface TopArtistsResponse {
  items: Item[]
  total: number
  limit: number
  offset: number
  href: string
  next: string
  previous: string
}

export interface Item {
  external_urls: ExternalUrls
  followers: Followers
  genres: string[]
  href: string
  id: string
  images: Image[]
  name: string
  popularity: number
  type: string
  uri: string
}

export interface ExternalUrls {
  spotify: string
}

export interface Followers {
  href: string
  total: number
}

export interface Image {
  height: number
  url: string
  width: number
}
