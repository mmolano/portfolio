import { Layout } from '@/components/layouts/Layout';
import { LinkRef } from '@/components/links/LinkRef';
import { useStateContext } from '@/context/AppContext';
import StringDate from '@/lib/helpers/Class/StringDate';
import { ProjectIF, ProjectPageIF } from '@/lib/interface/lang';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function Project(): JSX.Element {
   const { translation } = useStateContext();
   const router = useRouter();
   const { slug } = router.query;
   const page = translation.projectPage as ProjectPageIF;
   const projects = translation.projects as ProjectIF[];
   const project = translation.projects.find(project => project.slug === slug);

   useEffect(() => {
      const sectionProject = document.querySelector('section#project');
      if (sectionProject?.classList.contains('animate')) {
         sectionProject.classList.remove('animate');
      }
      setTimeout(() => {
         if (sectionProject) {
            sectionProject.classList.add('animate');
         }
      }, 100);
   }, [slug]);

   if (!project) {
      router.push('/404');
   }

   const prevSlugHandler = () => {
      const prevProject = projects.find(prevProject => prevProject.id === project!.id - 1);
      return prevProject ? prevProject.slug : null;
   };

   const nextSlugHandler = () => {
      const nextProject = projects.find(nextProject => nextProject.id === project!.id + 1);
      return nextProject ? nextProject.slug : null;
   };

   const dateStart = new StringDate(project!.date.start).fullDate;

   return (
      <>
         <Layout>
            <section id="project" className="first-element">
               <h1>{project!.title}</h1>
               <div className="breadcrumb">
                  <ul>
                     <li><LinkRef href="/">Home</LinkRef></li>
                     <li><LinkRef href={`/#projects`}>Projects</LinkRef></li>
                     <li><LinkRef href={`/project/${slug}`}>{project!.title}</LinkRef></li>
                  </ul>
               </div>
               <div className="container">
                  <article>
                     <p>{project!.description}</p>
                     <p>{page.start}: {dateStart}</p>
                     <p>{page.end}: {project!.date.end}</p>
                  </article>
               </div>
            </section>
            <footer>
               <ul>
                  <li>
                     {
                        prevSlugHandler() !== null ??
                        <LinkRef href={`/project/${prevSlugHandler()}`}>{`< `} {page.previous}</LinkRef>
                     }
                  </li>
                  <li>
                     {
                        nextSlugHandler() !== null ??
                        <LinkRef href={`/project/${nextSlugHandler()}`}>{page.next} {` >`}</LinkRef>
                     }
                  </li>
               </ul>
            </footer>
         </Layout>
      </>
   )
}