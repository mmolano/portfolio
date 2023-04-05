import { useRef } from "react"

type TitleType = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
interface Props {
   type?: TitleType;
   children: React.ReactNode;
}

export const TitleStretch: React.FC<Props> = ({ type, children }: Props) => {
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

      const letters = text.split("").map((letter, index) => {
         if (letter === " ") {
            return <span key={index}>&nbsp;</span>;
         } else {
            return (
               <span
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                  className="stretch-letters"
                  key={index}>
                  {letter}
               </span>
            );
         }
      });

      return letters;
   }

   switch (type) {
      case 'h1':
         return (
            <h1>
               {textSeparator(children as string)}
            </h1>
         )
      case 'h2':
         return (
            <h2>
               {textSeparator(children as string)}
            </h2>
         )
      case 'h3':
         return (
            <h3>
               {textSeparator(children as string)}
            </h3>
         )
      default:
         return (
            <h2>
               {textSeparator(children as string)}
            </h2>
         )
   }
}