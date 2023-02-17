import { useContactContext } from "@/context/ContactFormContext"
import { ContactSectionIF } from "@/lib/interface/lang"
import axios from "axios"
import { FormEvent, useState } from "react"
import { FormButton } from "../buttons/FormButton"
import { DoubleInput } from "../inputs/DoubleInput"
import { InputBase } from "../inputs/InputBase"
import { InputTextArea } from "../inputs/InputTextArea"

export const ContactForm = ({ value }: { value: ContactSectionIF }) => {
   const [hoverAnimation, setHoverAnimation] = useState<boolean>(false);
   const { inputs, dispatch } = useContactContext()

   const name = inputs.name;
   const subject = inputs.subject;
   const email = inputs.mail;
   const message = inputs.message;

   const handleMouseEnter = () => {
      setTimeout(() => {
         setHoverAnimation(true);
      }, 500)
   };

   const handleMouseLeave = () => setHoverAnimation(false);

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
         <FormButton
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            type="submit"
            className={hoverAnimation ? "active-animation" : "out-animation"}
         >
            {value.button}
         </FormButton>
      </form>
   )
}