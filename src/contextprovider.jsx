import React, { createContext, useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

export const AppContext = createContext();

const AppProvider = ({ children }) => {
  const { i18n } = useTranslation();
  const [darkMode, setDarkMode] = useState(false);
  const [selectedModule, setSelectedModule] = useState("Dashboard");
  const [data, setData] = useState([]);

  useEffect(() => {
    document.body.className = darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-black";
  }, [darkMode]);

  const fetchData = async () => {
    try {
      const response = await fetch("https://jsonplaceholder.typicode.com/users");
      const result = await response.json();
      setData(result);
    } catch (error) {
      console.error("Error fetching data:", error);
      setData([]);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <AppContext.Provider value={{ darkMode, setDarkMode, selectedModule, setSelectedModule, data, i18n }}>
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;
