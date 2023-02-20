import { useStateContext } from '@/context/AppContext';
import { Lang } from '@/lib/interface/context';
import Link from 'next/link';
import { useState, useEffect, useCallback, useRef } from 'react';
import { Button } from '../buttons/Button';
import { LinkRef } from '../links/LinkRef';

export const LayoutHeader = (): JSX.Element => {
   const { showNav, setShowNav, lang, translation, changeLanguage, projectsRef, contactRef, aboutRef } = useStateContext();
   const [activeSection, setActiveSection] = useState<string>('');
   const [isAnimating, setIsAnimating] = useState<boolean>(false);
   const mobileRef = useRef<HTMLDivElement>(null);
   const closerRef = useRef<HTMLDivElement>(null);


   function changeLang(language: Lang): void {
      //TODO: put Loader
      changeLanguage?.(language);
      window.location.reload()
   }

   const handleScroll = useCallback(() => {
      const projectsPosition = projectsRef?.current?.getBoundingClientRect().top;
      const contactPosition = contactRef?.current?.getBoundingClientRect().top;
      const aboutPosition = aboutRef?.current?.getBoundingClientRect().top;

      if (projectsPosition! < 100 && contactPosition! > 1) {
         setActiveSection('projects');
         projectsRef?.current?.classList.add('animate');
      } else if (contactPosition! < 1 && aboutPosition! > 1) {
         setActiveSection('contact');
         contactRef?.current?.classList.add('animate');
      } else if (aboutPosition! < 1) {
         setActiveSection('about');
         aboutRef?.current?.classList.add('animate');
      } else {
         setActiveSection('');
      }
   }, [projectsRef, contactRef, aboutRef]);

   const toggleNav = useCallback(() => {
      if (isAnimating) {
         return;
      }
      const body = document.querySelector('body');
      body?.classList.toggle('no-scroll');
      mobileRef.current?.classList.toggle('close-nav');
      closerRef.current?.classList.toggle('close-toggler');

      if (!showNav) {
         setShowNav?.(true);
      } else {
         setIsAnimating(true);
         setTimeout(() => {
            setShowNav?.(false);
            setIsAnimating(false);
         }, 2000);
      }
   }, [isAnimating, setShowNav, showNav]);

   useEffect(() => {
      window.addEventListener('scroll', handleScroll);
   }, [handleScroll]);

   return (
      <>
         <nav>
            <div className="navigator">
               <div className="nav-title">
                  <LinkRef scroll={false} href={'/#home'}>
                     <h2>Miguel<span className="nav-animate-title">.</span>Dev<span className="nav-animate-title"> _</span></h2>
                  </LinkRef>
               </div>
               <div className="row">
                  <ul className="nav-list">
                     <li className={`nav-selector ${activeSection === 'projects' ? 'active' : ''} `}><span data-value="01" className={activeSection === 'projects' ? 'active' : ''}>01</span>{`//`} <LinkRef scroll={false} href="/#projects">{translation.nav.projects}</LinkRef></li>
                     <li className={`nav-selector ${activeSection === 'contact' ? 'active' : ''}`}><span data-value="02" className={activeSection === 'contact' ? 'active' : ''}>02</span>{`//`} <LinkRef scroll={false} href="/#contact">{translation.nav.contact}</LinkRef></li>
                     <li className={`nav-selector ${activeSection === 'about' ? 'active' : ''}`}><span data-value="03" className={activeSection === 'about' ? 'active' : ''}>03</span>{`//`} <LinkRef scroll={false} href="/#about">{translation.nav.about}</LinkRef></li>
                  </ul>
                  <div className="nav-lang-selector">
                     <p>Lang: {`{`}</p>
                     <div>
                        <Button onClick={() => lang !== 'fr' ? changeLang('fr') : ''}>{translation.lang.fr}</Button>
                     </div>
                     <span>|</span>
                     <div>
                        <Button onClick={() => lang !== 'en' ? changeLang('en') : ''}>{translation.lang.en}</Button>
                     </div>
                     <p>{`}`}</p>
                  </div>
               </div>
            </div>

            <div onClick={() => toggleNav()} className={`burger ${showNav ? 'is-toggled' : ''}`} >
               <div className="toggle-nav">
                  <span className="toggle-style one"></span>
                  <span className="toggle-style two"></span>
                  <span className="toggle-style three"></span>
                  <span className="toggle-style four"></span>
                  <span className="toggle-style five"></span>
                  <span className="toggle-style six"></span>
                  <span className="toggle-style seven"></span>
                  <span className="toggle-style eight"></span>
                  <span className="toggle-style nine"></span>
                  <div ref={closerRef} className="toggle-close-style">
                     <span></span>
                     <span></span>
                  </div>
               </div>
            </div>
            {
               showNav && (
                  <div ref={mobileRef} className="mobile-nav">
                     <div className="row">
                        <ul className="nav-list">
                           <li className="nav-selector"><LinkRef onClick={() => toggleNav()} scroll={false} href="/#projects">{`//`} {translation.nav.projects}</LinkRef></li>
                           <li className="nav-selector"><LinkRef onClick={() => toggleNav()} scroll={false} href="/#contact">{`//`} {translation.nav.contact}</LinkRef></li>
                           <li className="nav-selector"><LinkRef onClick={() => toggleNav()} scroll={false} href="/#about">{`//`} {translation.nav.about}</LinkRef></li>
                        </ul>
                        <div className="nav-lang-selector">
                           <span>Lang: {`{`}</span>
                           <Button onClick={() => lang !== 'fr' ? changeLang('fr') : ''}>{translation.lang.fr}</Button>
                           <span>|</span>
                           <Button onClick={() => lang !== 'en' ? changeLang('en') : ''}>{translation.lang.en}</Button>
                           <span>{`}`}</span>
                        </div>
                     </div>
                  </div>
               )
            }
         </nav>
      </>
   )
}