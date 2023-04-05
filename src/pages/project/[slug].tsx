import { Paragraphe } from '@/components/article/Paragraphe';
import { Layout } from '@/components/layouts/Layout';
import { LinkRef } from '@/components/links/LinkRef';
import { LanguageTag } from '@/components/tags/LanguageTag';
import { TitleStretch } from '@/components/titles/TitleStretch';
import { useStateContext } from '@/context/AppContext';
import { capitalize } from '@/lib/helpers/capitalize';
import StringDate from '@/lib/helpers/Class/StringDate';
import { ProjectIF, ProjectPageIF } from '@/lib/interface/lang';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import Custom404 from '../404';

export default function Project(): JSX.Element {
   const { translation } = useStateContext();
   const router = useRouter();
   const { slug } = router.query;
   const page = translation.projectPage as ProjectPageIF;
   const projects = translation.projects as ProjectIF[];
   const project = translation.projects.find(project => project.slug === slug);

   const urlImage = `/images/projects/${slug}/home.png`;

   useEffect(() => {
      const sectionProject = document.querySelector('section#project');
      if (sectionProject?.classList.contains('animate')) {
         sectionProject.classList.remove('animate');
      }
      const timeOutID = setTimeout(() => {
         if (sectionProject) {
            sectionProject.classList.add('animate');
         }
      }, 200);

      return () => {
         clearTimeout(timeOutID);
      }
   }, [slug]);

   //TODO: on reload fix error 404 displaying loader should display first
   if (!project) {
      return <Custom404 />;
   }

   const prevSlugHandler = () => {
      const prevProject = projects.find(prevProject => prevProject.id === project.id - 1);
      return prevProject ? prevProject.slug : null;
   };

   const nextSlugHandler = () => {
      const nextProject = projects.find(nextProject => nextProject.id === project.id + 1);
      return nextProject ? nextProject.slug : null;
   };

   const dateStart = new StringDate(project.date.start).fullDate;

   return (
      <>
         <Layout>
            <section id="project" className="first-element slug">
               <TitleStretch type="h1">{project.title}</TitleStretch>
               <div className="container">
                  <div className="breadcrumb">
                     <ul>
                        <li><LinkRef href="/">Home</LinkRef></li>
                        <li><LinkRef href={`/#projects`}>Projects</LinkRef></li>
                        <li><LinkRef href={`/project/${slug}`}>{project.title}</LinkRef></li>
                     </ul>
                  </div>
                  <div className="tag-container">
                     {
                        project.tools.map((tool, index) => (
                           <LanguageTag key={index}>{capitalize(tool)}</LanguageTag>
                        ))
                     }
                  </div>
                  <article>
                     <Paragraphe>{project.description}</Paragraphe>
                     <Paragraphe>{page.start + ': ' + dateStart}</Paragraphe>
                     <Paragraphe>{page.end + ': ' + project.date.end}</Paragraphe>
                     {/* TODO: add loader when slug change to hide weird transition between images */}
                     <Image
                        className="project-image"
                        src={urlImage}
                        alt="project image"
                        layout="fill"
                     />
                  </article>
               </div>
            </section>
            <footer>
               <ul>
                  <li>
                     {
                        prevSlugHandler() !== null ?
                           <LinkRef href={`/project/${prevSlugHandler()}`}>{`< `} {page.previous}</LinkRef>
                           : ''
                     }
                  </li>
                  <li>
                     {
                        nextSlugHandler() !== null ?
                           <LinkRef href={`/project/${nextSlugHandler()}`}>{page.next} {` >`}</LinkRef>
                           : ''
                     }
                  </li>
               </ul>
            </footer>
         </Layout>
      </>
   )
}