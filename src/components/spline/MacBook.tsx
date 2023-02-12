import React, { useState, useEffect, Suspense, useRef } from 'react';
const Spline = React.lazy(() => import('@splinetool/react-spline'));

export const MacBook = () => {
   const [show, setShow] = useState(false);
   const mac = useRef();
   const splineId = '48D71D7A-15DB-4EF8-B086-15FA64DBF3B0';

   useEffect(() => {
      setShow(true);
   }, []);

   function onLoad(spline) {
      const obj = spline.findObjectById(splineId);

      mac.current = obj;
   }

   return (
      <Suspense fallback={<div>Loading...</div>}>
         {show && (
            <Spline
               onLoad={onLoad}
               scene="https://prod.spline.design/3nUC4HLkq1C7V-HJ/scene.splinecode"
            />
         )}
      </Suspense>
   );
}
