import { useRef } from "react"

interface Props {
   children: React.ReactNode;
}

export const H2Stretch: React.FC<Props> = ({ children }) => {
   const classToAddRef = useRef<string>("--animating")
   const timeoutRef = useRef<number | undefined>(undefined);

   function textSeparator(text: string) {
      const handleMouseEnter = (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
         const span = e.currentTarget;
         span.classList.add(classToAddRef.current);
      };

      const handleMouseLeave = (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
         const span = e.currentTarget;
         timeoutRef.current = window.setTimeout(() => {
            span.classList.remove(classToAddRef.current);
         }, 400);
      };

      return text.split("").map((letter, index) => (
         <span
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className="stretch-letters"
            key={index}>
            {letter}
         </span>
      ));
   }

   return (
      <>
         <h2>
            {textSeparator(children as string)}
         </h2>
      </>
   )
}