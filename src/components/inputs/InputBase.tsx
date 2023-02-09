export const InputBase = ({ placeholder }: { placeholder: string }) => {
   return (
      <>
         <input
            type="text"
            title="Please enter Alphabets."
            className="input-base"
            placeholder={placeholder}
            required
         />
      </>
   )
}