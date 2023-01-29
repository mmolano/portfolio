import { languageIF } from "./lang";

export type ContextType = {
   lang: string;
   setLang?: (lang: string) => void;
   show?: boolean;
   setShow?: React.Dispatch<React.SetStateAction<boolean>>;
   translation: languageIF;
   setTranslation?: React.Dispatch<React.SetStateAction<Record<string, any>>>;
   changeLanguage?: (lang: string) => void;
}