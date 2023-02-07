import React, { useState, useContext, createContext } from 'react';
import { ContextType, Lang } from '../lib/interface/context';

const language = function () {
   if (typeof window !== 'undefined') {
      if (localStorage.getItem('lang')) {
         return localStorage.getItem('lang');
      }
      localStorage.setItem("lang", "en");
      return localStorage.getItem('lang');
   }
}
const currentLanguage = language();

const AppContext = createContext<ContextType>({
   lang: currentLanguage,
   translation: require(`@/lib/lang/${currentLanguage}.json`),
   currentSlide: 0
});

export const StateContext = ({ children }: { children: React.ReactNode }) => {
   const [lang, setLang] = useState(language);
   const [translation, setTranslation] = useState(require(`@/lib/lang/${currentLanguage}.json`));
   const [show, setShow] = useState(false);
   const [currentSlide, setCurrentSlide] = useState(0);


   const changeLanguage = (lang: Lang) => {
      setLang(lang);
      setTranslation(require('@/lib/lang/' + lang + '.json'));
   };

   return (
      <AppContext.Provider value={{
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
      </AppContext.Provider>
   )
}

export const useStateContext = () => useContext(AppContext);