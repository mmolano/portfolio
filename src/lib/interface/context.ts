import { languageIF } from "./lang";


export type Lang = "en" | "fr" | "jp";

export interface ContextType {
   lang: Lang;
   setLang?: (lang: Lang) => void;
   show?: boolean;
   setShow?: React.Dispatch<React.SetStateAction<boolean>>;
   translation: languageIF;
   setTranslation?: React.Dispatch<React.SetStateAction<Record<string, unknown>>>;
   changeLanguage?: (lang: Lang) => void;
   currentSlide: number;
   setCurrentSlide?: React.Dispatch<React.SetStateAction<number>>;
}