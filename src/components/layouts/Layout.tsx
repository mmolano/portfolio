export const Layout = ({ children }: { children: Readonly<React.ReactNode> }): JSX.Element => (
   <>
      <div className="main-content">
         {children}
      </div>
   </>
)