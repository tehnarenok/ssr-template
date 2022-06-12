import { createReducer } from '@reduxjs/toolkit';
import { goTo, changeQuery } from 'view/actions/router';
import matchRoute from 'core/router/match';

export interface IRouterState {
    path: string;
    page: string;
    hash?: string;
    query?: {[key: string]: string}
}

const routerReducer = createReducer<IRouterState>({ path: '/', page: 'index', }, builder => {
    builder
        .addCase(goTo, (state, action) => {
            const pageName = matchRoute(action.payload.path)?.bundle;
            const newState: IRouterState = {
                ...state,
                page: pageName ?? '404',
                path: action.payload.path,
            };

            return newState;
        })
        .addCase(changeQuery, (state, action) => {
            const newState: IRouterState = {
                ...state,
                query: action.payload.query,
            };

            return newState;
        });
});

export default routerReducer;
