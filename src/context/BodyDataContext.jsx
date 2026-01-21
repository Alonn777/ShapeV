import { createContext, useContext, useState } from "react";

export const BodyDataContext = createContext();

export const BodyDataContextProvider = ({ children }) => {
  const [BodyDataID, SetBodyDataID] = useState(null);
  return (
    <BodyDataContext.Provider value={{ BodyDataID, SetBodyDataID }}>
      {children}
    </BodyDataContext.Provider>
  );
};
