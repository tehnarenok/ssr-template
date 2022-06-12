export interface IRoutePattern<T=null> {
    bundle: string;
    pattern: RegExp;
    component?: () => JSX.Element;
    payload?: T
}

export interface IRouterProps {
    path: string;
    hash?: string;
    query?: {[key: string]: string}
}

export interface IRouter<T = null> extends IRouterProps {
    payload: T;
    bundleName: string;
    is404?: boolean;
}
