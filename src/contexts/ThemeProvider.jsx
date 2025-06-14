import { createContext, useContext, useEffect } from "react";
import { useLocalStorageState } from "../hooks/useLocalStorageState";

const ThemeContext = createContext();

export default function ThemeProvider({ children }) {
  const [theme, setTheme] = useLocalStorageState(false, "theme");

  useEffect(() => {
    if (theme) {
      document.documentElement.classList.add("dark-mode");
      document.documentElement.classList.remove("dark-mode");
    } else {
      document.documentElement.classList.remove("dark-mode");
      document.documentElement.classList.add("dark-mode");
    }
  }, [theme]);

  function toggleTheme() {
    setTheme((theme) => !theme);
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context)
    throw new Error("You are using ThemeProvider outside the Provider itself.");
  return context;
}
