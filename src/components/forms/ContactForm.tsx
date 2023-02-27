import { useContactContext } from "@/context/ContactFormContext"
import EmailAddress from "@/lib/helpers/Class/EmailAddress"
import { ContactSectionIF } from "@/lib/interface/lang"
import axios from "axios"
import { FormEvent, useState } from "react"
import { MainButton } from "../buttons/MainButton"
import { DoubleInput } from "../inputs/DoubleInput"
import { InputBase } from "../inputs/InputBase"
import { InputTextArea } from "../inputs/InputTextArea"

export const ContactForm = ({ value }: { value: ContactSectionIF }) => {
   const { inputs, dispatch } = useContactContext();

   const { name, subject, mail, message, errors } = inputs;

   async function handleSubmit(e: FormEvent<HTMLFormElement>) {
      e.preventDefault();

      if (!name) {
         dispatch({
            type: 'set-error', value: 'Name is required', which: 'name'
         });
      } else if (name.length <= 2) {
         dispatch({
            type: 'set-error', value: 'Name must be at least 2 letters', which: 'name'
         });
      }
      if (!subject) {
         dispatch({
            type: 'set-error', value: 'Subject is required', which: 'subject'
         });
      } else if (subject.length <= 2) {
         dispatch({
            type: 'set-error', value: 'Subject is too short', which: 'subject'
         });
      }
      if (!message) {
         dispatch({
            type: 'set-error', value: 'Message is required', which: 'message'
         });
      } else if (message.length <= 10) {
         dispatch({
            type: 'set-error', value: 'Your message is too short, message must be at least 10 letters', which: 'message'
         });
      }
      if (!mail) {
         dispatch({
            type: 'set-error', value: 'Email is required', which: 'mail'
         });
      }

      if (inputs.errors && inputs.errors.length > 0) return;

      try {
         const verifyMail = new EmailAddress(mail)
         const verifiedMail = verifyMail.emailValue;
         const data = {
            name,
            subject,
            verifiedMail,
            message
         };

         await axios({
            headers: { 'Content-Type': 'application/json' },
            method: 'post',
            url: '/api/contact/sendMail',
            data: JSON.stringify(data)
         })
            .then(res => {
               dispatch({ type: 'reset-all' });
               console.log(res, 'nop');
            })
            .catch(error => {
               dispatch({ type: 'reset-all' });
               console.log(error, 'hi');
            });
      } catch (error) {
         if (error instanceof Error) {
            dispatch({
               type: 'set-error',
               value: error.message,
               which: 'mail'
            });
            return;
         } else {
            dispatch({
               type: 'set-error',
               value: 'An error occurred while validating the email address',
               which: 'mail'
            });
            return;
         }
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
         <InputTextArea placeholder={value.inputTextArea} type="message" />
         <MainButton
            type="submit"
         >
            {value.button}
         </MainButton>
      </form>
   )
}