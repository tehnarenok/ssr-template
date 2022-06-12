import match from './match';
import { IRouter, IRouterProps } from './types';

const router = (props: IRouterProps): IRouter<null> => {
    const pattern = match(props.path);

    const bundleName = pattern?.bundle;

    const router: IRouter<null> = {
        ...props,
        bundleName: bundleName ?? '404',
        payload: null,
        is404: !bundleName,
    };

    return router;
};

export default router;
