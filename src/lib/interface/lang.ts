interface Nav {
   projects: string;
   contact: string;
   about: string;
   resume: string;
}

interface Lang {
   en: string;
   fr: string;
}

export type languageIF = {
   nav: Nav;
   lang: Lang;
}