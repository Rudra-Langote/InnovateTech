import Header from '../components/Header';
import React from 'react';
import Footer from '../components/Footer';
import { AppProvider } from '../context/AppContext';

function MyApp({ Component, pageProps }) {

    return <AppProvider>
        <Header />
        <Component {...pageProps} />
        <Footer />

    </AppProvider>




}
export default MyApp