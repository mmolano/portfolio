import React, { createContext, useContext, useState, useReducer } from 'react';
import { FormIF } from '@/lib/interface/contactContext';

const initialValues: FormIF = {
   name: '',
   subject: '',
   message: '',
   mail: '',
}

const ContactContext = createContext({
   tasks: initialValues,
   dispatch: (value: any) => { }
});

export const ContactFormContext = ({ children }: { children: React.ReactNode }) => {
   const [tasks, dispatch] = useReducer<React.Reducer<FormIF, any>>(
      inputReducer,
      initialValues
   );


   function inputReducer(state: any, action: { type: string; value: any; }) {
      switch (action.type) {
         case 'modify-name': {
            return { ...state, name: action.value };
         };
         case 'modify-subject': {
            return { ...state, subject: action.value };
         };
         case 'modify-message': {
            return { ...state, message: action.value };
         };
         case 'modify-mail': {
            return { ...state, mail: action.value };
         };
         default: {
            throw Error('Unknown action: ' + action.type);
         }
      }
   }

   return (
      <ContactContext.Provider value={{
         dispatch,
         tasks
      }}>
         {children}
      </ContactContext.Provider>
   )
}

export const useContactContext = () => useContext(ContactContext);