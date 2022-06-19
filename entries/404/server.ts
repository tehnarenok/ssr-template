import { IServerEntityProps } from 'entries/types';
import NotFound from 'view/components/NotFound';
import renderServerApp from 'view/lib/renderServerApp';

export default (props: IServerEntityProps) => {
    const {
        bodyScripts = [],
        stylesheets = [],
        router,
        loadable = {},
    } = props;

    const initialState = {
        count: 10,
    };

    return renderServerApp({
        rootComponent: NotFound,
        bodyScripts,
        stylesheets,
        store: {
            initialState,
        },
        router,
        loadable,
    });
};
