import { ProjectIF } from "@/lib/interface/lang";
import Image from "next/image";
import { LinkRef } from "./links/LinkRef";

export const Project = ({ value, classValue }: { value: ProjectIF, classValue: string }) => {
   function getImageForValue(slug: string): string {
      switch (true) {
         case slug.includes('fidensio'):
            return 'fidensio.png';
         case slug.includes('laravel'):
            return 'laravel.png';
         case slug.includes('react'):
            return 'react.png';
         default:
            return 'default.png';
      }
   }

   return (
      <>
         <LinkRef href={`/project/${value.slug}`}>
            <div className={`card ${classValue}`}>
               <div className="project">
                  <Image
                     className="glitch"
                     width="115"
                     height="230"
                     src={`/images/projects/${getImageForValue(value.slug)}`}
                     alt={value.title}
                     priority={false}
                  />
               </div>
               <h3>{value.title}</h3>
            </div>
         </LinkRef>
      </>
   )
} 