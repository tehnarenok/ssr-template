/* eslint-disable @typescript-eslint/ban-types */
import { IRouter } from 'core/router/types';
import { IHtmlHeadStylesheet } from 'view/lib/Html/HtmlHead/types';
import { IHtmlBodyScript } from 'view/lib/Html/types';

export interface IServerEntityProps {
    bodyScripts?: IHtmlBodyScript[];
    stylesheets?: IHtmlHeadStylesheet[];
    router: IRouter;
    loadable?: Object;
}
