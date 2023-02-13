import { useContactContext } from "@/context/ContactFormContext"
import { useReducer } from "react";
import { FormIF } from "@/lib/interface/contactContext";

export const InputBase = ({ placeholder, type }: { placeholder: string, type: keyof FormIF }) => {
   const { dispatch, tasks } = useContactContext();

   return (
      <>
         <input
            type="text"
            title="Please enter Alphabets."
            onChange={(e) => dispatch({
               type: `modify-${type}`,
               value: e.target.value
            })}
            value={tasks[type]}
            className="input-base"
            placeholder={placeholder}
            required
         />
      </>
   )
}