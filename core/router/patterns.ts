import { IRoutePattern } from './types';

const patterns: IRoutePattern[] = [
    { bundle: 'index', pattern: /^\/(\?.*)?$/, },
    { bundle: '404', pattern: /.*/, }
];

export default patterns;
