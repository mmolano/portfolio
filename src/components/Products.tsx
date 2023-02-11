import { ProjectIF } from "@/lib/interface/lang"

export const Products = ({ value }: { value: ProjectIF }) => {
   return (
      <>
         <div className="card">
            <div className="project">
            </div>
            <h3>{value.title}</h3>
         </div>
      </>
   )
} 