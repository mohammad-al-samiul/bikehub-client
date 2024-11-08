import { createContext, useEffect, useState } from "react";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { ConfigProvider as AntConfigProvider } from "antd";
import "./antdTheme.css";
// Define types for the context
interface ThemeContextType {
  theme: string;
  toggleTheme: () => void;
}

export const ThemeContext = createContext<ThemeContextType>({
  theme: "bikehubtheme",
  toggleTheme: () => {},
});

export default function ThemeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [theme, setTheme] = useState(
    localStorage.getItem("theme") || "bikehubtheme"
  );

  const toggleTheme = () => {
    const newTheme = theme === "bikehubtheme" ? "dark" : "bikehubtheme";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  };

  // Chakra theme configuration
  const chakraTheme = extendTheme({
    config: { initialColorMode: theme === "dark" ? "dark" : "light" },
  });

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);

    // Optionally, add a class to the document for custom Ant Design theming
    document.documentElement.classList.toggle(
      "ant-dark-theme",
      theme === "dark"
    );
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <ChakraProvider theme={chakraTheme}>
        <AntConfigProvider>{children}</AntConfigProvider>
      </ChakraProvider>
    </ThemeContext.Provider>
  );
}
