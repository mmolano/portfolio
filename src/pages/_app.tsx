import { LayoutHeader } from '@/components/layouts/LayoutHeader'
import { StateContext } from '@/context/AppContext'
import '@/styles/scss/global.scss'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import { useRef, useState } from 'react'

const title: string = "Miguel.dev()";
const url: string = process.env.NEXT_PUBLIC_URL!;

console.log('%c Coded with ❤️ by Miguel Molano',
  'background: #7923AD; color: #ffff; border-radius: 3px; padding: 0.6rem;');

interface positionIF {
  x: number;
  y: number;
}

export default function App({ Component, pageProps }: AppProps) {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState<positionIF>({ x: 0, y: 0 });
  const [isOutside, setIsOutside] = useState<boolean>(false);

  const handleMouseOut = () => setIsOutside(true);
  const handleMouseIn = () => setIsOutside(false);

  const handleMouseClick = () => {
    cursorRef.current!.classList.add("click-effect");
    setTimeout(() => {
      cursorRef.current!.classList.remove("click-effect");
    }, 500);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    setPosition({
      x: e.clientX,
      y: e.clientY
    });
  };

  return (
    <StateContext>
      <main className="main-app"
        onMouseLeave={handleMouseOut}
        onMouseEnter={handleMouseIn}
        onMouseMove={handleMouseMove}
        onClick={handleMouseClick}
        onMouseDown={handleMouseClick}
        onScroll={handleMouseMove}
      >
        <Head>
          <title>{title}</title>
          <meta data-n-head="ssr" charSet="utf-8" />
          <meta data-n-head="ssr" name="robots" content="index, follow" />
          <meta data-n-head="ssr" name="description" content="Welcome to my online portfolio. I am a web developer using PHP, Laravel, ReactJS, and VueJS. I am passionate about creating modern, high-performing, and user-friendly websites and applications. My expertise in PHP, Laravel, ReactJS, and VueJS enables me to deliver reliable and efficient solutions for my clients. On this site, you will find examples of my most recent projects and details on my skills and web development experiences. Don't hesitate to contact me if you need my web development services!" />
          <meta data-n-head="ssr" name="keywords" content="web developer, PHP, Laravel, ReactJS, VueJS, portfolio" />
          <meta data-n-head="ssr" property="og:description" content="Welcome to my online portfolio. I am a web developer using PHP, Laravel, ReactJS, and VueJS. I am passionate about creating modern, high-performing, and user-friendly websites and applications. My expertise in PHP, Laravel, ReactJS, and VueJS enables me to deliver reliable and efficient solutions for my clients. On this site, you will find examples of my most recent projects and details on my skills and web development experiences. Don't hesitate to contact me if you need my web development services!" />
          {/* TODO: put image of website */}
          <meta data-n-head="ssr" property="og:image" content={title} />
          <meta data-n-head="ssr" property="og:url" content={url} />

          <meta data-n-head="ssr" name="viewport" content="width=device-width, initial-scale=1" />
          <link data-n-head="ssr" rel="icon" href="/favicon.ico" />
        </Head>
        <LayoutHeader />
        <Component {...pageProps} />
      </main>
      <div
        ref={cursorRef}
        style={{
          display: `${isOutside ? 'none' : 'inherit'}`,
          transform: `translate(${position.x - 20}px, ${position.y - 20}px)`,
        }} className="cursor">
      </div>
    </StateContext>
  )
}
