import { useStateContext } from "@/context/AppContext";
import { AboutIF, ProjectIF } from "@/lib/interface/lang";
import { useState } from "react";

export const Slide = () => {
   const { translation, currentSlide, setCurrentSlide } = useStateContext();
   const [isSlide, setIsSlide] = useState(false);

   const firstSlide: AboutIF[] = [
      {
         "title": 'About me',
         "description": 'I\'m a french web developer working with different languages such as Laravel PHP, React, Vue.js & Typescript.',
         "links": [
            {
               "name": "github",
               "link": "https://github.com/mmolano",
            },
            {
               "name": "linkedin",
               "link": "https://linkedin.com/in/mimolano",
            }
         ]
      }
   ]

   const slider = [...firstSlide, translation.projects];
   
   console.log(slider);
   let isTimeoutRunning = false;

   const scrollAnimate = (e: any) => {
      if (isTimeoutRunning) return;
      const delta = e.deltaY || e.detail || e.wheelDelta;
      if (delta > 51) {
         if (currentSlide > 0) {
            isTimeoutRunning = true;
            setTimeout(() => {
               setCurrentSlide?.(currentSlide - 1);
               isTimeoutRunning = false;
            }, 200)
         }
      }
      if (delta < -51) {
         if (currentSlide < slider.length - 1) {
            isTimeoutRunning = true;
            setTimeout((e) => {
               setCurrentSlide?.(currentSlide + 1);
               isTimeoutRunning = false;
            }, 200)
         }
      }
   }

   return (
      <>
         <section className="">
            <h1>{slider[0].title}</h1>
            <div>{slider[0].description}</div>
            {slider[0].links.map((value, index) => (
               <div key={index}>{value.name}: {value.link}</div>
            ))}
         </section>

         {
            isSlide && (
               <>
                  <section className="container" onWheel={scrollAnimate}>
                     <h1>{slider[1][currentSlide].title}</h1>
                     <div>{slider[1][currentSlide].description}</div>
                     <div>{slider[1][currentSlide].tools}</div>
                     <div>{slider[1][currentSlide].date.start}</div>
                     <div>{slider[1][currentSlide].date.end}</div>
                  </section>
                  <div>
                     {Object.keys(slider[1]).map((value, key) => (
                        <span key={key} className={`slide-points${key === currentSlide ? ' active' : ''}`}></span>
                     ))}
                  </div>
               </>
            )
         }
      </>
   )
}