import { useStateContext } from '@/context/AppContext';

export const Navigation = (): JSX.Element => {
   const { show, setShow, lang, translation, changeLanguage } = useStateContext();

   //TODO: store lang in cookie
   return (
      <>
         <nav>
            <div onClick={() => setShow?.(!show)} className={`toggle-nav ${show ? 'is-toggled' : ''}`}>
               <span className={`toggle-style top ${show ? 'rotate-on' : 'rotate-off'}`}></span>
               <span className={`toggle-style middle ${show ? 'rotate-on' : 'rotate-off'}`}></span>
               <span className={`toggle-style bottom ${show ? 'rotate-on' : 'rotate-off'}`}></span>
            </div>

            <div className="navigator">
               <div className="nav-title">
                  <h1>Miguel<span className="nav-animate-title">.</span>Dev<span className="nav-animate-title"> _</span></h1>
               </div>
               <div className="row">
                  <ul className="nav-list">
                     {/* // TODO make this part base on where we are in the website and add transition animation  */}
                     <li className="nav-selector active"><span className='active'>01</span>{`//`} {translation.nav.projects}</li>
                     {/* // TODO download resume here  */}
                     <li className="nav-selector"><span>02</span>{`//`} {translation.nav.contact}</li>
                     <li className="nav-selector"><span>03</span>{`//`} {translation.nav.about}</li>
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
                        </ul>
                     </div>
                  </div>
               )
            }
         </nav>
      </>
   )
}