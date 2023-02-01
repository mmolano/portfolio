import { useStateContext } from '@/context/AppContext';

export const Navigation = (): JSX.Element => {
   const { show, setShow, lang, translation, changeLanguage } = useStateContext();

   //TODO: store lang in cookie
   return (
      <>
         <nav className="nav">
            <div onClick={() => setShow?.(!show)} className={`toggle-nav ${show ? 'is-toggled' : ''}`}>
               <span className={`toggle-style top ${show ? 'rotate-on' : 'rotate-off'}`}></span>
               <span className={`toggle-style middle ${show ? 'rotate-on' : 'rotate-off'}`}></span>
               <span className={`toggle-style bottom ${show ? 'rotate-on' : 'rotate-off'}`}></span>
            </div>

            <div className="navigator">
               <div className="row">
                  <ul className="nav-list">
                     <li className="nav-selector">{translation.nav.projects}</li>
                     {/* // TODO download resume here  */}
                     <li className="nav-selector">{translation.nav.contact}</li>
                     <li className="nav-selector">{translation.nav.about}</li>
                     <li className="nav-selector resume">{translation.nav.resume}</li>
                  </ul>
               </div>
               {/* <div className='TEMPORARY'>
                  <button onClick={() => lang !== 'fr' ? changeLanguage?.('fr') : ''}>{translation.lang.fr}</button>
                  <button onClick={() => lang !== 'en' ? changeLanguage?.('en') : ''}>{translation.lang.en}</button>
               </div> */}
            </div>

            {/* //TODO: animation here when showed  */}
            {
               show && (
                  <div className="mobile-nav">
                     <div className="row">
                        <ul className="nav-list">
                           <li className="nav-selector">{translation?.nav.projects}</li>
                           {/* // TODO download resume here  */}
                           <li className="nav-selector">{translation?.nav.contact}</li>
                           <li className="nav-selector">{translation?.nav.about}</li>
                           <li className="nav-selector resume">{translation?.nav.resume}</li>
                        </ul>
                     </div>
                  </div>
               )
            }
         </nav>
      </>
   )
}