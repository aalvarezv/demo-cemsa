
import React, { useEffect, useContext } from 'react';
import Head from 'next/head';
import { ToastContainer, Slide, Zoom, Flip, Bounce } from 'react-toastify';
import Navegacion from './Navegacion';


const Layout = props => {

    return ( 
        <>
        <Head>
        <title>Cemsa</title>
        <link 
            rel="stylesheet" 
            href="https://cdnjs.cloudflare.com/ajax/libs/normalize/8.0.1/normalize.min.css" 
            integrity="sha256-l85OmPOjvil/SOvVt3HnSSjzF1TUMyT9eV0c2BzEGzU="
            crossOrigin="anonymous" 
        />
        </Head>
        <Navegacion />
        <ToastContainer
            position="bottom-left"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            transition={Flip}
            enableMultiContainer 
            containerId={'sys_msg'}
        />
        <main>
            {props.children}
        </main>
         <style jsx global>{`
        `}</style>  
        </>
     );
}
 
export default Layout;