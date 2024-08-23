import { AudioLines } from "lucide-react";

function App() {
  function handleLogin() {
    alert("Login with Spotify");
  }

  return (
    <main className="flex items-center justify-center min-h-screen bg-primary flex-col relative pb-4">
      <div className="flex flex-row items-center justify-center gap-2">
        <AudioLines strokeWidth={3} size={60} color="white" className="mt-2" />
        <h1 className="font-bold text-6xl text-secondary">Spot Stats</h1>
      </div>
      <span className="font-semibold text-md text-white">
        Get your statistics from Spotify
      </span>
      <button
        className="bg-secondary text-white rounded-md py-2 px-4 font-bold mt-4 hover:bg-secondary-hover"
        onClick={handleLogin}
      >
        Login with Spotify
      </button>
    </main>
  );
}

export default App;
