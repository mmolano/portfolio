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
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

export default function Project(): JSX.Element {
   const { translation } = useStateContext();
   const router = useRouter();
   const { slug } = router.query;
   const page = translation.projectPage as ProjectPageIF;
   const projects = translation.projects as ProjectIF[];
   const project = projects.find((project) => project.slug === slug);
   const [isLoading, setIsLoading] = useState<boolean>();
   const [date, setDate] = useState<string>("");
   const [images, setImages] = useState<Array<string>>([]);

   function getImageForValue(slug: string | string[]): string[] {
      switch (true) {
         case slug.includes('fidensio-partners'):
            return ['1.jpg'];
         case slug.includes('fidensio-api'):
            return ['1.jpg', '2.jpg'];
         case slug.includes('fidensio-nuxt'):
            return ['1.jpg', '2.jpg', '3.jpg', '4.jpg'];
         case slug.includes('fidensio-migration'):
            return ['1.jpg', '2.jpg', '3.jpg'];
         case slug.includes('recipe-api-laravel'):
            return ['1.jpg'];
         case slug.includes('e-commerce-react'):
            return ['1.jpg', '2.jpg', '3.jpg'];
         case slug.includes('swedish-fit'):
            return ['1.jpg', '2.jpg'];
         case slug.includes('ghibli-nuxt'):
            return ['1.jpg', '2.jpg', '3.jpg', '4.jpg'];
         default:
            return ['1.jpg'];
      }
   }

   useEffect(() => {
      if (project) {
         const dateStart = new StringDate(project.date.start, translation.actualLang.lang).fullDate;
         setDate(dateStart!);
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

      if (slug) {
         setImages(getImageForValue(slug));
      }

      return () => {
         clearTimeout(timeOutID);
         clearTimeout(timeOutImageId);
      }
   }, [slug]);

   const prevSlugHandler = () => {
      const prevProject = projects.find(prevProject => prevProject.id === project!.id - 1);
      return prevProject ? prevProject.slug : null;
   };

   const nextSlugHandler = () => {
      const nextProject = projects.find(nextProject => nextProject.id === project!.id + 1);
      return nextProject ? nextProject.slug : null;
   };

   return (
      <>

         <Layout>
            {
               !project ? <Custom404 />
                  :
                  <>
                     <section id="project" className="first-element slug">
                        <TitleStretch type="h1">{project.title}</TitleStretch>
                        <div className="container">
                           <div className="breadcrumb">
                              <ul>
                                 <li><LinkRef href="/">{page.breadHome}</LinkRef></li>
                                 <li><LinkRef href={`/#projects`}>{page.breadProject}</LinkRef></li>
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
                                    <Paragraphe>{date + ' - ' + project.date.end.replace(/-/g, '/')}</Paragraphe>
                                 </div>
                                 <div>
                                    <Paragraphe className="bold">{page.linkString}</Paragraphe>
                                    {
                                       project.link ? <LinkRef isOutSite={true} target="_blank" rel="noreferrer" href={project.link}><span className="external-link">{project.link}</span></LinkRef> : <p>{page.noLink}</p>
                                    }
                                 </div>
                              </div>
                              {/* TODO: add every text in json */}
                              <h4 className="section-title">{page.objective}</h4>
                              {project.objective ?
                                 <>
                                    <Paragraphe>{project.objective}</Paragraphe>
                                 </>
                                 : page.translate}
                              <h4 className="section-title">{page.realization}</h4>
                              {project.description ?
                                 <Paragraphe>{project.description}</Paragraphe>
                                 : page.translate}
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
                              ) :
                                 <Swiper
                                    direction={'vertical'}
                                    slidesPerView={1}
                                    spaceBetween={30}
                                    pagination={{
                                       clickable: true,
                                    }}
                                    navigation={true}
                                    modules={[Pagination, Navigation]}
                                    className="mySwiper"
                                 >
                                    {images.filter(Boolean).map((imageName, index) => (
                                       <SwiperSlide
                                          key={index}
                                       >
                                          <Image
                                             key={index}
                                             className="project-image"
                                             src={`/images/projects/${slug}/${imageName}`}
                                             alt="project image"
                                             fill
                                          />
                                       </SwiperSlide>
                                    ))}
                                 </Swiper>
                              }
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
                  </>

            }
         </Layout>
      </>
   )
}