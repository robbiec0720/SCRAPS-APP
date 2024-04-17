import React, { createContext, useState, useContext } from 'react';

const IngredientContext = createContext();

export const useIngredients = () => useContext(IngredientContext);

export const IngredientProvider = ({ children }) => {
    const [ingredients, setIngredients] = useState([]);
  
    const addIngredient = (ingredient) => {
        setIngredients((currentIngredients) => [...currentIngredients, ingredient.toLowerCase().trim()]);
    };
  
    const removeIngredient = (index) => {
        const updatedItems = [...ingredients];
        updatedItems.splice(index, 1);
        setIngredients(updatedItems);
    };
  
    return (
      <IngredientContext.Provider value={{ ingredients, addIngredient, removeIngredient, setIngredients }}>
        {children}
      </IngredientContext.Provider>
    );
  };