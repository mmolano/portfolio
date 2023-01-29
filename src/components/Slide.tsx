import { useStateContext } from "@/lib/context";

export const Slide = () => {
   const { translation, currentSlide, setCurrentSlide } = useStateContext();
   const slider = translation.projects

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
         <section className="container" onWheel={scrollAnimate}>
            <h1>{slider[currentSlide].title}</h1>
            <div>{slider[currentSlide].description}</div>
            <div>{slider[currentSlide].tools}</div>
            <div>{slider[currentSlide].date.start}</div>
            <div>{slider[currentSlide].date.end}</div>

         </section>
         <div>
            {Object.keys(slider).map((value, key) => (
               <span key={key} className={`slide-points${key === currentSlide ? ' active' : ''}`}></span>
            ))}
         </div>
      </>
   )
}