import { LanguageIF } from "./lang";
import { RefObject } from "react";

export type Lang = "en" | "fr" | "ja";

export interface ContextType {
   lang: Lang,
   setLang?: (lang: Lang) => void,
   showNav?: boolean,
   setShowNav?: React.Dispatch<React.SetStateAction<boolean>>,
   isLoading?: boolean,
   setIsLoading?: React.Dispatch<React.SetStateAction<boolean>>,
   setShowLoader?: React.Dispatch<React.SetStateAction<boolean>>,
   translation: LanguageIF,
   setTranslation?: React.Dispatch<React.SetStateAction<Record<string, unknown>>>,
   changeLanguage?: (lang: Lang) => void,
   hasMounted?: boolean,
   setHasMounted?: React.Dispatch<React.SetStateAction<boolean>>,
   projectsRef?: RefObject<HTMLDivElement>,
   contactRef?: RefObject<HTMLDivElement>,
   aboutRef?: RefObject<HTMLDivElement>,
}