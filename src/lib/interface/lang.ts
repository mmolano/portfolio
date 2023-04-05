interface Nav {
   projects: string,
   contact: string,
   about: string,
   resume: string,
}

interface Lang {
   en: string,
   fr: string,
   jp: string,
}

interface ProjectDate {
   start: string,
   end: string,
}

export type DevType = "Back" | "Front" | "Front | Back" | "Front | WIP" | "Back | WIP" | "WIP";

export interface ProjectIF {
   id: number,
   title: string,
   slug: string,
   type: DevType,
   description: string,
   tools: string[],
   date: ProjectDate,
}

export interface SlideIF {
   title: string,
   firstName: string,
   name: string,
   type: string,
   scroll: string,
}

export interface ProjectSectionIF {
   title: string,
   filter: string,
   front: string,
   back: string,
   working: string,
   all: string,
}

export interface ContactSectionIF {
   title: string,
   links: string,
   mailMe: string,
   inputName: string,
   inputMail: string,
   inputSubject: string,
   inputTextArea: string,
   button: string,
   submit: string,
}

export interface AboutSectionIF {
   title: string,
   content: string,
   resume: string,
}

export interface ProjectPageIF {
   start: string,
   end: string,
   previous: string,
   next: string,
}
export interface LanguageIF {
   lang: Lang,
   nav: Nav,
   title: string,
   projectSection: ProjectSectionIF,
   contactSection: ContactSectionIF,
   aboutSection: AboutSectionIF,
   projectPage: ProjectPageIF,
   slideTitle: SlideIF,
   projects: ProjectIF[],
}

interface linksAbout {
   name: string,
   link: string,
}
export interface AboutIF {
   title: string,
   description: string,
   links: linksAbout[],
}