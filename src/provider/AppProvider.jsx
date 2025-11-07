import { createContext, useContext, useEffect, useState } from "react";
import { instance } from "../lib/axios";

const AppContext = createContext();

const AppProvider = ({ children }) => {
  const [handbags, setHandbags] = useState([]);
  const [brands, setBrands] = useState([]);

  const getHandbag = async () => {
    await instance.get("/").then(({ data }) => {
      setBrands(new Set(data.map((item) => item.brand)));
      setHandbags(data);
    });
  };

  useEffect(() => {
    getHandbag();
  }, []);

  return (
    <AppContext.Provider
      value={{
        brands: Array.from(brands),
        handbags,
        setHandbags,
        getHandbag,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
};

export default AppProvider;
