import React, { createContext, useState, useContext } from 'react';

/**
 * @module Ingredient-Context
 * @description Enables ingredient data across the application
 */

const IngredientContext = createContext();

export const useIngredients = () => useContext(IngredientContext);

/**
 * A context provider component for managing ingredient state.
 * @function IngredientProvider
 * @param {object} props - The props object containing the following properties:
 * @param {React.ReactNode} props.children - The child components that will have access to the ingredient context.
 * @returns {JSX.Element} A context provider component wrapping its children with the ingredient context.
 */
export const IngredientProvider = ({ children }) => {
    const [ingredients, setIngredients] = useState([]);
  
    /**
     * Function for adding an ingredient to the list of ingredients.
     * @function addIngredient
     * @description This function takes an ingredient as input and adds it to the list
     * of ingredients stored in the component's state. The ingredient is
     * converted to lowercase and trimmed of any leading or trailing spaces
     * before being added to the list.
     * @return {void}
     * @param {string} ingredient The ingredient to be added to the list.
     */
    const addIngredient = (ingredient) => {
        setIngredients((currentIngredients) => [...currentIngredients, ingredient.toLowerCase().trim()]);
    };
  
    /**
     * Function for removing an ingredient from the list of ingredients.
     * @function removeIngredient
     * @description This function takes an index as input and removes the ingredient
     * at that index from the list of ingredients stored in the component's
     * state. It creates a copy of the current list, removes the specified
     * ingredient using the splice method, and updates the component's state
     * with the updated list of ingredients.
     * @return {void}
     * @param {number} index The index of the ingredient to be removed from the list.
     */
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