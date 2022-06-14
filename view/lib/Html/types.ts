import {
    IHtmHeadScript,
    IHtmlHeadInlineStylesheet,
    IHtmlHeadLink,
    IHtmlHeadMeta,
    IHtmlHeadStylesheet
} from './HtmlHead/types';

export interface IHtmlBodyScript {
    src?: string;
    content?: string;
    crossOrigin?: boolean;
}

export interface IHtmlProps {
    lang: string;
    rootId: string;
    rootClassName?: string;
    content: string;
    reactSrc: string;
    // eslint-disable-next-line @typescript-eslint/ban-types
    initialState: Object;
    bodyScripts?: Array<IHtmlBodyScript>;
    stylesheets?: IHtmlHeadStylesheet[];
    meta?: IHtmlHeadMeta[];
    inlineStylesheets?: IHtmlHeadInlineStylesheet[];
    scripts?: IHtmHeadScript[];
    links?: IHtmlHeadLink[];
}
