import { createContext, useState } from "react";

interface ThemeInterface {
  label: "light" | "dark";
}

interface ContextData {
  theme: ThemeInterface;
  updateTheme: () => void;
}

export const Context = createContext({} as ContextData);

interface Props {
  children: React.ReactNode;
}

export const Provider: React.FC<Props> = ({ children }) => {
  const [theme, setTheme] = useState<ThemeInterface>({
    label: "light",
  });

  const updateTheme = () => {
    setTheme({
      label: theme.label === "light" ? "dark" : "light",
    });
  };

  const contextObj: ContextData = {
    theme,
    updateTheme,
  };

  return <Context.Provider value={contextObj}>{children}</Context.Provider>;
};
