interface Nav {
   projects: string
   contact: string
   about: string
   resume: string
}

interface Lang {
   en: string
   fr: string
   ja: string
}

interface ProjectDate {
   start: string
   end: string
}

export type DevType = "Back" | "Front" | "Front | Back" | "Front | WIP" | "Back | WIP" | "WIP";

export interface ProjectIF {
   id: number
   title: string
   slug: string
   type: DevType
   objective?: string
   description: string
   tools: string[]
   date: ProjectDate
   link?: string
   company: string
}

export interface SlideIF {
   title: string
   firstName: string
   name: string
   type: string
   scroll: string
}

export interface ProjectSectionIF {
   title: string
   filter: string
   front: string
   back: string
   working: string
   all: string
}

export interface ContactSectionIF {
   title: string
   links: string
   mailMe: string
   inputName: string
   inputMail: string
   inputSubject: string
   inputTextArea: string
   button: string
   submit: string
   callText: string
}

export interface AboutSectionIF {
   title: string
   content: string
   resume: string
}

export interface ProjectPageIF {
   start: string
   end: string
   previous: string
   next: string
   noLink: string
   breadHome: string
   breadProject: string
   companyName: string
   dateString: string
   linkString: string
   objective: string
   realization: string
}

export interface Errors {
   emailValidation: string
   nameRequired: string
   nameLength: string
   subjectRequired: string
   subjectLengthShort: string
   subjectLengthLong: string
   messageRequired: string
   messageLength: string
   mailRequired: string
   promiseToast: PromiseToast
   wrongUrl: string
}

export interface PromiseToast {
   pending: string
   success: string
   error: string
}

export interface LanguageIF {
   lang: Lang
   nav: Nav
   title: string
   projectSection: ProjectSectionIF
   contactSection: ContactSectionIF
   aboutSection: AboutSectionIF
   projectPage: ProjectPageIF
   slideTitle: SlideIF
   errors: Errors
   projects: ProjectIF[]
}

interface linksAbout {
   name: string
   link: string
}
export interface AboutIF {
   title: string
   description: string
   links: linksAbout[]
}