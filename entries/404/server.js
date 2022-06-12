import NotFound from 'view/components/NotFound';
import renderServerApp from 'view/lib/renderServerApp';

export default ({ bodyScripts, stylesheets, router, }) => {
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
    });
};
