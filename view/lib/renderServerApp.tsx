import { renderToStaticMarkup, renderToString } from 'react-dom/server';
import React from 'react';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import App from 'view/components/App';
import reducers from 'view/reducers';
import { goTo, changeQuery } from 'view/actions/router';
import { IServerRenderProps } from './types';
import Html from './Html';

const renderServerApp = (props: IServerRenderProps) => {
    const store = configureStore({
        reducer: reducers,
        devTools: process.env.NODE_ENV === 'development',
    });

    store.dispatch(goTo({ path: props.router.path, }));
    store.dispatch(changeQuery({ query: props.router.query ?? {}, }));

    const content = renderToString(
        <Provider store={store}>
            <App>
                <props.rootComponent />
            </App>
        </Provider>
    );

    const html = renderToStaticMarkup(
        <Html
            lang='ru'
            rootId='root'
            content={content}
            reactSrc=''
            initialState={store.getState()}
            bodyScripts={[
                { src: 'https://unpkg.com/react@18/umd/react.development.js', crossOrigin: true, },
                { src: 'https://unpkg.com/react-dom@18/umd/react-dom.development.js', crossOrigin: true, },
                ...(props.bodyScripts || [])
            ]}
            stylesheets={props.stylesheets}
        />
    );

    return `<!doctype html>${html}`;
};

export default renderServerApp;
