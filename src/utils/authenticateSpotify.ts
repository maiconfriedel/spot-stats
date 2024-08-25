import axios from 'axios'
import { Buffer } from 'buffer'
import querystring from 'query-string'

export async function authenticateSpotify(code: string) {
  const response = await axios.post(
    "https://accounts.spotify.com/api/token",
    querystring.stringify({
      code: code,
      redirect_uri: import.meta.env.VITE_CALLBACK_URL,
      grant_type: "authorization_code",
    }),
    {
      headers: {
        Authorization:
          "Basic " +
          Buffer.from(
            import.meta.env.VITE_SPOTIFY_CLIENT_ID +
            ":" +
            import.meta.env.VITE_SPOTIFY_CLIENT_SECRET
          ).toString("base64"),
        "Content-Type": "application/x-www-form-urlencoded",
      },
    })

  return response.data
}

export async function refreshTokenSpotify(refreshToken: string) {
  const response = await axios.post(
    "https://accounts.spotify.com/api/token",
    querystring.stringify({
      refresh_token: refreshToken,
      grant_type: "refresh_token",
    }),
    {
      headers: {
        Authorization:
          "Basic " +
          Buffer.from(
            import.meta.env.VITE_SPOTIFY_CLIENT_ID +
            ":" +
            import.meta.env.VITE_SPOTIFY_CLIENT_SECRET
          ).toString("base64"),
        "Content-Type": "application/x-www-form-urlencoded",
      },
    })

  return response.data
}