// import React, { createContext, useState, useEffect } from "react";

// // import { ThemeProvider as FlowbiteThemeProvide  } from "flowbite-react";
// import { ThemeProvider as FlowbiteThemeProvide } from "flowbite-react/lib/esm/components/Flowbite/ThemeContext";

// export const ThemeContext = createContext();

// const CustomThemeProvider = ({ children }) => {
//   const [isDarkMode, setIsDarkMode] = useState(false);

//   useEffect(() => {
//     const isDarkModeEnabled = localStorage.getItem("isDarkMode");
//     setIsDarkMode(JSON.parse(isDarkModeEnabled));
//   }, []);

//   const toggleDarkMode = () => {
//     const newIsDarkMode = !isDarkMode;
//     localStorage.setItem("isDarkMode", JSON.stringify(newIsDarkMode));
//     setIsDarkMode(newIsDarkMode);
//   };

//   return (
//     <ThemeContext.Provider value={{ isDarkMode, toggleDarkMode }}>
//       <FlowbiteThemeProvide theme={isDarkMode ? "dark" : "default"}>
//         {children}
//       </FlowbiteThemeProvide>
//     </ThemeContext.Provider>
//   );
// };

// export default CustomThemeProvider;
