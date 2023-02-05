import type { ReactNode } from 'react';

type LayoutProps = {
   readonly children: ReactNode;
};

export const Layout = ({ children }: LayoutProps): JSX.Element => (
   <>
      <div className="main-content">
         {children}
      </div>
   </>
)