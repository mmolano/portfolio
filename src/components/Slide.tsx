import { useStateContext } from '@/context/AppContext';
import { SlideIF } from '@/lib/interface/lang';
import React, { useState } from 'react';
import Typewriter from 'typewriter-effect';
import { Cube } from './Cube';

export const Slide = () => {
   const [glitch, setGlitch] = useState<boolean>(false);
   const { translation } = useStateContext();
   const slideTitle = translation.slideTitle as SlideIF

   return (
      <>
         <section id="home" className="first-element">
            {/* TODO fix typewriter after translation change */}
            <h2 data-text="Hi! Welcome to my portfolio" className={glitch ? "glitch" : ''}>
               <Typewriter
                  options={{
                     delay: 50,
                  }}
                  onInit={(typewriter) => {
                     typewriter.typeString('Hi! Welcome to my portfolio')
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
                     <li>{translation.projectSection.front}</li>
                     <li>{translation.projectSection.back}</li>
                     <li>{translation.projectSection.working}</li>
                     <li>{translation.projectSection.all}</li>
                  </ul>
               </div>
               <div className="row">
                  {/* TODO add loop on json project */}
                  <div className="project">
                  </div>
                  <div className="project">
                  </div>
                  <div className="project">
                  </div>
                  <div className="project">
                  </div>
                  <div className="project">
                  </div>
               </div>
            </div>
         </section>
      </>
   )
}
