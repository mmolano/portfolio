import { useContactContext } from "@/context/ContactFormContext"
import { FormIF } from "@/lib/interface/contactContext";

export const InputBase = ({ placeholder, type }: { placeholder: string, type: keyof Omit<FormIF, 'errors'> }) => {
   const { dispatch, inputs } = useContactContext();

   return (
      <>
         <input
            className="input-base"
            onChange={(e) => dispatch({
               type: `modify-${type}`,
               value: e.target.value
            })}
            type="text"
            value={inputs[type]}
            name={type}
            placeholder={placeholder}
         />
      </>
   )
}