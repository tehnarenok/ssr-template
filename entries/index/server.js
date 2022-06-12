import Home from 'view/components/Home';
import renderServerApp from 'view/lib/renderServerApp';

export default ({ bodyScripts, stylesheets, router, }) => {
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
