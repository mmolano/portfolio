import { FormIF } from "@/lib/interface/contactContext"
import { useContactContext } from "@/context/ContactFormContext"

export const InputTextArea = ({ placeholder, type }: { placeholder: string, type: keyof FormIF }) => {
   const { dispatch, tasks } = useContactContext();
   
   return (
      <>
         <textarea
            className="input-textarea"
            onChange={(e) => dispatch({
               type: `modify-${type}`,
               value: e.target.value
            })}
            value={tasks[type]}
            placeholder={placeholder}
            required
         />
      </>
   )
}