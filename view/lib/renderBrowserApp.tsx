import React from 'react';
import { hydrateRoot } from 'react-dom/client';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import reducers from 'view/reducers';
import App from 'view/components/App';
import { IBrowserRenderProps } from './types';

const renderBrowserApp = (props: IBrowserRenderProps) => {
    const rootContainer = document.getElementById('root') || document.body;

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const initialState = window.INITIAL_STATE;

    const store = configureStore({
        reducer: reducers,
        preloadedState: initialState,
        devTools: process.env.NODE_ENV === 'development',
    });

    hydrateRoot(rootContainer,
        <Provider store={store}>
            <App>
                <props.rootComponent />
            </App>
        </Provider>
    );
};

export default renderBrowserApp;
