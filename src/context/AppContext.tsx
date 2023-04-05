import React, { createContext, useContext, useEffect, useReducer, useRef, useState } from 'react';
import { ContextType, Lang } from '../lib/interface/context';

const AppContext = createContext<ContextType>({
   lang: "en",
   translation: require('@/lib/lang/en.json'),
});

export const StateContext = ({ children }: { children: Readonly<React.ReactNode> }) => {
   const [lang, setLang] = useState<Lang>("en");
   const [isLoading, setIsLoading] = useState<boolean>(true);
   const [showNav, setShowNav] = useState<boolean>(false);
   const [hasMounted, setHasMounted] = useState<boolean>(false);
   const [translation, setTranslation] = useState(require('@/lib/lang/en.json'));

   const projectsRef = useRef<HTMLDivElement>(null);
   const contactRef = useRef<HTMLDivElement>(null);
   const aboutRef = useRef<HTMLDivElement>(null);

   useEffect(() => {
      setHasMounted(true);
      const body = document.querySelector('body');
      body?.classList.add('no-scroll')
      const timeoutId = setTimeout(() => {
         body?.classList.remove('no-scroll')
         setIsLoading(false);
      }, 4000);

      return () => {
         clearTimeout(timeoutId);
      };
   }, []);

   const changeLanguage = (lang: Lang) => {
      setLang(lang);
      localStorage.setItem('lang', lang);
      try {
         setTranslation(require('@/lib/lang/' + lang + '.json'));
      } catch (err) {
         setTranslation(require('@/lib/lang/en.json'));
      }
   };

   if (hasMounted && lang !== localStorage.getItem('lang')) {
      changeLanguage(localStorage.getItem('lang') as Lang)
   };

   return (
      <AppContext.Provider value={{
         lang,
         setLang,
         showNav,
         translation,
         setTranslation,
         changeLanguage,
         setShowNav,
         projectsRef,
         contactRef,
         aboutRef,
         isLoading,
         setIsLoading
      }}>
         {children}
      </AppContext.Provider>
   )
}

export const useStateContext = () => useContext(AppContext);