export const InputTextArea = ({ placeholder }: { placeholder: string }) => {
   return (
      <>
         <textarea
            className="input-textarea"
            placeholder={placeholder}
         />
      </>
   )
}