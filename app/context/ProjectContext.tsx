"use client";
import { createContext, useReducer, ReactNode } from "react";

const initialState = {
  notes: [],
};

export const noteReducer = (state: any, action: any) => {
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

export const ProjectContext = createContext(initialState); //??

type ProjectContextProviderProps = {
  children: ReactNode;
};

export const ProjectContextProvider: React.FC<ProjectContextProviderProps> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(noteReducer, initialState);

  return (
    <ProjectContext.Provider value={{ ...state, dispatch }}>
      {children}
    </ProjectContext.Provider>
  );
};
