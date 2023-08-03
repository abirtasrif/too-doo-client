"use client";

import { createContext, useReducer } from "react";

const initialState = {
  notes: [],
};

export const noteReducer = (state, action) => {
  switch (action.type) {
    case "SET_NOTES":
      return {
        notes: action.payload,
      };
    case "CREATE_NOTES":
      return {
        notes: [action.payload, ...state.notes],
      };
    default:
      return state;
  }
};

export const ProjectContext = createContext(); //??

export const ProjectContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(noteReducer, initialState);

  return (
    <ProjectContext.Provider value={{ ...state, dispatch }}>
      {children}
    </ProjectContext.Provider>
  );
};
