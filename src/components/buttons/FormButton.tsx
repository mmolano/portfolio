type buttonType = 'submit' | 'reset' | 'button';

type buttonProps = {
   type: buttonType;
   className: string;
   children: Readonly<React.ReactNode>;
   onMouseEnter: () => void;
   onMouseLeave: () => void;
}

export const FormButton = ({ type, className, children, onMouseEnter, onMouseLeave }: buttonProps): JSX.Element => {
   const handleMouseEnter = () => document.getElementsByClassName('cursor')[0].classList.add('button-hover');
   const handleMouseLeave = () => document.getElementsByClassName('cursor')[0].classList.remove('button-hover')

      return (
         <>
            <button type={type} onMouseEnter={() => {
               handleMouseEnter();
               onMouseEnter()
            }} onMouseLeave={() => {
               handleMouseLeave();
               onMouseLeave()
            }} className={className}>
               {children}
            </button>
         </>
      )
   }