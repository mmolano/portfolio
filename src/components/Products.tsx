import { ProjectIF } from "@/lib/interface/lang"

export const Products = ({ value, classValue }: { value: ProjectIF, classValue: string }) => {
   return (
      <>
         <div className={`card ${classValue}`}>
            <div className="project">
            </div>
            <h3>{value.title}</h3>
         </div>
      </>
   )
} 