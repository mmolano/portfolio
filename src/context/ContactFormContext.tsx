import React, { createContext, useContext, useState, useReducer } from 'react';
import { ErrorContactIF, FormIF } from '@/lib/interface/contactContext';



const initialValues: FormIF = {
   name: '',
   subject: '',
   message: '',
   mail: '',
   errors: [],
}

const ContactContext = createContext({
   inputs: initialValues,
   dispatch: (value: any) => { }
});

export const ContactFormContext = ({ children }: { children: React.ReactNode }) => {
   const [inputs, dispatch] = useReducer<React.Reducer<FormIF, any>>(
      inputReducer,
      initialValues
   );


   function inputReducer(state: any, action: { type: string; value: any; which?: string }) {
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
         case 'set-error': {
            if (state.errors && state.errors.some((error: ErrorContactIF) => error.id === action.which)) {
               return state;
            } else {
               return {
                  ...state,
                  errors: state.errors
                     ? [...state.errors, { id: action.which, message: action.value }]
                     : [{ id: action.which, message: action.value }]
               };
            }
         };
         default: {
            throw Error('Unknown action: ' + action.type);
         }
      }
   }

   return (
      <ContactContext.Provider value={{
         dispatch,
         inputs
      }}>
         {children}
      </ContactContext.Provider>
   )
}

export const useContactContext = () => useContext(ContactContext);