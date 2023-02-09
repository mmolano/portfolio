import { Layout } from '@/components/layouts/Layout';
import { useStateContext } from '@/context/AppContext';
import React, { useState } from 'react';

export default function About(): JSX.Element {
   const { translation, lang } = useStateContext();

   return (
      <>
         <Layout>
            <section id="home" className="first-element">
               
            </section>
         </Layout>
      </>
   )
}
