import Home from 'view/components/Home';
import renderBrowserApp from 'view/lib/renderBrowserApp';

renderBrowserApp({
    rootComponent: Home,
    store: {
        initialState: null,
    },
});
