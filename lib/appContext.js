import { createContext, useContext, useEffect, useState } from "react";
import { isServer } from "../constants";

const PokeContext = createContext();

const localData =
  !isServer && localStorage.getItem("mypokemon")
    ? JSON.parse(localStorage.getItem("mypokemon"))
    : [];

export const PokeProvider = ({ children }) => {
  const [myPoke, setMyPoke] = useState(localData);

  useEffect(() => {
    localStorage.setItem("mypokemon", JSON.stringify(myPoke));
  }, [myPoke]);

  return (
    <PokeContext.Provider value={{ myPoke, setMyPoke }}>
      {children}
    </PokeContext.Provider>
  );
};

export const useAppContext = () => {
  return useContext(PokeContext);
};
