import ReactGA from 'react-ga';

export const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_ID!;
const isTest = process.env.NEXT_PUBLIC_GA_TEST!;

export const initGA = () => {
   if (isTest) {
      ReactGA.initialize(GA_TRACKING_ID, { testMode: true });
   } else {
      ReactGA.initialize(GA_TRACKING_ID);
   }
};

export const logPageView = () => {
   ReactGA.set({ page: window.location.pathname });
   ReactGA.pageview(window.location.pathname);
};
