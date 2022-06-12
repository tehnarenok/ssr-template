import { createAction } from '@reduxjs/toolkit';

export const goTo = createAction<{path: string}>('ROUTER_GO_RO');

export const changeQuery = createAction<{query: {[key: string]: string}}>('ROUTER_CHANGE_QUERY');
