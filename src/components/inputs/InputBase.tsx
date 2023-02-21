import { useContactContext } from "@/context/ContactFormContext"
import { FormIF } from "@/lib/interface/contactContext";
import { ChangeEvent, useCallback, useEffect, useMemo, useRef, useState } from "react";

export const InputBase = ({ placeholder, type }: { placeholder: string, type: keyof Omit<FormIF, 'errors'> }) => {
   const { dispatch, inputs } = useContactContext();
   const [errorDisplayed, setErrorDisplayed] = useState(false);
   const [lastError, setLastError] = useState<string>();

   const errorText = useMemo(() => inputs.errors?.find(error => error.id === type)?.message, [inputs.errors, type]);
   const errorTextRef = useRef(errorText);


   useEffect(() => {
      if (errorTextRef.current !== errorText) {
         setErrorDisplayed(!!errorText);
         setLastError(errorTextRef.current);
         errorTextRef.current = errorText;
      }
   }, [errorText]);

   useEffect(() => {
      if (lastError && !errorText) {
         setTimeout(() => {
            setLastError('');
         }, 1000);
      }
   }, [lastError, errorText]);

   const handleOnChangeDispatch = useCallback((e: ChangeEvent<HTMLInputElement>) => {
      if (errorDisplayed) {
         setTimeout(() => {
            setErrorDisplayed(false);
         }, 1000);
      }

      dispatch({
         type: `modify-${type}`,
         value: e.target.value
      });
   }, [dispatch, errorDisplayed, type]);

   return (
      <>
         <div className="flex-inputs">
            <span className={`input-error ${errorDisplayed ? "animate-in" : "animate-out"}`}>{errorTextRef.current}{lastError}</span>
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