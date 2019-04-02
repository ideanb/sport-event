import React, { createContext, useContext, useReducer } from 'react';

const initialState = {
  corridorStart: {},
  corridorEnd: {},
  captures: []
};

const reducer = (state, action) => {
  const { type, data } = action;
  switch (type) {
    case 'SET_CORRIDOR_START': {
      return {
        ...state,
        corridorStart: data
      }
    }
    case 'SET_CORRIDOR_END': {
      return {
        ...state,
        corridorEnd: data
      }
    }
    case 'REGISTER_ATHLETE_CORRIDOR_START': {
      const newCaptures = [...state.captures];
      newCaptures.unshift(data);
      return {
        ...state,
        captures: newCaptures
      }
    }
    case 'REGISTER_ATHLETE_CORRIDOR_END': { 
      const { athlete = {} } = data;
      const newCaptures = [...state.captures];
      let captureIndex = newCaptures.findIndex(capture => capture.athlete.id === athlete.id)
      newCaptures[captureIndex] = data;

      return {
        ...state,
        captures: newCaptures
      }
    }
    default: {
      return state;
    }
  }
};

export const Context = createContext();

export const Provider = ({ children }) => (
  <Context.Provider value={useReducer(reducer, initialState)}>
    {children}
  </Context.Provider>
);

export const useGlobalState = () => useContext(Context);
