import { ContactContext, ErrorContactIF, FormIF } from '@/lib/interface/contactContext';
import React, { createContext, useContext, useReducer, useState } from 'react';

const initialValues: FormIF = {
   name: '',
   subject: '',
   message: '',
   mail: '',
   errors: [],
}

const ContactContext = createContext<ContactContext>({
   inputs: initialValues,
   dispatch: (value: any) => { },
});

export const ContactFormContext = ({ children }: { children: React.ReactNode }) => {
   const [inputs, dispatch] = useReducer<React.Reducer<FormIF, any>>(
      inputReducer,
      initialValues
   );

   function inputReducer(state: any, action: { type: string; value: any; which?: string }) {
      const { type, value, which } = action;

      switch (type) {
         case 'modify-name':
         case 'modify-subject':
         case 'modify-message':
         case 'modify-mail': {
            const id = type.split('-')[1];

            if (state.errors) {
               const updatedErrors = state.errors.filter((error: ErrorContactIF) => error.id !== id);
               return { ...state, [id]: value, errors: updatedErrors };
            }

            return { ...state, [id]: value };
         }
         case 'set-error': {
            if (state.errors && state.errors.some((error: ErrorContactIF) => error.id === which)) {
               return state;
            }

            const newError = { id: which, message: value };
            const errors = state.errors ? [...state.errors, newError] : [newError];
            return { ...state, errors };
         }
         case 'reset-all': {
            return { ...state, name: '', message: '', subject: '', mail: '', errors: [] };
         }
         default: {
            throw Error('Unknown action: ' + type);
         }
      }
   }

   return (
      <ContactContext.Provider value={{
         dispatch,
         inputs,
      }}>
         {children}
      </ContactContext.Provider>
   )
}

export const useContactContext = () => useContext(ContactContext);