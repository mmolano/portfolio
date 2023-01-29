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

export interface Project {
   id: number;
   title: string;
   description: string;
   tools: string[],
   date: ProjectDate,
}

export interface languageIF {
   nav: Nav;
   lang: Lang;
   projects: Project[]
}