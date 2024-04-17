import React, { createContext, useState, useContext } from 'react';

const ImageContext = createContext();

export const useImages = () => useContext(ImageContext);

export const ImageProvider = ({ children }) => {
  const [images, setImages] = useState([]);

  const addImage = (uri) => {
    setImages((currentImages) => [...currentImages, uri]);
  };

  const clearImages = () => {
    setImages([]);
  };

  return (
    <ImageContext.Provider value={{ images, addImage, clearImages, setImages }}>
      {children}
    </ImageContext.Provider>
  );
};
