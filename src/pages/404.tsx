import { LinkRef } from "@/components/links/LinkRef";
import { useStateContext } from "@/context/AppContext";

function Custom404() {
   const { translation } = useStateContext();

   return (
      <section className="first-element">
         <code>
            <b>404 NOT FOUND</b>
            <span>{translation.errors.wrongUrl}</span>
            <LinkRef href="/">return Home</LinkRef>
         </code>    
      </section>
   );
}

export default Custom404;
