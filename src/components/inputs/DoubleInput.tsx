import { ReactNode } from "react";


export const DoubleInput = ({ children }: {children: ReactNode}): JSX.Element => {
   return (
      <>
         <div className="double-input">
            {children}
         </div>
      </>
   )
}