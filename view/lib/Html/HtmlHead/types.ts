interface IHtmlHeadSeo {
    title: string;
    description: string;
    ogTitle?: string;
    ogDescription?: string;
}

interface IHtmlHeadLink {
    href: string;
    [key: string]: string;
}

interface IHtmHeadScript {
    src?: string;
    content?: string;
}

export interface IHtmlHeadStylesheet {
    href: string;
}

interface IHtmlHeadInlineStylesheet {
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
}
