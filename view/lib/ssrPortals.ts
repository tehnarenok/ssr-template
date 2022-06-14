import { ReactElement, ReactPortal, useEffect, useState } from 'react';
import ReactDOM from 'react-dom';

// eslint-disable-next-line prefer-const
export let portals: Array<[ReactElement, string, boolean]> = [];

export interface IUsePortalOptions {
    deps?: Array<unknown>;
    server?: boolean;
    client?: boolean;
}

export const usePortal = (element: ReactElement, selector: string, options: IUsePortalOptions) => {
    const [ portal, setPortal ] = useState<ReactPortal | null>();
    const { server = true, client = true, deps = [], } = options || {};

    if (typeof window === 'undefined' || typeof document === 'undefined') {
        if (server) {
            portals.push([ element, selector, client ]);
        }
    }

    useEffect(() => {
        if (client) {
            const domElement = document.querySelector(selector);

            if (domElement) {
                setPortal(ReactDOM.createPortal(
                    element,
                    domElement
                ));
            } else {
                setPortal(null);
            }
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, deps);

    return portal;
};

export const flushPortals = (): Array<[ReactElement, string, boolean]> => {
    const copy = portals.slice();

    portals.length = 0;
    return copy;
};

export const removePortals = () => {
    if (typeof window !== 'undefined' && typeof document !== 'undefined') {
        document.querySelectorAll('[data-ssr-react-portal]').forEach(node => {
            node.remove();
        });
    }
};
