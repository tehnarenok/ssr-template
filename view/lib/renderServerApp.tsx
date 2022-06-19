import { renderToStaticMarkup, renderToString } from 'react-dom/server';
import React from 'react';
import { Provider } from 'react-redux';
import App from 'view/components/App';
import { goTo, changeQuery } from 'view/store/actions/router';
import getStore from 'view/store/getStore';
import { ChunkExtractor } from '@loadable/server';
import { IServerRenderProps } from './types';
import Html from './Html';
import renderServerPortals from './Portal/renderServerPortals';

const renderServerApp = (props: IServerRenderProps) => {
    const store = getStore(props.store?.initialState);

    store.dispatch(goTo({ path: props.router.path, }));
    store.dispatch(changeQuery({ query: props.router.query ?? {}, }));

    const extractor = new ChunkExtractor({ stats: props.loadable, entrypoints: 'client', });

    const jsx = extractor.collectChunks(
        <Provider store={store}>
            <App>
                <props.rootComponent />
            </App>
        </Provider>
    );

    const content = renderToString(jsx);

    const styles = extractor.getStyleElements();
    const scripts = extractor.getScriptElements();

    let html = renderToStaticMarkup(
        <Html
            lang='ru'
            rootId='root'
            content={content}
            reactSrc=''
            initialState={store.getState()}
            bodyScripts={props.bodyScripts}
            stylesheets={props.stylesheets}
            headElements={styles}
            bodyElements={scripts}
        />
    );

    html = renderServerPortals(html);

    return `<!doctype html>${html}`;
};

export default renderServerApp;
