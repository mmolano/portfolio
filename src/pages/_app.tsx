import { LayoutHeader } from '@/components/layouts/LayoutHeader';
import { StateContext } from '@/context/AppContext';
import { GoogleAnalyticsScript } from '@/lib/analytics/GoogleAnalyticsScript';
import { initGA, logPageView } from '@/lib/analytics/GoogleTracker';
import '@/styles/scss/global.scss';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';
import { ToastContainer } from 'react-toastify';
import { Analytics } from '@vercel/analytics/react';

const title: string = "Miguel.dev()";
const url: string = process.env.NEXT_PUBLIC_URL!;

console.info('%c Coded with ❤️ by Miguel Molano',
  'background: #B191FF; color: #ffff; border-radius: 3px; padding: 0.6rem;');

interface positionIF {
  x: number;
  y: number;
}

declare global {
  interface Window {
    GA_INITIALIZED: boolean;
  }
}

export default function App({ Component, pageProps }: AppProps) {
  const cursorRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
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

  const handleMouseMove = (e: React.MouseEvent) => {
    e.stopPropagation();

    setPosition({
      x: e.clientX,
      y: e.clientY
    });
  };

  useEffect(() => {
    if (!window.GA_INITIALIZED) {
      initGA();
      window.GA_INITIALIZED = true;
    }
    logPageView();
  }, [router.asPath]);


  return (
    <StateContext>
      <main className="main-app"
        onMouseLeave={handleMouseOut}
        onMouseEnter={handleMouseIn}
        onMouseMove={handleMouseMove}
        onClick={handleMouseClick}
        onMouseDown={handleMouseClick}
      >
        <Head>
          <title>{title}</title>
          <meta data-n-head="ssr" charSet="utf-8" />
          <meta data-n-head="ssr" name="robots" content="index, follow" />
          <meta data-n-head="ssr" name="description" content="Welcome to my online portfolio. I am a web developer using PHP, Laravel, ReactJS, and VueJS. I am passionate about creating modern, high-performing, and user-friendly websites and applications. My expertise in PHP, Laravel, ReactJS, and VueJS enables me to deliver reliable and efficient solutions for my clients. On this site, you will find examples of my most recent projects and details on my skills and web development experiences. Don't hesitate to contact me if you need my web development services!" />
          <meta data-n-head="ssr" name="keywords" content="web developer, PHP, Laravel, ReactJS, VueJS, portfolio" />

          <meta data-n-head="ssr" property="og:description" content="Welcome to my online portfolio! This website was made with React and ThreeJS" />
          <meta data-n-head="ssr" property="og:image" content='/images/website/dev.png' />
          <meta data-n-head="ssr" property="og:title" content="Miguel.dev" />
          <meta data-n-head="ssr" property="og:type" content="website" />
          <meta data-n-head="ssr" property="og:url" content={url} />
          <meta data-n-head="ssr" property="twitter:description" content="Welcome to my online portfolio!" />
          <meta data-n-head="ssr" property="twitter:image" content='https://miguel-dev.vercel.app/images/website/dev.png' />
          <meta data-n-head="ssr" name="twitter:card" content="summary_large_image" />

          <link data-n-head="ssr" rel="manifest" href="/site.webmanifest" />
          <link data-n-head="ssr" rel="icon" sizes="48x48" href="/icons/favicon.ico" />
          <link data-n-head="ssr" rel="shortcut icon" sizes="16x16" href="/icons/favicon.ico" />
          <link data-n-head="ssr" rel="icon" type="image/png" sizes="32x32" href="/icons/favicon-32x32.png" />
          <link data-n-head="ssr" rel="apple-touch-icon" sizes="180x180" href="/icons/apple-touch-icon.png" />

          <meta data-n-head="ssr" name="viewport" content="width=device-width, initial-scale=1" />
          <GoogleAnalyticsScript />
        </Head>
        <LayoutHeader />
        <Component {...pageProps} />
        <ToastContainer
          limit={4}
          position="bottom-right"
          autoClose={4000}
          hideProgressBar={false}
          newestOnTop={false}
          theme="dark"
        />
        <Analytics />
      </main>
      <div
        ref={cursorRef}
        style={{
          display: `${isOutside ? 'none' : 'initial'}`,
          transform: `translate(${position.x - 20}px, ${position.y - 20}px)`,
        }} className="cursor">
      </div>
    </StateContext>
  )
}
