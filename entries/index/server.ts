import { IServerEntityProps } from 'entries/types';
import Home from 'view/components/Home';
import renderServerApp from 'view/lib/renderServerApp';

export default (props: IServerEntityProps) => {
    const {
        bodyScripts = [],
        stylesheets = [],
        router,
    } = props;

    const initialState = {
        count: 10,
    };

    return renderServerApp({
        rootComponent: Home,
        bodyScripts,
        stylesheets,
        store: {
            initialState,
        },
        router,
    });
};
