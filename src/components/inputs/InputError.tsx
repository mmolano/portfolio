import { useContactContext } from "@/context/ContactFormContext";
import { FormIF } from "@/lib/interface/contactContext";
import { ChangeEvent, useEffect, useMemo, useRef, useState } from "react";

export const InputError = ({ type }: { type: keyof Omit<FormIF, 'errors'> }) => {
   const { inputs } = useContactContext();
   const [lastError, setLastError] = useState<string>();
   const [errorDisplayed, setErrorDisplayed] = useState<boolean>(false);

   const errorText = useMemo(() => inputs.errors?.find(error => error.id === type)?.message, [inputs.errors, type]);
   const errorTextRef = useRef(errorText);

   useEffect(() => {
      if (errorTextRef.current !== errorText) {
         setErrorDisplayed?.(!!errorText);
         setLastError(errorTextRef.current);
         errorTextRef.current = errorText;
      }
   }, [errorText, setErrorDisplayed]);

   useEffect(() => {
      if (lastError && !errorText) {
         setTimeout(() => {
            setLastError('');
         }, 1000);
      }
   }, [lastError, errorText]);

   return (
      <>
         <span className={`input-error ${errorDisplayed ? "animate-in" : "animate-out"}`}>{errorTextRef.current}{lastError}</span>
      </>
   )
}