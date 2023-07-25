import { createContext, useReducer } from 'react';

// Define the initial state
const initialState = {
  stats: [],
};

// Create the context
export const DiabeticStatsContext = createContext();

// Define the reducer function
const diabeticStatsReducer = (state, action) => {
  switch (action.type) {
    case 'SET_DIABETIC_STATS':
      return {
        ...state,
        stats: action.payload,
      };
    case 'ADD_DIABETIC_STAT':
      return {
        ...state,
        stats: [...state.stats, action.payload],
      };
    case 'DELETE_DIABETIC_STAT':
      return {
        ...state,
        stats: state.stats.filter((stat) => stat._id !== action.payload),
      };
    default:
      return state;
  }
};

// Create the context provider component
export const DiabeticStatsContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(diabeticStatsReducer, initialState);

  return (
    <DiabeticStatsContext.Provider value={{ ...state, dispatch }}>
      {children}
    </DiabeticStatsContext.Provider>
  );
};