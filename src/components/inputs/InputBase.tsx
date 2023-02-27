import { useContactContext } from "@/context/ContactFormContext";
import { FormIF } from "@/lib/interface/contactContext";
import { ChangeEvent } from "react";
import { InputError } from "./InputError";

export const InputBase = ({ placeholder, type }: { placeholder: string, type: keyof Omit<FormIF, 'errors'> }) => {
   const { dispatch, inputs } = useContactContext();
   
   function handleOnChangeDispatch(e: ChangeEvent<HTMLInputElement>) { 
      dispatch({
         type: `modify-${type}`,
         value: e.target.value
      });
   };
   
   return (
      <>
         <div className="flex-inputs">
            <InputError type={type} />
            <input
               className="input-base"
               onChange={(e) => handleOnChangeDispatch(e)}
               type="text"
               value={inputs[type]}
               name={type}
               placeholder={placeholder}
            />
         </div>
      </>
   )
}