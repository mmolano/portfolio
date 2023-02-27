import { Layout } from '@/components/layouts/Layout';
import { LinkRef } from '@/components/links/LinkRef';
import { useStateContext } from '@/context/AppContext';
import { ProjectIF, ProjectPageIF } from '@/lib/interface/lang';
import { useRouter } from 'next/router';


export default function Project(): JSX.Element {
   const { translation } = useStateContext();
   const router = useRouter();
   const { slug } = router.query;
   const page = translation.projectPage as ProjectPageIF;
   const projects = translation.projects as ProjectIF[];
   const project = translation.projects.find(project => project.slug === slug);

   if (!project) {
      // TODO: redirect to 404 page 
      return <div>Project not found</div>
   }

   const prevSlugHandler = () => {
      const prevProject = projects.find(prevProject => prevProject.id === project.id - 1);
      return prevProject ? prevProject.slug : null;
   };

   const nextSlugHandler = () => {
      const nextProject = projects.find(nextProject => nextProject.id === project.id + 1);
      return nextProject ? nextProject.slug : null;
   };

   return (
      <>
         <Layout>
            <section id="project" className="first-element animate">
               <h1>{project.title}</h1>
               <div className="breadcrumb">
                  <ul>
                     <li><LinkRef href="/">Home</LinkRef></li>
                     <li><LinkRef href={`/#projects`}>Projects</LinkRef></li>
                     <li><LinkRef href={`/project/${slug}`}>{project.title}</LinkRef></li>
                  </ul>
               </div>
               <div className="container">
                  <article>
                     <p>{project.description}</p>
                     <p>{page.start}: {project.date.start}</p>
                     <p>{page.end}: {project.date.end}</p>
                  </article>
               </div>
            </section>
            <footer>
               <ul>
                  <li>
                     {
                        prevSlugHandler() !== null ?
                           <LinkRef href={`/project/${prevSlugHandler()}`}>{`< `} {page.previous}</LinkRef>
                           :
                           ''
                     }
                  </li>
                  <li>
                     {
                        nextSlugHandler() !== null ?
                           <LinkRef href={`/project/${nextSlugHandler()}`}>{page.next} {` >`}</LinkRef>
                           :
                           ''
                     }
                  </li>
               </ul>
            </footer>
         </Layout>
      </>
   )
}