import { LayoutHeader } from '@/components/layouts/LayoutHeader';
import { StateContext } from '@/context/AppContext';
import '@/styles/scss/global.scss';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { useEffect, useRef } from 'react';

const title = "Miguel.dev()"

console.log('%c Coded with ❤️ by Miguel Molano',
  'background: #7923AD; color: #ffff; border-radius: 3px; padding: 0.6rem;');


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
  useEffect(() => {
    const handleMouseLeave = () => {
      const cursor = document.querySelector('.cursor');
      cursor!.setAttribute("style", `display: none;`);
    };

    window.addEventListener("mouseout", handleMouseLeave);

    return () => {
      window.removeEventListener("mouseout", handleMouseLeave);
    };
  }, []);

  return (
    <StateContext>
      <div className="main-app" onMouseMove={mouseMove} onClick={mouseClick} onMouseDown={mouseClick} ref={cursorRef}>
        <Head>
          <title>{title}</title>
          <meta name="description" content="My name is Miguel Molano and i'm a French Web developer, you have a project ? you want to hire me ? feel free to take a look at my portfolio! Let's make contact!" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <LayoutHeader />
        <Component {...pageProps} />
      </div>
      <div className="cursor"></div>
    </StateContext>
  )
}
