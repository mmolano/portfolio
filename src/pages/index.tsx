import { ContactForm } from '@/components/forms/ContactForm';
import { Layout } from '@/components/layouts/Layout';
import { Products } from '@/components/Products';
import { Cube } from '@/components/three/Cube';
import { useStateContext } from '@/context/AppContext';
import { ContactFormContext } from '@/context/ContactFormContext';
import { ProjectIF, SlideIF } from '@/lib/interface/lang';
import React, { useCallback, useLayoutEffect, useRef, useState } from 'react';
import Typewriter from 'typewriter-effect';

export default function Home(): JSX.Element {
  const { translation, lang, projectsRef, contactRef, aboutRef } = useStateContext();

  const allProjects = translation.projects as ProjectIF[];
  const slideTitle = translation.slideTitle as SlideIF;

  const rowRef = useRef<HTMLDivElement>(null);

  const [glitch, setGlitch] = useState<boolean>(false);
  const [projects, setProjects] = useState(allProjects);
  const [newProject, setNewProject] = useState(allProjects);
  const [newHeight, setNewHeight] = useState<string | number>('100%');

  const frontProjects = allProjects.filter(project => project.type.includes("Front"));
  const backProjects = allProjects.filter(project => project.type.includes("Back"));
  const wipProjects = allProjects.filter(project => project.type.includes("WIP"));

  const calculateWidth = useCallback(() => {
    const elementWidth = 303;
    const elementHeight = 303;

    const rowWidth = rowRef.current!.offsetWidth;
    const elementsPerLine = Math.floor(rowWidth / elementWidth);

    const elementsCount = newProject.length;
    const linesCount = Math.ceil(elementsCount / elementsPerLine);

    const rowHeight = linesCount * elementHeight;
    setNewHeight(rowHeight);
  }, [newProject.length]);

  useLayoutEffect(() => {
    calculateWidth();
  }, [newProject, calculateWidth]);

  function changeProjects(value: ProjectIF[]) {
    setNewProject(value);
    calculateWidth();
    setTimeout(() => {
      setProjects(value);
    }, 1000)
  }

  return (
    <>
      <Layout>
        <section id="home" className="first-element">
          <h1 data-text={`${translation.title}`} className={glitch ? "glitch" : ''}>
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
          </h1>
          <ul data-text={`
                  <li>&quot;title&quot; : &quot;Hi! Welcome&quot;</li>
                  <li>&quot;firstName&quot; : &quot;Miguel&quot;</li>
                  <li>&quot;name&quot; : &quot;Molano&quot;</li>
                  <li>&quot;type&quot; : &quot;Web Developer&quot;</li>
                  Error could not load HTML 
                  `}
            className={glitch ? "animate-in glitch" : 'animate-out'}>
            <span>{'{'}</span>
            {
              Object.entries(slideTitle).map(([key, value]) => (
                <li key={key}>&quot;{key}&quot; : &quot;{value}&quot;</li>
              ))
            }
            <span>{'}'}</span>
          </ul>
          <div className="three-box-container">
            <Cube />
          </div>
          <div className="widget-scroll">
            <div className="widget-scroll-inside"></div>
          </div>
        </section>
        <section id="projects" ref={projectsRef} className="second-element">
          <h2>{translation.projectSection.title}</h2>
          <h4>{translation.projectSection.filter} : </h4>
          <div className="projects-container">
            <div className="projects-filter">
              <ul>
                <li data-value={frontProjects.length}>
                  <button onClick={() => {
                    changeProjects(frontProjects)
                  }
                  }><span>{translation.projectSection.front}</span></button>
                </li>
                <li data-value={backProjects.length}>
                  <button onClick={() => {
                    changeProjects(backProjects)
                  }
                  }><span>{translation.projectSection.back}</span></button>
                </li>
                <li data-value={wipProjects.length}>
                  <button onClick={() => {
                    changeProjects(wipProjects)
                  }
                  }><span>{translation.projectSection.working}</span></button>
                </li>
                <li data-value={allProjects.length}>
                  <button onClick={() => {
                    changeProjects(allProjects)
                  }
                  }><span>{translation.projectSection.all}</span></button>
                </li>
              </ul>
            </div>
            <div ref={rowRef} className="row" style={{ height: newHeight, transition: 'height 1.1s ease-in-out' }}>
              {
                Object.entries(projects).map(([key, value]) => (
                  <Products value={value} key={key} classValue={!newProject.includes(value) ? 'product-exit' : 'product-enter'} />
                ))
              }
            </div>
          </div>
        </section>
        <section id="contact" ref={contactRef} className="third-element">
          <h2>{translation.contactSection.title}</h2>
          <div className="container">
            <ContactFormContext>
              <ContactForm value={translation.contactSection} />
            </ContactFormContext>
            <div className="contact-right-container">
              <ul>
                <span>{`<a href="mailto:miguel.molanopro@gmail.com">`}</span>
                <li>
                  <a href="mailto:miguel.molanopro@gmail.com">
                    <b>{translation.contactSection.mailMe}</b>
                  </a>
                </li>
                <span>{`<a/>`}</span>
              </ul>
              <h4>{translation.contactSection.links} :</h4>
              <ul className="contact-ul-pizza">
                <span>{`<ul className="pizza-li">`}</span>
                <li>
                  <a target="_blank" rel="noreferrer" href="https://github.com/mmolano">{`<li>`}<b>GitHub</b>{`</li>`}</a>
                </li>
                <li>
                  <a target="_blank" rel="noreferrer" href={`https://www.linkedin.com/in/mimolano${lang !== 'fr' ? '/?locale=en_US' : ''}`}>{`<li>`}<b>LinkedIn</b>{`</li>`}</a>
                </li>
                <span>{`</ul>`}</span>
              </ul>
            </div>
          </div>
        </section>
        <section id="about" ref={aboutRef} className="fourth-element">
          <h2>{translation.aboutSection.title}</h2>
          <div className="container">
            <div className="split-width">
              <p>{translation.aboutSection.content}</p>
              <span>Let’s make pizzas together!</span>
            </div>
            <div className="three-box-container">
              {/* TODO */}
            </div>
          </div>
        </section>
      </Layout>
    </>
  )
}
