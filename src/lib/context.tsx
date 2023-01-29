import React, { useState, useContext, createContext } from 'react';
import { ContextType } from './interface/context';

const Context = createContext<ContextType>({
   lang: 'en' || 'fr',
   translation: require('@/lib/lang/en.json')
});

export const StateContext = ({ children }: { children: React.ReactNode }) => {
   const [lang, setLang] = useState('en');
   const [translation, setTranslation] = useState(require('@/lib/lang/en.json'));
   const [show, setShow] = useState(false);

   const changeLanguage = (lang: string) => {
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
         setShow
      }}>
         {children}
      </Context.Provider>
   )
}

export const useStateContext = () => useContext(Context);