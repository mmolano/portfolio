import { useContactContext } from "@/context/ContactFormContext";
import EmailAddress from "@/lib/helpers/Class/EmailAddress";
import { ContactSectionIF } from "@/lib/interface/lang";
import emailjs from '@emailjs/browser';
import { FormEvent, useState } from "react";
import { MainButton } from "../buttons/MainButton";
import { DoubleInput } from "../inputs/DoubleInput";
import { InputBase } from "../inputs/InputBase";
import { InputTextArea } from "../inputs/InputTextArea";
import { toast } from 'react-toastify';
import cleanedMessage from "@/lib/helpers/Html/sanitize";

export const ContactForm = ({ value }: { value: ContactSectionIF }) => {
   const { inputs, dispatch } = useContactContext();
   const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

   const { name, subject, mail, message, errors } = inputs;

   function validateEmail(email: string) {
      try {
         const verifyMail = new EmailAddress(email);

         return verifyMail.emailValue;
      } catch (error) {
         if (error instanceof Error) {
            return dispatch({
               type: 'set-error',
               value: error.message,
               which: 'mail'
            });
         } else {
            return dispatch({
               type: 'set-error',
               value: 'An error occurred while validating the email address',
               which: 'mail'
            });
         }
      }
   };


   function handleSubmit(e: FormEvent<HTMLFormElement>) {
      e.preventDefault();
      let errorCount = 0;

      if (!name) {
         errorCount++;
         dispatch({
            type: 'set-error', value: 'Name is required', which: 'name'
         });
      } else if (name.length <= 2 || name.trim().length <= 2) {
         errorCount++;
         dispatch({
            type: 'set-error', value: 'Name must be at least 2 letters', which: 'name'
         });
      }
      if (!subject) {
         errorCount++;
         dispatch({
            type: 'set-error', value: 'Subject is required', which: 'subject'
         });
      } else if (subject.length <= 5 || subject.trim().length <= 5) {
         errorCount++;
         dispatch({
            type: 'set-error', value: 'Subject is too short', which: 'subject'
         });
      }
      else if (subject.length > 70 || subject.trim().length > 70) {
         errorCount++;
         dispatch({
            type: 'set-error', value: 'Subject is too long', which: 'subject'
         });
      }
      if (!message) {
         errorCount++;
         dispatch({
            type: 'set-error', value: 'Message is required', which: 'message'
         });
      } else if (message.length <= 10 || message.trim().length <= 10) {
         errorCount++;
         dispatch({
            type: 'set-error', value: 'Your message is too short, message must be at least 10 letters', which: 'message'
         });
      }
      if (!mail) {
         errorCount++;
         dispatch({
            type: 'set-error', value: 'Email is required', which: 'mail'
         });
      }

      const verifiedMail = validateEmail(mail);

      if (errors && errors.length > 0 || !verifiedMail || errorCount > 0) {
         return;
      } else {
         setIsSubmitting(true);

         const data = {
            name: cleanedMessage(name),
            subject: cleanedMessage(subject),
            verifiedMail: cleanedMessage(verifiedMail),
            message: cleanedMessage(message),
         };

         const emailEnv = {
            service_id: process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
            template_id: process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
            public_key: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!,
         }

         const sendMail = emailjs.send(emailEnv.service_id, emailEnv.template_id, data, emailEnv.public_key);

         toast.promise(
            sendMail,
            {
               pending: 'Sending email ...',
               success: 'Your message has been sent ✅',
               error: 'An error has occurred, please send an email manually!'
            }
         )

         sendMail.then(() => {
            setIsSubmitting(false);
            console.info('%c Thank you for your message, an email has been sent successfully!',
               'background: #61e190; color: #ffff; border-radius: 3px; padding: 0.6rem;');
            return dispatch({ type: 'reset-all', value: '' });
         })
            .catch(() => {
               setIsSubmitting(false);
               return dispatch({ type: 'reset-all', value: '' });
            });
      }
   }


   function handleDisable(): boolean {
      return Object.values(inputs).some(value => !value) || isSubmitting;
   }

   function handleInputDisabled(): boolean {
      return isSubmitting;
   }

   return (
      <form onSubmit={(e) => {
         handleSubmit(e);
      }}>
         <DoubleInput>
            <InputBase disabled={handleInputDisabled()} placeholder={value.inputName} type="name" />
            <InputBase disabled={handleInputDisabled()} placeholder={value.inputMail} type="mail" />
         </DoubleInput>
         <InputBase disabled={handleInputDisabled()} placeholder={value.inputSubject} type="subject" />
         <InputTextArea disabled={handleInputDisabled()} placeholder={value.inputTextArea} type="message" />
         <MainButton
            type="submit"
            disabled={handleDisable()}
         >
            {isSubmitting ? value.submit : value.button}
         </MainButton>
      </form>
   )
}