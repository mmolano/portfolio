import React, { useCallback, useEffect, useRef, useState } from 'react';
import Typewriter, { TypewriterClass } from 'typewriter-effect';

import { Button } from '@/components/buttons/Button';
import { ContactForm } from '@/components/forms/ContactForm';
import { Layout } from '@/components/layouts/Layout';
import { LinkRef } from '@/components/links/LinkRef';
import { Project } from '@/components/Project';
import { useStateContext } from '@/context/AppContext';
import { ContactFormContext } from '@/context/ContactFormContext';
import { ProjectIF, SlideIF, ProjectSectionIF, ContactSectionIF, AboutSectionIF } from '@/lib/interface/lang';
import { H2Stretch } from '@/components/titles/H2Stretch';
import { WaveCube } from '@/components/three/WaveCube';
import { Eve } from '@/components/spline/Eve';

type allowedFilters = 'all' | 'wip' | 'front' | 'back';

type newProjectType = {
  projects: ProjectIF[],
  filter: allowedFilters
}

export default function Home(): JSX.Element {
  const { translation, lang, projectsRef, contactRef, aboutRef } = useStateContext();

  const allProjects = translation.projects as ProjectIF[];
  const {scroll, ...slideTitle} = translation.slideTitle as SlideIF;
  const projectSection = translation.projectSection as ProjectSectionIF;
  const contactSection = translation.contactSection as ContactSectionIF;
  const aboutSection = translation.aboutSection as AboutSectionIF;

  const rowRef = useRef<HTMLDivElement>(null);

  const [glitch, setGlitch] = useState<boolean>(false);
  const [projects, setProjects] = useState(allProjects);
  const [newProject, setNewProject] = useState<newProjectType>({ projects: allProjects, filter: 'all' });
  const [newHeight, setNewHeight] = useState<string | number>('100%');
  const [activeFilter, setActiveFilter] = useState<allowedFilters>('all');
  const [typewriterInstance, setTypewriterInstance] = useState<TypewriterClass | null>(null);

  const frontProjects = allProjects.filter(project => project.type.includes("Front")) ?? null;
  const backProjects = allProjects.filter(project => project.type.includes("Back")) ?? null;
  const wipProjects = allProjects.filter(project => project.type.includes("WIP")) ?? null;

  const calculateWidth = useCallback(() => {
    const rowWidth = rowRef.current!.offsetWidth;
    let elementWidth = 303;
    let elementHeight = 303;

    if (rowWidth < elementWidth) {
      elementWidth = 250;
    }

    const elementsPerLine = Math.floor(rowWidth / elementWidth);
    const elementsCount = newProject.projects.length;
    const linesCount = Math.ceil(elementsCount / elementsPerLine);
    const rowHeight = linesCount * elementHeight;

    setNewHeight(`${rowHeight}px`);
  }, [newProject.projects.length]);

  useEffect(() => {
    calculateWidth();
  }, [newProject, calculateWidth]);

  useEffect(() => {
    function handleResize() {
      calculateWidth();
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [calculateWidth]);

  const changeProjects = useCallback((value: ProjectIF[], type: allowedFilters) => {
    setNewProject({ projects: value, filter: type });
    calculateWidth();
    setActiveFilter(type);
    setTimeout(() => {
      setProjects(value);
    }, 1000);
  }, [calculateWidth]);

  const handleTypewriterInit = useCallback((typewriter: TypewriterClass) => {
    typewriter
      .typeString(translation.title)
      .callFunction(() => {
        setGlitch(true);
      })
      .start();
    setTypewriterInstance(typewriter);
  }, [translation]);

  useEffect(() => {
    if (typewriterInstance) {
      typewriterInstance.deleteAll().typeString(translation.title).start();
    }
    setProjects(allProjects);
    setNewProject({ projects: allProjects, filter: 'all' });
    setActiveFilter('all');
  }, [translation]);

  return (
    <>
      <Layout>
        <section id="home" className="first-element animate three-element">
          <h1 data-text={`${translation.title}`} className={glitch ? "glitch" : ''}>
            <Typewriter
              options={{ delay: 90 }}
              onInit={handleTypewriterInit}
            />
          </h1>
          <ul className={`glitch ${glitch ? "animate-in" : "animate-out"}`}
            data-text=
            {`
              <li>&quot;title&quot; : &quot;Hi! Welcome&quot;</li>
              <li>&quot;firstName&quot; : &quot;Miguel&quot;</li>
              <li>&quot;name&quot; : &quot;Molano&quot;</li>
              <li>&quot;type&quot; : &quot;Web Developer&quot;</li>
              Error could not load HTML 
            `}
          >
            <span>{'{'}</span>
            {
              Object.entries(slideTitle).map(([key, value]) => (
                <li key={key}>&quot;{key}&quot; : &quot;{value}&quot;</li>
              ))
            }
            <span>{'}'}</span>
          </ul>
          <div className="three-box-container">
            <WaveCube />
          </div>
          <div className="widget-scroll">
            <div className="widget-scroll-inside"></div>
          </div>
        </section>
        <h5 className="scroll-reveal-text">
          {translation.slideTitle.scroll.toUpperCase()}
        </h5>
        <section id="projects" ref={projectsRef} className="second-element">
          <H2Stretch>{projectSection.title}</H2Stretch>
          <h4>{projectSection.filter} : </h4>
          <div className="projects-container">
            <div className="projects-filter">
              <ul>
                <li data-value={frontProjects.length}>
                  <Button onClick={() => {
                    changeProjects(frontProjects, 'front')
                  }
                  }><span className={activeFilter === "front" ? 'active' : ''}>{projectSection.front}</span></Button>
                </li>
                <li data-value={backProjects.length}>
                  <Button onClick={() => {
                    changeProjects(backProjects, 'back')
                  }
                  }><span className={activeFilter === "back" ? 'active' : ''}>{projectSection.back}</span></Button>
                </li>
                <li data-value={wipProjects.length}>
                  <Button onClick={() => {
                    changeProjects(wipProjects, 'wip')
                  }
                  }><span className={activeFilter === "wip" ? 'active' : ''}>{projectSection.working}</span></Button>
                </li>
                <li data-value={allProjects.length}>
                  <Button onClick={() => {
                    changeProjects(allProjects, 'all')
                  }
                  }><span className={activeFilter === "all" ? 'active' : ''}>{projectSection.all}</span></Button>
                </li>
              </ul>
            </div>
            <div ref={rowRef} className="row" style={{ height: newHeight, transition: 'height 1.1s ease-in-out' }}>
              {
                Object.entries(projects).map(([key, value]) => (
                  <Project value={value} key={key} classValue={!newProject.projects.includes(value) ? 'product-exit' : 'product-enter'} />
                ))
              }
            </div>
          </div>
        </section>
        <section id="contact" ref={contactRef} className="third-element">
          <H2Stretch>{contactSection.title}</H2Stretch>
          <div className="container">
            <ContactFormContext>
              <ContactForm value={contactSection} />
            </ContactFormContext>
            <div className="contact-right-container">
              <ul>
                <span>{`<a href="mailto:miguel.molanopro@gmail.com">`}</span>
                <li>
                  <LinkRef isOutSite={true} href="mailto:miguel.molanopro@gmail.com">
                    <b>{contactSection.mailMe}</b>
                  </LinkRef>
                </li>
                <span>{`<a/>`}</span>
              </ul>
              <h4>{contactSection.links} :</h4>
              <ul className="contact-ul-pizza">
                <span>{`<ul className="pizza-li">`}</span>
                <li>
                  <LinkRef target="_blank" rel="noreferrer" href="https://github.com/mmolano">{`<li>`}<b>GitHub</b>{`</li>`}</LinkRef>
                </li>
                <li>
                  <LinkRef target="_blank" rel="noreferrer" href={`https://www.linkedin.com/in/mimolano${lang !== 'fr' ? '/?locale=en_US' : ''}`}>{`<li>`}<b>LinkedIn</b>{`</li>`}</LinkRef>
                </li>
                <span>{`</ul>`}</span>
              </ul>
            </div>
          </div>
        </section>
        <section id="about" ref={aboutRef} className="fourth-element">
          <H2Stretch>{aboutSection.title}</H2Stretch>
          <div className="container">
            <div className="split-width">
              <p>{aboutSection.content}</p>
              <p><LinkRef scroll={false} href={'#contact'}><span className="span-color">Let’s talk!</span></LinkRef></p>
            </div>
            <div className="three-box-container-2">
              <Eve />
            </div>
          </div>
        </section>
      </Layout>
    </>
  )
}
