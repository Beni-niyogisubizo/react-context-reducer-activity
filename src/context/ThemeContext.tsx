import {
  createContext,
  useContext,
  useState,
  type ReactNode,
} from "react";
import { DARK_THEME, LIGHT_THEME } from "../constants/theme";

type Theme = typeof LIGHT_THEME | typeof DARK_THEME;

interface ThemeContextValue {
  theme: Theme;
  toggleTheme: () => void;
}

interface ThemeProviderProps {
  children: ReactNode;
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

export function ThemeProvider({ children }: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(LIGHT_THEME);

  function toggleTheme() {
    setTheme((currentTheme) =>
      currentTheme === LIGHT_THEME ? DARK_THEME : LIGHT_THEME,
    );
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useTheme() {
  const context = useContext(ThemeContext);

  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }

  return context;
}
