import { FormIF } from "@/lib/interface/contactContext"
import { useContactContext } from "@/context/ContactFormContext"

export const InputTextArea = ({ placeholder, type }: { placeholder: string, type: keyof Omit<FormIF, 'errors'> }) => {
   const { dispatch, inputs } = useContactContext();
   
   return (
      <>
         <textarea
            className="input-textarea"
            onChange={(e) => dispatch({
               type: `modify-${type}`,
               value: e.target.value
            })}
            name={type}
            value={inputs[type]}
            placeholder={placeholder}
         />
      </>
   )
}