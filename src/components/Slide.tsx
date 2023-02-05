export const Slide = () => {
   return (
      <>
         <section className="first-element">
            <div>
               <h2>Hi! Welcome to my portfolio</h2>
               <ul>
                  {'{'}
                  <li>&quot;title&quot; : &quot;Hi! Welcome&quot;</li>
                  <li>&quot;firstName&quot; : &quot;Miguel&quot;</li>
                  <li>&quot;name&quot; : &quot;Molano&quot;</li>
                  <li>&quot;type&quot; : &quot;Web Developer&quot;</li>
                  {'}'}
               </ul>
            </div>
            <div className="three-box-container">
               {/* <Canvas camera={{ position: [0, 5, 100], fov: 55, near: 1, far: 20000 }}>
                  <pointLight position={[100, 100, 100]} />
                  <pointLight position={[-100, -100, -100]} />
                  <Suspense fallback={null}>
                     <Box />
                  </Suspense>
               </Canvas> */}
            </div>

            <div className="widget-scroll">
               <div className="widget-scroll-inside"></div>
            </div>
         </section>
      </>
   )
}
