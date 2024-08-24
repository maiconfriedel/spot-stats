import { useTheme } from "@/components/theme-provider";
import { Switch } from "@/components/ui/switch";
import { AudioLines, Moon, Sun } from "lucide-react";
import { useLocalStorage } from "usehooks-ts";

export default function Header() {
  const [tokenLocalStorageValue, setTokenLocalStorageValue] = useLocalStorage<
    object | undefined
  >("spAuth", undefined);

  const { setTheme, theme } = useTheme();

  function handleLogout() {
    setTokenLocalStorageValue(undefined);
  }

  return (
    <div className="bg-black p-3 text-white sticky top-0 z-50 font-bold text-xl flex flex-1 flex-row justify-between items-center">
      <div className="flex flex-row justify-center items-center gap-2">
        <AudioLines strokeWidth={3} size={30} color="white" className="ml-1" />
        Spot Stats
      </div>

      <div className="flex flex-row justify-center items-center gap-2">
        <Sun color="white" size={20} />
        <Switch
          checked={theme === "dark"}
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        />
        <Moon color="white" size={20} />
        {tokenLocalStorageValue && (
          <button
            className="text-sm bg-red-500 py-1 px-2 rounded-md hover:bg-red-700"
            onClick={handleLogout}
          >
            Logout
          </button>
        )}
      </div>
    </div>
  );
}
