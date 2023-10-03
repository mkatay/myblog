import React, { createContext, useEffect, useState } from 'react';

const postCategories=['Food','Entertainment','Sports','Culture','Design','Health','Travel']

export const CategContext = createContext();

export const CategProvider = ({ children }) => {
  const [categories, setCategories] = useState(null);
  
  useEffect(() => {
    setCategories(postCategories)    
}, []);

    return (
    <CategContext.Provider value={{ categories}}>                               
      {children}
    </CategContext.Provider>
  );
};
