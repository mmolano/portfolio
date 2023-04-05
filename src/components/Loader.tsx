import { useRef } from "react"
import { Grid } from "react-loader-spinner"
import { TitleStretch } from "./titles/TitleStretch"

export const Loader = () => {
   const loaderRef = useRef<HTMLDivElement>(null)
   setTimeout(() => {
      loaderRef.current?.classList.add("loading-end");
   }, 2000)

   return (
      <>
         <div ref={loaderRef} style={sectionStyle}>
            <div className="loader-div">
               <Grid
                  height="50"
                  width="50"
                  color="#ffff"
                  ariaLabel="grid-loading"
                  radius="12.5"
                  wrapperStyle={{ "justifyContent": "center", "margin": "30px" }}
                  wrapperClass=""
                  visible={true}
               />
               <TitleStretch>Miguel.Dev_</TitleStretch>
               <h5>Loading blobs ...</h5>
            </div>
         </div>
      </>
   )
}

const sectionStyle: React.CSSProperties = {
   position: 'fixed',
   zIndex: '999',
   top: 0,
   left: 0,
   right: 0,
   height: '100%',
   overflow: 'hidden',
   backgroundColor: '#B191FF',
   display: 'flex',
   justifyContent: 'center',
   flexDirection: 'column',
   alignItems: 'center',
   padding: 0,
   margin: 0,
}