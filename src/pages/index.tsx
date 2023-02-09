import { ContactForm } from '@/components/forms/ContactForm';
import { Layout } from '@/components/layouts/Layout';
import { Products } from '@/components/Products';
import { useStateContext } from '@/context/AppContext';
import { ProjectIF, SlideIF } from '@/lib/interface/lang';
import React, { useState } from 'react';
import Typewriter from 'typewriter-effect';

export default function Home(): JSX.Element {
  const { translation, lang } = useStateContext();
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
      <Layout>
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
          <h4>{translation.projectSection.filter} : </h4>
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
                  <Products value={value} key={key} />
                ))
              }
            </div>
          </div>
        </section>

        <section id="contact" className="third-element">
          <h2>{translation.contactSection.title}</h2>
          <div className="container">
            <ContactForm value={translation.contactSection} />
            <div>
              <a href="mailto:miguel.molanopro@gmail.com">
                {translation.contactSection.mailMe}
              </a>
              <h4>{translation.contactSection.links} :</h4>
              <ul>
                {`<ul className="pizza-li">`}
                <li><a target="_blank" rel="noreferrer" href="https://github.com/mmolano">{`<li>`}GitHub{`</li>`}</a></li>
                <li><a target="_blank" rel="noreferrer" href={`https://www.linkedin.com/in/mimolano${lang !== 'fr' ? '/?locale=en_US' : ''}`}>{`<li>`}LinkedIn{`</li>`}</a></li>
                {`</ul>`}
              </ul>
            </div>
          </div>
        </section>
      </Layout>
    </>
  )
}
