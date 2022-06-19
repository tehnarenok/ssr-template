import { ReactNode } from 'react';

export interface IHtmlHeadSeo {
    title: string;
    description: string;
    ogTitle?: string;
    ogDescription?: string;
}

export interface IHtmlHeadLink {
    href: string;
    [key: string]: string;
}

export interface IHtmHeadScript {
    src?: string;
    content?: string;
}

export interface IHtmlHeadStylesheet {
    href: string;
}

export interface IHtmlHeadInlineStylesheet {
    content: string;
}

export interface IHtmlHeadMeta {
    name: string;
    content: string;
}

export interface IHtmlHeadProps {
    seo: IHtmlHeadSeo;
    meta?: Array<IHtmlHeadMeta>;
    scripts?: Array<IHtmHeadScript>;
    links?: Array<IHtmlHeadLink>;
    stylesheets?: Array<IHtmlHeadStylesheet>;
    inlineStylesheets?: Array<IHtmlHeadInlineStylesheet>;
    children?: ReactNode | ReactNode[];
}
