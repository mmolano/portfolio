import React from "react";
import { LinkRef } from "../links/LinkRef";

type Props = {
   children: React.ReactNode;
   className?: string;
};

export const Paragraphe = ({ children, className }: Props) => {
   function highlight(text: string) {
      const urlRegex = /(https?:\/\/[^\s]+)/g;
      const parts = text.split(urlRegex);

      return parts.map((part, index) => {
         if (index % 2 === 0) {
            // Split text into parts one before url and one after
            const numbers = part.match(/\d+/g);

            if (numbers) {
               return part.split(/(\d+)/).map((p, i) => {
                  if (/\d+/.test(p)) {
                     return (
                        <span key={i} style={{ color: "#B191FF" }}>
                           {p}
                        </span>
                     );
                  } else {
                     return (
                        <React.Fragment key={i}>
                           {p}
                        </React.Fragment>
                     );
                  }
               });
            } else {
               return (
                  <React.Fragment key={index}>
                     {part}
                  </React.Fragment>
               );
            }
         } else {
            const url = part.trim();
            return (
               <LinkRef isOutSite={true} target="_blank" rel="noreferrer" key={index} href={url}>
                  <span className="external-link">{url}</span>
               </LinkRef>
            );
         }
      });
   }

   return (
      <>
         <p className={className}>{highlight(children as string)}</p>
      </>
   );
};
