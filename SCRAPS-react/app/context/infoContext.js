import React, { createContext, useState, useContext } from 'react';


/**
 * @module Info-Context
 * @description Enables prefernces across the application
 */

const InfoContext = createContext();

export const useInfo = () => useContext(InfoContext);

/**
 * A context provider component for managing information state.
 * @function InfoProvider
 * @param {object} props - The props object containing the following properties:
 * @param {React.ReactNode} props.children - The child components that will have access to the information context.
 * @returns {JSX.Element} A context provider component wrapping its children with the information context.
 */
export const InfoProvider = ({ children }) => {
    const [cookTime, setCookTime] = useState('60');
    const [missing, setMissing] = useState('5');
  
    return (
      <InfoContext.Provider value={{ cookTime, missing, setCookTime, setMissing }}>
        {children}
      </InfoContext.Provider>
    );
  };