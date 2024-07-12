import Header from '../components/Header';
import React from 'react';
import Footer from '../components/Footer';
import { AppProvider } from '../context/AppContext';
import {Poppins} from '@next/font/google'
import '../Style/style.css'


const roboto = Poppins({

    subsets:['latin'],
    weight: ['200','300']
})

function MyApp({ Component, pageProps }) {

    return <AppProvider>
        <main className={roboto.className}>
        <Header />
        <Component {...pageProps} />
        <Footer />
        </main>

    </AppProvider>




}
export default MyApp