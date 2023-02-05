import { Navigation } from '@/components/header/Navigation'
import { StateContext } from '@/context/AppContext'
import '@/styles/scss/global.scss'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import { useRef } from 'react'

const title = "{ Miguel.Dev }"

console.log('%c Coded by Miguel Molano ',
  'background: #c0894f; color: #ffff; border-radius: 3px; padding: 0.5rem');


const mouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
  const cursor = document.querySelector('.cursor');
  cursor!.setAttribute("style", `top: ${e.pageY - 20}px; left: ${e.pageX - 20}px;`);
};

const mouseClick = (e: React.MouseEvent<HTMLDivElement>) => {
  const cursor = document.querySelector('.cursor');
  cursor!.classList.add("click-effect");

  setTimeout(() => {
    cursor!.classList.remove("click-effect");
  }, 500);
};


export default function App({ Component, pageProps }: AppProps) {
  const cursorRef = useRef<HTMLDivElement>(null);

  return (
    <StateContext>
      <section onMouseMove={mouseMove} onClick={mouseClick} onMouseDown={mouseClick} ref={cursorRef}>
        <Head>
          <title>{title}</title>
          <meta name="description" content="Generated by create next app" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <Navigation />
        <Component {...pageProps} />
      </section>
      <div className="cursor"></div>
    </StateContext>
  )
}
