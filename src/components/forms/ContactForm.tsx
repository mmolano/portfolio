import { ContactSectionIF } from "@/lib/interface/lang"
import { InputBase } from "../inputs/InputBase"
import { InputTextArea } from "../inputs/InputTextArea"
import { FormEvent, useState } from "react"
import { DoubleInput } from "../inputs/DoubleInput"
import { useContactContext } from "@/context/ContactFormContext"
import axios from "axios"

export const ContactForm = ({ value }: { value: ContactSectionIF }) => {
   const [hover, setHover] = useState<boolean>(false);
   const { inputs, dispatch } = useContactContext()

   const name = inputs.name;
   const subject = inputs.subject;
   const email = inputs.mail;
   const message = inputs.message;

   const handleMouseEnter = () => {
      setTimeout(() => {
         setHover(true);
      }, 500)
   };

   const handleMouseLeave = () => setHover(false);

   function handleSubmit(e: FormEvent<HTMLFormElement>) {
      e.preventDefault();

      if (!inputs.name) {
         dispatch({
            type: 'set-error', value: 'Name is required', which: 'name'
         });
      }
      if (!inputs.subject) {
         dispatch({
            type: 'set-error', value: 'Subject is required', which: 'subject'
         });
      }
      if (!inputs.message) {
         dispatch({
            type: 'set-error', value: 'Message is required', which: 'message'
         });
      }
      if (!inputs.mail) {
         dispatch({
            type: 'set-error', value: 'Email is required', which: 'mail'
         });
      }

      const data = {
         name,
         subject,
         email,
         message
      };

      try {
         axios.post('/api/contact', {
            headers: {
               'Accept': 'application/json, text/plain, */*',
               'Content-Type': 'application/json'
            },
            data: data,
         })
      } catch {
         dispatch({
            type: 'set-error', payload: 'An error occurred while submitting the form.'
         })
      }

   }

   function handleDisable(): boolean {
      return !inputs.mail || !inputs.message || !inputs.subject || !inputs.name;
   }


   return (

      <form onSubmit={(e) => {
         handleSubmit(e);
      }}>
         <DoubleInput>
            <InputBase placeholder={value.inputName} type="name" />
            <InputBase placeholder={value.inputMail} type="mail" />
         </DoubleInput>
         <InputBase placeholder={value.inputSubject} type="subject" />
         <label htmlFor="message"></label>
         <InputTextArea placeholder={value.inputTextArea} type="message" />
         <button
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            type="submit"
            className={hover ? "active-animation" : "out-animation"}
         >
            {value.button}
         </button>
      </form>
   )
}