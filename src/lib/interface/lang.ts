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

interface ProjectDate {
   start: string;
   end: string;
}

export interface ProjectIF {
   id: number;
   title: string;
   description: string;
   tools: string[],
   date: ProjectDate,
}

export interface LanguageIF {
   nav: Nav;
   lang: Lang;
   projects: ProjectIF[]
}

interface linksAbout {
   name: string;
   link: string;
}
export interface AboutIF {
   title: string;
   description: string;
   links: linksAbout[],
}