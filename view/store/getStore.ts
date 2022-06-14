import { configureStore } from '@reduxjs/toolkit';
import reducers from './reducers';

// eslint-disable-next-line @typescript-eslint/ban-types
const getStore = (initialState?: Object) => {
    const store = configureStore({
        reducer: reducers,
        preloadedState: initialState,
        devTools: process.env.NODE_ENV === 'development',
    });

    return store;
};

export type AppStore = ReturnType<typeof reducers>

export default getStore;
