import { AudioLines, Menu, Moon, Sun } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { useLocalStorage } from "usehooks-ts";

import { useTheme } from "@/components/ThemeProvider";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Switch } from "@/components/ui/switch";

import { cn } from "@/utils";

export default function Header() {
  const [tokenLocalStorageValue, setTokenLocalStorageValue] = useLocalStorage<
    object | undefined
  >("spAuth", undefined);

  const { setTheme, theme } = useTheme();
  const nav = useNavigate();
  const { pathname } = useLocation();

  function handleLogout() {
    setTokenLocalStorageValue(undefined);
  }

  return (
    <div className="bg-black p-3 text-white sticky top-0 z-50 font-bold text-xl flex flex-1 flex-row justify-between items-center">
      <div className="flex flex-row justify-center items-center gap-2">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" className="gap-2 md:hidden flex">
              <Menu />
            </Button>
          </SheetTrigger>
          <SheetContent side="left">
            <SheetHeader className="mb-4">
              <SheetTitle>Menu</SheetTitle>
              <Separator />
            </SheetHeader>
            <div className="flex flex-col gap-y-4">
              <Button
                variant="ghost"
                className={`${pathname === "/" ? "font-bold bg-zinc-500" : ""}`}
                onClick={() => nav("/")}
              >
                Top Tracks
              </Button>
              <Button
                variant="ghost"
                className={`${
                  pathname === "/artists" ? "font-bold bg-zinc-500" : ""
                }`}
                onClick={() => nav("/artists")}
              >
                Top Artists
              </Button>
              <Button
                variant="ghost"
                className={`${
                  pathname === "/recent" ? "font-bold bg-zinc-500" : ""
                }`}
                onClick={() => nav("/recent")}
              >
                Recently played
              </Button>
              <div className="flex flex-row gap-2 items-center fixed bottom-0 mb-4">
                <Sun className="text-primary" size={20} />
                <Switch
                  color="primary"
                  checked={theme === "dark"}
                  onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                />
                <Moon className="text-primary" size={20} />
              </div>
            </div>
          </SheetContent>
        </Sheet>
        <AudioLines strokeWidth={3} size={30} color="white" className="ml-1" />
        Statify
        <Button
          variant="ghost"
          className={`${cn(
            "hidden md:flex",
            pathname === "/" ? "font-bold bg-zinc-800" : ""
          )}`}
          onClick={() => nav("/")}
        >
          Top Tracks
        </Button>
        <Button
          variant="ghost"
          className={`${cn(
            "hidden md:flex",
            pathname === "/artists" ? "font-bold bg-zinc-800" : ""
          )}`}
          onClick={() => nav("/artists")}
        >
          Top Artists
        </Button>
        <Button
          variant="ghost"
          className={`${cn(
            "hidden md:flex",
            pathname === "/recent" ? "font-bold bg-zinc-800" : ""
          )}`}
          onClick={() => nav("/recent")}
        >
          Recently played
        </Button>
      </div>

      <div className="flex flex-row justify-center items-center gap-2">
        <div className="flex-row gap-2 justify-center items-center hidden md:flex">
          <Sun color="white" size={20} />
          <Switch
            checked={theme === "dark"}
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          />
          <Moon color="white" size={20} />
        </div>

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
