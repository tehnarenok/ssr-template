import { renderToStaticMarkup, renderToString } from 'react-dom/server';
import React from 'react';
import { Provider } from 'react-redux';
import App from 'view/components/App';
import { goTo, changeQuery } from 'view/store/actions/router';
import getStore from 'view/store/getStore';
import { IServerRenderProps } from './types';
import Html from './Html';
import renderServerPortals from './Portal/renderServerPortals';

const renderServerApp = (props: IServerRenderProps) => {
    const store = getStore(props.store?.initialState);

    store.dispatch(goTo({ path: props.router.path, }));
    store.dispatch(changeQuery({ query: props.router.query ?? {}, }));

    const content = renderToString(
        <Provider store={store}>
            <App>
                <props.rootComponent />
            </App>
        </Provider>
    );

    let html = renderToStaticMarkup(
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

    html = renderServerPortals(html);

    return `<!doctype html>${html}`;
};

export default renderServerApp;
