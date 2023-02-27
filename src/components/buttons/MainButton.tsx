import { useState } from "react";

type buttonType = 'submit' | 'reset' | 'button';

type buttonProps = {
   type: buttonType;
   className?: string;
   children: Readonly<React.ReactNode>;
   disabled?: boolean;
}

export const MainButton = ({ type, className, children, disabled }: buttonProps): JSX.Element => {
   const [hoverAnimation, setHoverAnimation] = useState<boolean>(false);
   const classValue = className ? className : "";
   const hoverClass = hoverAnimation ? " active-animation" : " out-animation"

   const handleMouseEnter = () => {
      document.getElementsByClassName('cursor')[0].classList.add('button-hover');
      setTimeout(() => {
         setHoverAnimation(true);
      }, 500)
   };

   const handleMouseLeave = () => {
      document.getElementsByClassName('cursor')[0].classList.remove('button-hover')
      setHoverAnimation(false)
   };

   return (
      <>
         <button
            disabled={disabled}
            type={type} onMouseEnter={() => {
            handleMouseEnter()
         }} onMouseLeave={() => {
            handleMouseLeave()
         }} className={classValue + hoverClass}>
            {children}
         </button>
      </>
   )
}