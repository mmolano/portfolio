import { useStateContext } from '@/context/AppContext';
import { DevType, ProjectIF, SlideIF } from '@/lib/interface/lang';
import React, { useEffect, useState } from 'react';
import Typewriter from 'typewriter-effect';
import { Cube } from './Cube';

export const Slide = () => {
   const { translation } = useStateContext();
   const [glitch, setGlitch] = useState<boolean>(false);
   const [projects, setProjects] = useState(translation.projects);
   const slideTitle = translation.slideTitle as SlideIF;
   const allProjects = translation.projects as ProjectIF[];
   const frontProjects = translation.projects.filter(project => project.type.includes("Front"));
   const backProjects = translation.projects.filter(project => project.type.includes("Back"));
   const wipProjects = translation.projects.filter(project => project.type.includes("WIP"));

   function changeProjects(value: any) {
      setProjects(value);
   }

   return (
      <>
         <section id="home" className="first-element">
            <h2 data-text={`${translation.title}`} className={glitch ? "glitch" : ''}>
               <Typewriter
                  options={{
                     delay: 50,
                  }}
                  onInit={(typewriter) => {
                     typewriter.typeString(`${translation.title}`)
                        .callFunction(() => {
                           setGlitch(true);
                        })
                        .start();
                  }}
               />
            </h2>
            <ul data-text={`
                  <li>&quot;title&quot; : &quot;Hi! Welcome&quot;</li>
                  <li>&quot;firstName&quot; : &quot;Miguel&quot;</li>
                  <li>&quot;name&quot; : &quot;Molano&quot;</li>
                  <li>&quot;type&quot; : &quot;Web Developer&quot;</li>
                  Error could not load HTML 
                  `} className={glitch ? "animate-in glitch" : 'animate-out'}>
               {'{'}
               {
                  Object.entries(slideTitle).map(([key, value]) => (
                     <li key={key}>&quot;{key}&quot; : &quot;{value}&quot;</li>
                  ))
               }
               {'}'}
            </ul>
            <div className="three-box-container">
               {/* TODO here component
               <Cube /> 
               */}
            </div>

            <div className="widget-scroll">
               <div className="widget-scroll-inside"></div>
            </div>
         </section>
         <section id="projects" className="second-element">
            <h2>{translation.projectSection.title}</h2>
            <p>{translation.projectSection.filter} : </p>
            <div className="projects-container">
               <div className="projects-filter">
                  <ul>
                     <li data-value={frontProjects.length}><button onClick={() => changeProjects(frontProjects)}>{translation.projectSection.front}</button></li>
                     <li data-value={backProjects.length}><button onClick={() => changeProjects(backProjects)}>{translation.projectSection.back}</button></li>
                     <li data-value={wipProjects.length}><button onClick={() => changeProjects(wipProjects)}>{translation.projectSection.working}</button></li>
                     <li data-value={allProjects.length}><button onClick={() => changeProjects(allProjects)}>{translation.projectSection.all}</button></li>
                  </ul>
               </div>
               <div className="row">
                  {
                     Object.entries(projects).map(([key, value]) => (
                        <div key={key} className="card">
                           <div className="project">
                           </div>
                           <h3>{value.title}</h3>
                        </div>
                     ))
                  }
               </div>
            </div>
         </section>
      </>
   )
}
