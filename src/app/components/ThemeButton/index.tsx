import { Button } from "../Button";

export const ThemeButtons = ({
  mode,
  setTheme,
}: {
  mode: string;
  setTheme: (t: any) => void;
}) => (
  <>
    <Button
      onClick={() => setTheme("light")}
      variant={mode === "light" ? "primary" : "default"}
      className="w-full justify-start cursor-pointer"
    >
      Light
    </Button>
    <Button
      onClick={() => setTheme("dark")}
      variant={mode === "dark" ? "primary" : "default"}
      className="w-full justify-start cursor-pointer"
    >
      Dark
    </Button>
    <Button
      onClick={() => setTheme("system")}
      variant={mode === "system" ? "primary" : "default"}
      className="w-full justify-start cursor-pointer"
    >
      System (Follow OS)
    </Button>
  </>
);
