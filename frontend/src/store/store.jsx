import { createContext, useContext } from "react";
import useData from "../hooks/useData"

const useStoreState = () => {
  const data = useData();
  return {
    ...data
  }
};

const ShortenContext = createContext();

export const useStore = () => useContext(ShortenContext);

const StoreProvicer = ({ children }) => {
  const data = useStoreState();
  return <ShortenContext.Provider value={data}>{children}</ShortenContext.Provider>;
}

export default StoreProvicer;
