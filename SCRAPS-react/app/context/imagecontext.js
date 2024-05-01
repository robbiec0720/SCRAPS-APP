import React, { createContext, useState, useContext } from 'react';



/**
 * @module Image-Context
 * @description Enables images across the application
 */


const ImageContext = createContext();

export const useImages = () => useContext(ImageContext);

/**
 * A context provider component for managing image state.
 * 
 * @param {object} props - The props object containing the following properties:
 * @param {React.ReactNode} props.children - The child components that will have access to the image context.
 * @returns {JSX.Element} A context provider component wrapping its children with the image context.
 */

export const ImageProvider = ({ children }) => {
  const [images, setImages] = useState([]);

  /**
   * Adds a new image URI to the list of images.
   * 
   * @param {string} uri - The URI of the image to be added.
   */

  const addImage = (uri) => {
    setImages((currentImages) => [...currentImages, uri]);
  };

  /**
   * Clears the list of images.
   */
  const clearImages = () => {
    setImages([]);
  };

  return (
    <ImageContext.Provider value={{ images, addImage, clearImages, setImages }}>
      {children}
    </ImageContext.Provider>
  );
};
