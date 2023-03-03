import Link from "next/link";

interface linkIF {
   className?: string;
   children: Readonly<React.ReactNode>;
   isOutSite?: boolean;
   href: string;
   scroll?: boolean;
   target?: string;
   rel?: string;
   onClick?: () => void;
}

export const LinkRef = ({ isOutSite, className, href, target, rel, scroll, onClick, children }: linkIF) => {
   const handleMouseEnter = (extraClass?: string) => {
      const cursorElement = document.getElementsByClassName('cursor')[0];
      cursorElement.classList.add('href-hover');
      if (extraClass) {
         cursorElement.classList.add(extraClass);
      }
   };
   const handleMouseLeave = (extraClass?: string) => {
      const cursorElement = document.getElementsByClassName('cursor')[0];
      cursorElement.classList.remove('href-hover');
      if (extraClass) {
         cursorElement.classList.remove(extraClass);
      }
   };

   const handleLinkClick = () => {
      const cursorElement = document.getElementsByClassName('cursor')[0];
      cursorElement.classList.remove('href-hover');
   };

   if (isOutSite) {
      return (
         <>
            <a href={href} className={className} onMouseEnter={() => handleMouseEnter('hover-leave')} onMouseLeave={() => handleMouseLeave('hover-leave')}>
               {children}
            </a>
         </>
      )
   } else {
      return (
         <>
            <Link onClick={() => { onClick; handleLinkClick() }} scroll={scroll} href={href} className={className} onMouseEnter={() => handleMouseEnter()} onMouseLeave={() => handleMouseLeave()}>
               {children}
            </Link>
         </>
      )
   }
}