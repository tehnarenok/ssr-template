import NotFound from 'view/components/NotFound';
import renderBrowserApp from 'view/lib/renderBrowserApp';

renderBrowserApp({
    rootComponent: NotFound,
    store: {
        initialState: {},
    },

});
