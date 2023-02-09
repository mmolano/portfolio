import { ProjectIF } from "@/lib/interface/lang"

const Products = ({ value }: { value: ProjectIF }) => {
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

export default Products