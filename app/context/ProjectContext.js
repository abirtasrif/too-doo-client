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
    case "DELETE_NOTE":
      return {
        ...state,
        notes: state.notes.filter((note) => note._id !== action.payload._id),
      };
    case "UPDATE_NOTE":
      const [existingNote] = state.notes.filter(
        (note) => note._id === action.payload._id
      );

      return {
        ...state,
        notes: [
          action.payload,
          ...state.notes.filter((note) => note._id !== existingNote._id),
        ],
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
