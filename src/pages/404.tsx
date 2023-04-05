import { LinkRef } from "@/components/links/LinkRef";

function Custom404() {
   //TODO: better version of it
   return (
      <section className="first-element">
         <pre>
            <code>
               <span className="blue">export default const isAvailable: () {"=> "} {"{"}</span>
               <span className="blue">&nbsp;if&nbsp;( !isAvailable )&nbsp;{"{"}</span>
               <span data-text="return
               {
                  404 not found
               }" className="glitch">&nbsp;&nbsp;return&nbsp;{"{"}
                  <br />&nbsp;&nbsp;&nbsp;404 not Found <br />
                  <LinkRef href="/" className="blue">&nbsp;&nbsp;&nbsp;click here to return Home</LinkRef>
                  <br/>
                  {"  }"};</span>
               {" }"}
            </code>
         </pre>
      </section>
   );
}

export default Custom404;
