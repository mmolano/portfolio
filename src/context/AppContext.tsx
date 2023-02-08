import React, { createContext, useContext, useEffect, useState } from 'react';
import { ContextType, Lang } from '../lib/interface/context';

const AppContext = createContext<ContextType>({
   lang: "en",
   translation: require('@/lib/lang/en.json'),
});

export const StateContext = ({ children }: { children: React.ReactNode }) => {
   const [hasMounted, setHasMounted] = useState(false);

   const [lang, setLang] = useState<Lang>("en");
   const [translation, setTranslation] = useState(require('@/lib/lang/en.json'));
   const [show, setShow] = useState(false);

   useEffect(() => {
      setHasMounted(true);
   }, []);

   const changeLanguage = (lang: Lang) => {
      setLang(lang);
      localStorage.setItem('lang', lang);
      setTranslation(require('@/lib/lang/' + lang + '.json'));
   };

   if (hasMounted && lang !== localStorage.getItem('lang')) {
      changeLanguage(localStorage.getItem('lang') as Lang)
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
      }}>
         {children}
      </AppContext.Provider>
   )
}

export const useStateContext = () => useContext(AppContext);