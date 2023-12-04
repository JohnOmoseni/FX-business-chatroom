import { useReducer, useContext, useEffect, createContext } from "react";
import fetchReducer, { initialState } from "../Reducers/fetchReducer";

const FetchContext = createContext(initialState);

export function FetchContextProvider({ children }) {
  const [state, dispatch] = useReducer(fetchReducer, initialState);
  const baseURL = "https://apiv3.apifootball.com/";
  const apiKey = "9ea6519d1121d8462afef2cc60b975ddc7d3d43830301e59007dcd217bad944c";

  const value = { state, dispatch, baseURL, apiKey };

  return <FetchContext.Provider value={value}>{children}</FetchContext.Provider>;
}

function useFetchContext() {
  const context = useContext(FetchContext);
  if (!context) throw new Error("useFetchContext must be used within the FetchContext");

  return context;
}

export default useFetchContext;
