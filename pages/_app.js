import App from 'next/app';
import {Provider} from 'react-redux';
import React from 'react';
import withRedux from "next-redux-wrapper";
import Toolbar from '@material-ui/core/Toolbar'

import MainLayout from '../components/MainLayout'
import { initializeStore } from '../store';

class MyApp extends App {

    static async getInitialProps({Component, ctx}) {
        const pageProps = Component.getInitialProps ? await Component.getInitialProps(ctx) : {};

        //Anything returned here can be accessed by the client
        return {pageProps: pageProps};
    }

    render() {
        //pageProps that were returned  from 'getInitialProps' are stored in the props i.e. pageprops
        const {Component, pageProps, store} = this.props;

        return (
            <Provider store={store}>
                <MainLayout {...pageProps}>
                    <Toolbar />
                    <Component {...pageProps}/>
                </MainLayout>
            </Provider>
        );
    }
}

//makeStore function that returns a new store for every request
const makeStore = () => initializeStore();

//withRedux wrapper that passes the store to the App Component
export default withRedux(makeStore)(MyApp)