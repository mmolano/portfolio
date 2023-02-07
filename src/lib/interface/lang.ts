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

export interface SlideIF {
   title: string;
   firstName: string;
   name: string;
   type: string;
}

export interface ProjectSectionIF {
   title: string;
   filter: string;
   front: string;
   back: string;
   working: string;
   all: string;
}

export interface LanguageIF {
   lang: Lang;
   nav: Nav;
   title: string;
   projectSection: ProjectSectionIF;
   slideTitle: SlideIF;
   projects: ProjectIF[];
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