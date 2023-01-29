import React, { useState, useContext, createContext } from 'react';
import { ContextType, Lang } from './interface/context';

const Context = createContext<ContextType>({
   lang: "en",
   translation: require('@/lib/lang/en.json'),
   currentSlide: 0
});

export const StateContext = ({ children }: { children: React.ReactNode }) => {
   const [lang, setLang] = useState<Lang>("en");
   const [translation, setTranslation] = useState(require('@/lib/lang/en.json'));
   const [show, setShow] = useState(false);
   const [currentSlide, setCurrentSlide] = useState(0);


   const changeLanguage = (lang: Lang) => {
      setLang(lang);
      setTranslation(require('@/lib/lang/' + lang + '.json'));
   };

   return (
      <Context.Provider value={{
         lang,
         setLang,
         show,
         translation,
         setTranslation,
         changeLanguage,
         setShow,
         currentSlide,
         setCurrentSlide
      }}>
         {children}
      </Context.Provider>
   )
}

export const useStateContext = () => useContext(Context);