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
import { useEffect, useState } from 'react';
import { TailSpin } from 'react-loader-spinner';
import Custom404 from '../404';

export default function Project(): JSX.Element {
   const { translation } = useStateContext();
   const router = useRouter();
   const { slug } = router.query;
   const page = translation.projectPage as ProjectPageIF;
   const projects = translation.projects as ProjectIF[];
   const project = projects.find((project) => project.slug === slug);
   const [isLoading, setIsLoading] = useState<boolean>();
   const [date, setDate] = useState<string>("");

   const urlImage = `/images/projects/${slug}/home.png`;

   useEffect(() => {
      if (project) {
         const dateStart = new StringDate(project.date.start).fullDate;
         setDate(dateStart);
      }
   }, [slug, translation])

   useEffect(() => {
      const sectionProject = document.querySelector('section#project');
      setIsLoading(true);
      if (sectionProject?.classList.contains('animate')) {
         sectionProject.classList.remove('animate');
      }
      const timeOutID = setTimeout(() => {
         if (sectionProject) {
            sectionProject.classList.add('animate');
         }
      }, 200);

      const timeOutImageId = setTimeout(() => {
         setIsLoading(false);
      }, 1500);

      return () => {
         clearTimeout(timeOutID);
         clearTimeout(timeOutImageId);
      }
   }, [slug]);

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

   return (
      <>
         <Layout>
            <section id="project" className="first-element slug">
               <TitleStretch type="h1">{project.title}</TitleStretch>
               <div className="container">
                  <div className="breadcrumb">
                     <ul>
                        <li><LinkRef href="/">{page.breadHome}</LinkRef></li>
                        <li><LinkRef href={`/#projects`}>{page.breadroject}</LinkRef></li>
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
                     <div className="flex-between">
                        <div>
                           <Paragraphe className="bold">{page.companyName}</Paragraphe>
                           <Paragraphe>{project.company}</Paragraphe>
                        </div>
                        <div>
                           <Paragraphe className="bold">{page.dateString}</Paragraphe>
                           <Paragraphe>{date + ' - ' + project.date.end}</Paragraphe>
                        </div>
                        <div>
                           <Paragraphe className="bold">{page.linkString}</Paragraphe>
                           {
                              project.link ? <LinkRef isOutSite={true} target="_blank" rel="noreferrer" href={project.link}><span className="external-link">{project.link}</span></LinkRef> : <p>{page.noLink}</p>
                           }
                        </div>
                     </div>
                     <h4 className="section-title">{page.objective}</h4>
                     <Paragraphe>{project.description}</Paragraphe>
                     <h4 className="section-title">{page.realization}</h4>
                     <Paragraphe>{project.description}</Paragraphe>
                     {isLoading ? (
                        <TailSpin
                           height="80"
                           width="80"
                           color="#B191FF"
                           ariaLabel="tail-spin-loading"
                           radius="1"
                           wrapperStyle={{}}
                           wrapperClass=""
                           visible={true}
                        />
                     ) : <Image
                        className="project-image"
                        src={urlImage}
                        alt="project image"
                        fill
                     />}
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