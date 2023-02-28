import { useStateContext } from "@/context/AppContext";
import { Loader } from "../Loader";

export const Layout = ({ children }: { children: Readonly<React.ReactNode> }) => {
   const { isLoading } = useStateContext();

   return(
      <>
         {isLoading ? <Loader /> : null}
         <div className="main-content">
            {children}
         </div>
      </>
   )
}