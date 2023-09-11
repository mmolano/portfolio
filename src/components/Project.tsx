import { ProjectIF } from "@/lib/interface/lang";
import Image from "next/image";
import { LinkRef } from "./links/LinkRef";
import StringDate from "@/lib/helpers/Class/StringDate";
import { useEffect, useState } from "react";

export const Project = ({ value, classValue }: { value: ProjectIF, classValue: string }) => {
   const [date, setDate] = useState<string>("");

   function getImageForValue(slug: string): string {
      switch (true) {
         case slug.includes('fidensio-partners'):
            return 'fidensioPartner.jpg';
         case slug.includes('fidensio-api'):
            return 'fidensioApi.jpg';
         case slug.includes('fidensio-nuxt'):
            return 'fidensioDashboard.jpg';
         case slug.includes('fidensio-migration'):
            return 'fidensioMigrate.jpg';
         case slug.includes('recipe-api-laravel'):
            return 'recipe.jpg';
         case slug.includes('e-commerce-react'):
            return 'react.jpg';
         case slug.includes('swedish-fit'):
            return 'swedish.jpg';
         case slug.includes('ghibli-nuxt'):
            return 'ghibli.jpg';
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
                     width="360"
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