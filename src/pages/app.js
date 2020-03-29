import React from 'react'
import withRedux from 'next-redux-wrapper';
import { Provider } from 'react-redux'
import makeStore from '../redux/store';

const Application = ({ Component, store, pageProps, router }) => {
    console.log(Component)
    return (
        <Provider store={store}>
            <Component {...pageProps} />
        </Provider>
    )
}

Application.getInitialProps = async ({ Component, context }) => {
    return {
        pageProps: Component.getInitialProps ? await Component.getInitialProps(context) : {},
    };
};

export default withRedux(makeStore)(Application);