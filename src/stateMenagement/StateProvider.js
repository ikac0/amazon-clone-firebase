import React, { createContext, useContext, useReducer } from "react";

// Preparing the data-layer-style/redux-type, asigning it in advance as a shortcut to refer;
export const StateContext = createContext();

// Wraping the app and provide the data layer so parts of the app can access it when and where they need it. .provider
export const StateProvider = ({ reducer, initialState, children }) => (
  <StateContext.Provider value={useReducer(reducer, initialState)}>
    {children}
  </StateContext.Provider>
);

// Pull information from the data layer . .Consumer
export const useStateValue = () => useContext(StateContext);
