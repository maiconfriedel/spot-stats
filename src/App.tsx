import { AudioLines } from "lucide-react";

function App() {
  function handleLogin() {
    alert("Login with Spotify");
  }

  return (
    <main className="flex flex-1 items-center justify-center min-h-screen bg-primary flex-col relative pb-4">
      <h1 className="font-bold text-6xl text-secondary">Spot Stats</h1>
      <AudioLines strokeWidth={3} size={40} color="white" className="mt-2" />
      <span className="font-semibold text-md text-white mt-2">
        Get your statistics from Spotify
      </span>
      <button
        className="bg-secondary text-white rounded-md py-2 px-4 font-bold mt-2 hover:bg-secondary-hover"
        onClick={handleLogin}
      >
        Login with Spotify
      </button>
    </main>
  );
}

export default App;
