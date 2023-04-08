import React from "react";

type Props = {
   children: React.ReactNode
   className: string
}

export const Paragraphe = ({ children, className }: Props) => {

   function highlight(text: string) {
      const numbers = text.match(/\d+/g);
      if (numbers) {
         return text.split(/(\d+)/).map((part, index) => {
            if (/\d+/.test(part)) {
               return (
                  <span key={index} style={{ color: "#B191FF" }}>
                     {part}
                  </span>
               );
            } else {
               return <React.Fragment key={index}>{part}</React.Fragment>;
            }
         });
      } else {
         return text;
      }
   }
   return (
      <>
         <p className={className}>{highlight(children as string)}</p>
      </>
   )
}