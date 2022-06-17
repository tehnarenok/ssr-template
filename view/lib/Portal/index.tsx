import React from 'react';
import { usePortal } from './ssrPortals';
import { IPortalProps } from './types';

const Portal = (props: IPortalProps) => {
    const {
        server = false,
        client = props.server ? Boolean(props.client) : true,
        children,
        selector,
    } = props;

    const portal = usePortal(
        children,
        selector,
        {
            client,
            server,
            deps: [ children ],
        }
    );

    return (
        <>
            {portal}
        </>
    );
};

export default Portal;
