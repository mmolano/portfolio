import { ProjectIF } from "@/lib/interface/lang";
import Image from "next/image";
import { LinkRef } from "./links/LinkRef";
import StringDate from "@/lib/helpers/Class/StringDate";
import { useEffect, useState } from "react";

export const Project = ({ value, classValue }: { value: ProjectIF, classValue: string }) => {
   const [date, setDate] = useState<string>("");

   function getImageForValue(slug: string): string {
      switch (true) {
         case slug.includes('fidensio'):
            return 'fidensio.jpg';
         case slug.includes('laravel'):
            return 'laravel.jpg';
         case slug.includes('react'):
            return 'react.jpg';
         default:
            return 'default.jpg';
      }
   }
   useEffect(() => {
      if (value) {
         const dateStart = new StringDate(value.date.start).normalDate;
         setDate(dateStart);
      }
   }, [value])

   return (
      <>
         <LinkRef href={`/project/${value.slug}`}>
            <div className={`card ${classValue}`}>
               <div className="project">
                  <Image
                     width="300"
                     height="220"
                     src={`/images/projects/${getImageForValue(value.slug)}`}
                     alt={value.title}
                     priority={false}
                  />
               </div>
               <div className="card-title-section">
                  <h3>{date} - {value.type}</h3>
                  <h4>{value.title}</h4>
               </div>
            </div>
         </LinkRef>
      </>
   )
} 