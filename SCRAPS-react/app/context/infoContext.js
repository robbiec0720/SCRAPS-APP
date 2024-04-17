import React, { createContext, useState, useContext } from 'react';

const InfoContext = createContext();

export const useInfo = () => useContext(InfoContext);

export const InfoProvider = ({ children }) => {
    const [cookTime, setCookTime] = useState('60');
    const [missing, setMissing] = useState('5');
  
    return (
      <InfoContext.Provider value={{ cookTime, missing, setCookTime, setMissing }}>
        {children}
      </InfoContext.Provider>
    );
  };