interface buttonIF {
   className?: string;
   children: Readonly<React.ReactNode>;
   onClick?: () => void;
}

export const Button = ({ className, children, onClick }: buttonIF) => {
   const handleMouseEnter = () => document.getElementsByClassName('cursor')[0].classList.add('button-hover');
   const handleMouseLeave = () => document.getElementsByClassName('cursor')[0].classList.remove('button-hover')

   return (
      <>
         <button type="button" className={className} onClick={onClick}
            onMouseEnter={() =>
               handleMouseEnter()
            } onMouseLeave={() =>
               handleMouseLeave()
            }>
            {children}
         </button>
      </>
   )
}