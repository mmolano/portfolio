import { useStateContext } from '@/context/AppContext';
import { Lang } from '@/lib/interface/context';
import Link from 'next/link';
import { useState, useEffect, useCallback } from 'react';

export const LayoutHeader = (): JSX.Element => {
   const { show, setShow, lang, translation, changeLanguage, projectsRef, contactRef } = useStateContext();
   const [activeSection, setActiveSection] = useState<string>('');

   function changeLang(language: Lang): void {
      //TODO: put Loader
      changeLanguage?.(language);
      window.location.reload()
   }

   const handleScroll = useCallback(() => {
      const projectsPosition = projectsRef.current?.getBoundingClientRect().top;
      const contactPosition = contactRef.current?.getBoundingClientRect().top;

      if (projectsPosition || contactPosition) {
         if (projectsPosition < 100 && contactPosition > 1) {
            if (!projectsRef.current.classList.contains('animate')) {
               projectsRef.current.classList.add('animate');
            }
            setActiveSection('projects');
         } else if (contactPosition < 1) {
            if (!contactRef.current.classList.contains('animate')) {
               contactRef.current.classList.add('animate');
            }
            setActiveSection('contact');
         } else {
            setActiveSection('');
         }
      }
   }, [projectsRef, contactRef]);

   useEffect(() => {
      window.addEventListener('scroll', handleScroll);
   }, [handleScroll]);

   return (
      <>
         <nav>
            <div className="navigator">
               <div className="nav-title">
                  <Link scroll={false} href={'/#home'}>
                     <h2>Miguel<span className="nav-animate-title">.</span>Dev<span className="nav-animate-title"> _</span></h2>
                  </Link>
               </div>
               <div className="row">
                  <ul className="nav-list">
                     <li className={`nav-selector ${activeSection === 'projects' ? 'active' : ''} `}><span data-value="01" className={activeSection === 'projects' ? 'active' : ''}>01</span>{`//`} <Link scroll={false} href={"/#projects"}>{translation.nav.projects}</Link></li>
                     <li className={`nav-selector ${activeSection === 'contact' ? 'active' : ''}`}><span data-value="02" className={activeSection === 'contact' ? 'active' : ''}>02</span>{`//`} <Link scroll={false} href={"/#contact"}>{translation.nav.contact}</Link></li>
                     <li className={`nav-selector ${activeSection === 'about' ? 'active' : ''}`}><span data-value="03" className={activeSection === 'about' ? 'active' : ''}>03</span>{`//`} <Link scroll={false} href={"/#about"}>{translation.nav.about}</Link></li>
                  </ul>
                  <div className="nav-lang-selector">
                     <p>Lang: {`{`}</p>
                     <div>
                        <button onClick={() => lang !== 'fr' ? changeLang('fr') : ''}>{translation.lang.fr}</button>
                     </div>
                     <span>|</span>
                     <div>
                        <button onClick={() => lang !== 'en' ? changeLang('en') : ''}>{translation.lang.en}</button>
                     </div>
                     <p>{`}`}</p>
                  </div>
               </div>
            </div>

            <div onClick={() => setShow?.(!show)} className={`toggle-nav ${show ? 'is-toggled' : ''}`}>
               <span className={`toggle-style one `}></span>
               <span className={`toggle-style two `}></span>
               <span className={`toggle-style three `}></span>
               <span className={`toggle-style four `}></span>
               <span className={`toggle-style five `}></span>
               <span className={`toggle-style six `}></span>
               <span className={`toggle-style seven `}></span>
               <span className={`toggle-style eight `}></span>
               <span className={`toggle-style nine `}></span>
               <span className={`test`}></span>
               <span className={`test`}></span>
            </div>
            {/* //TODO: animation here when showed  */}
            {
               show && (
                  <div className="mobile-nav">
                     <div className="row">
                        <ul className="nav-list">
                           <li className="nav-selector active"><a href="#projects">{`//`} {translation.nav.projects}</a></li>
                           <li className="nav-selector"><a href="#contact">{`//`} {translation.nav.contact}</a></li>
                           <li className="nav-selector"><a href="#about">{`//`} {translation.nav.about}</a></li>
                        </ul>
                        <div className="nav-lang-selector">
                           <span>Lang: {`{`}</span>
                           <button onClick={() => lang !== 'fr' ? changeLang('fr') : ''}>{translation.lang.fr}</button>
                           <span>|</span>
                           <button onClick={() => lang !== 'en' ? changeLang('en') : ''}>{translation.lang.en}</button>
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