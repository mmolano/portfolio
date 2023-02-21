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
   const { inputs, dispatch } = useContactContext()

   const name = inputs.name;
   const subject = inputs.subject;
   const email = inputs.mail;
   const message = inputs.message;

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

      try {
         const verifyMail = new EmailAddress(inputs.mail)
         const verifiedMail = verifyMail.emailValue;
         const data = {
            name,
            subject,
            verifiedMail,
            message
         };
      } catch (error) {
         if (error instanceof Error) {
            dispatch({
               type: 'set-error',
               value: error.message,
               which: 'mail'
            });
         } else {
            dispatch({
               type: 'set-error',
               value: 'An error occurred while validating the email address',
               which: 'mail'
            });
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