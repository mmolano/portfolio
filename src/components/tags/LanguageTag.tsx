type propsType = {
   children: React.ReactNode
}

export const LanguageTag = ({ children }: propsType) => {
   return (
      <>
         <div className="tag-element">
            {children}
         </div>
      </>
   )
}