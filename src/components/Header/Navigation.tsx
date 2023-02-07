import { useStateContext } from '@/context/AppContext';
import Link from 'next/link';
import { useEffect } from 'react';

export const Navigation = (): JSX.Element => {
   const { show, setShow, lang, translation, changeLanguage } = useStateContext();
   
   useEffect(() => {
      localStorage.setItem("lang", lang);
   }, [lang]);

   //TODO: store lang in cookie
   return (
      <>
         <nav>
            <div className="navigator">
               <div className="nav-title">
                  <Link href={'/'}>
                     <h1>Miguel<span className="nav-animate-title">.</span>Dev<span className="nav-animate-title"> _</span></h1>
                  </Link>
               </div>
               <div className="row">
                  <ul className="nav-list">
                     {/* // TODO make this part base on where we are in the website and add transition animation  */}
                     <li className="nav-selector active"><span className='active'>01</span>{`//`} <a href="#projects">{translation.nav.projects}</a></li>
                     <li className="nav-selector"><span>02</span>{`//`} <a href="#contact">{translation.nav.contact}</a></li>
                     <li className="nav-selector"><span>03</span>{`//`} <a href="#about">{translation.nav.about}</a></li>
                  </ul>
                  <div className="nav-lang-selector">
                     <p>Lang: {`{`}</p>
                     <div>
                        <button onClick={() => lang !== 'fr' ? changeLanguage?.('fr') : ''}>{translation.lang.fr}</button>
                     </div>
                     <span>|</span>
                     <div>
                        <button onClick={() => lang !== 'en' ? changeLanguage?.('en') : ''}>{translation.lang.en}</button>
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
                           <button onClick={() => lang !== 'fr' ? changeLanguage?.('fr') : ''}>{translation.lang.fr}</button>
                           <span>|</span>
                           <button onClick={() => lang !== 'en' ? changeLanguage?.('en') : ''}>{translation.lang.en}</button>
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