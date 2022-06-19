import React from 'react';
import { hydrateRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import App from 'view/components/App';
import getStore from 'view/store/getStore';
import { loadableReady } from '@loadable/component';
import { IBrowserRenderProps } from './types';
import { removePortals } from './Portal/ssrPortals';

const renderBrowserApp = (props: IBrowserRenderProps) => {
    loadableReady(() => {
        const rootContainer = document.getElementById('root') || document.body;

        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        const initialState = window.INITIAL_STATE;

        const store = getStore(initialState);

        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        delete window.INITIAL_STATE;
        document.getElementById('initial_state_script')?.remove();

        removePortals();

        hydrateRoot(rootContainer,
            <Provider store={store}>
                <App>
                    <props.rootComponent />
                </App>
            </Provider>
        );
    });
};

export default renderBrowserApp;
