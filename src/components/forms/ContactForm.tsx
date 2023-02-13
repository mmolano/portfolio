import { ContactSectionIF } from "@/lib/interface/lang"
import { InputBase } from "../inputs/InputBase"
import { InputTextArea } from "../inputs/InputTextArea"
import { FormEvent, useState } from "react"
import { DoubleInput } from "../inputs/DoubleInput"
import { ContactFormContext } from "@/context/ContactFormContext"
import { useContactContext } from "@/context/ContactFormContext"

export const ContactForm = ({ value }: { value: ContactSectionIF }) => {
   const [hover, setHover] = useState<boolean>(false);
   const { tasks } = useContactContext()

   const handleMouseEnter = () => {
      setTimeout(() => {
         setHover(true);
      }, 500)
   };


   const handleMouseLeave = () => setHover(false);

   function handleSubmit(e: FormEvent<HTMLFormElement>) {
      e.preventDefault();
   }

   function handleDisable(): boolean {
      return !tasks.mail || !tasks.message || !tasks.subject || !tasks.name;
   }


   return (
      <ContactFormContext>
         <form onSubmit={(e) => {
            handleSubmit(e);
         }}>
            <DoubleInput>
               <InputBase placeholder={value.inputName} type="name" />
               <InputBase placeholder={value.inputMail} type="mail" />
            </DoubleInput>
            <InputBase placeholder={value.inputSubject} type="subject" />
            <InputTextArea placeholder={value.inputTextArea} type="message" />
            <button
               onMouseEnter={handleMouseEnter}
               onMouseLeave={handleMouseLeave}
               type="submit"
               className={hover ? "active-animation" : "out-animation"}
               disabled={handleDisable()}
            >
               {value.button}
            </button>
         </form>
      </ContactFormContext>
   )
}