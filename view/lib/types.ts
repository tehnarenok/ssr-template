import { IRouter } from 'core/router/types';
import { IHtmlBodyScript } from './Html/types';
import { IHtmlHeadStylesheet } from './Html/HtmlHead/types';

interface IStore {
    // eslint-disable-next-line @typescript-eslint/ban-types
    initialState: Object;
}

interface IBasicRenderProps {
    rootComponent: () => JSX.Element;
    store?: IStore
}

export interface IBrowserRenderProps extends IBasicRenderProps {

}

export interface IServerRenderProps extends IBasicRenderProps {
    bodyScripts?: IHtmlBodyScript[],
    stylesheets?: IHtmlHeadStylesheet[]
    router: IRouter
}
