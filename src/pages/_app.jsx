import Header from '../components/header';
import React from 'react';
import Footer from '../components/footer';
import { AppProvider } from '../context/AppContext';

function MyApp({Component, pageProps}){
    
    return<AppProvider>
            <Header/>   
            <Component {...pageProps}/>
            <Footer/>
           
        </AppProvider>
    
    
    

}
export default MyApp