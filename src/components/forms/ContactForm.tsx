import { ContactSectionIF } from "@/lib/interface/lang"
import { InputBase } from "../inputs/InputBase"
import { InputTextArea } from "../inputs/InputTextArea"
import { useState } from "react"

export const ContactForm = ({ value }: { value: ContactSectionIF }) => {
   const [hover, setHover] = useState(false);

   const handleMouseEnter = () => {
      setTimeout(() => {
         setHover(true);
      }, 500)
   };

   const handleMouseLeave = () => {
      setHover(false);
   };
   return (
      <>
         <form method="POST">
            <div className="double-input">
               <InputBase placeholder={value.inputName} />
               <InputBase placeholder={value.inputMail} />
            </div>
            <InputBase placeholder={value.inputSubject} />
            <InputTextArea placeholder={value.inputTextArea} />
            <button onMouseEnter={handleMouseEnter}
               onMouseLeave={handleMouseLeave}
               type="submit"
               className={hover ? "active-animation" : "out-animation"}
            >
               {value.button}
            </button>
         </form>
      </>
   )
}