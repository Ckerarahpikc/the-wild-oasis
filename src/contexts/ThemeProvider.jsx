import {
  createContext,
  startTransition,
  useContext,
  useEffect,
  useReducer,
} from "react";

const ThemeContext = createContext();
function initStates() {
  const theme = localStorage.getItem("theme") || "light";
  return { theme };
}

function reducer(state, action) {
  switch (action.type) {
    case "switch_theme":
      return { ...state, theme: state.theme === "light" ? "dark" : "light" };
    default:
      console.error("You called an unexpected action.");
      return { ...state };
  }
}

export default function ThemeProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, undefined, initStates);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", state.theme === "dark");
    document.documentElement.classList.toggle("light", state.theme === "light");

    localStorage.setItem("theme", state.theme);
  }, [state.theme]);

  function toggleTheme() {
    startTransition(() => {
      dispatch({ type: "switch_theme" });
    });
  }

  return (
    <ThemeContext.Provider value={{ theme: state.theme, toggleTheme }}>
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
