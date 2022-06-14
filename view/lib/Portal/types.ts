import { ReactElement } from 'react';

export interface IUsePortalOptions {
    deps?: Array<unknown>;
    server?: boolean;
    client?: boolean;
}

export interface IServerPortal {
    element: ReactElement;
    selector: string;
    client: boolean;
}

export interface IPortalProps {
    children: ReactElement;
    selector: string;
    client?: boolean;
    server?: boolean;
}
