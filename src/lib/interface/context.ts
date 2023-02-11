import { LanguageIF } from "./lang";


export type Lang = "en" | "fr" | "jp";

export interface ContextType {
   lang: Lang;
   setLang?: (lang: Lang) => void;
   show?: boolean;
   setShow?: React.Dispatch<React.SetStateAction<boolean>>;
   translation: LanguageIF;
   setTranslation?: React.Dispatch<React.SetStateAction<Record<string, unknown>>>;
   changeLanguage?: (lang: Lang) => void;
   hasMounted?: boolean;
   setHasMounted?: React.Dispatch<React.SetStateAction<boolean>>;
   projectsRef?: any;
   contactRef?: any;
}