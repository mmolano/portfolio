import type { ReactNode } from 'react';



export const Layout = ({ children }: { children: ReactNode }): JSX.Element => (
   <>
      <div className="main-content">
         {children}
      </div>
   </>
)