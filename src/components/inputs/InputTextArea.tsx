import { FormIF } from "@/lib/interface/contactContext"
import { useContactContext } from "@/context/ContactFormContext"
import { ChangeEvent } from "react";
import { InputError } from "./InputError";

export const InputTextArea = ({ placeholder, type, disabled }: { placeholder: string, type: keyof Omit<FormIF, 'errors'>, disabled?: boolean }) => {
   const { dispatch, inputs } = useContactContext();

   function handleOnChangeDispatch(e: ChangeEvent<HTMLTextAreaElement>) {
      dispatch({
         type: `modify-${type}`,
         value: e.target.value
      });
   };

   return (
      <>
         <div className="flex-inputs">
            <InputError type={type} />
            <textarea
               className="input-textarea"
               onChange={(e) => handleOnChangeDispatch(e)}
               name={type}
               value={inputs[type]}
               placeholder={placeholder}
               disabled={disabled}
            />
         </div>
      </>
   )
}