import React from 'react';
import { IHtmlHeadMeta, IHtmlHeadProps } from './types';

const HtmlHead = (props: IHtmlHeadProps) => {
    const meta: Array<IHtmlHeadMeta> = [
        ...(props.meta || []),
        { name: 'description', content: props.seo.description, }
    ];

    const title = props.seo.title;

    return (
        <head>
            <title>{title}</title>
            {meta.map(metaItem => (
                <meta key={`${metaItem.name}-${metaItem.content}`} name={metaItem.name} content={metaItem.content}/>
            ))}
            {props.links?.map(link => <link {...link} href={link.href} key={link.href}/>)}
            {props.scripts?.map((script, idx) => (
                <script
                    key={script.src || idx}
                    src={script.src}
                    dangerouslySetInnerHTML={script.content ? {
                        __html: script.content,
                    } : undefined}
                />
            ))}
            {props.stylesheets?.map(stylesheet => (
                <link rel='stylesheet' href={stylesheet.href} key={stylesheet.href} />
            ))}
            {props.inlineStylesheets?.map((inlineStylesheet, idx) => (
                <style
                    type='text/css'
                    key={`inline-stylesheet-${idx}`}
                    dangerouslySetInnerHTML={{ __html: inlineStylesheet.content, }}
                />
            ))}
            {props.children}
        </head>
    );
};

export default HtmlHead;
