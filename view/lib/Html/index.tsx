import React from 'react';
import cx from 'classnames';
import HtmlHead from './HtmlHead';
import { IHtmlProps } from './types';
import safeStringify from '../safeStringify';

const Html = (props: IHtmlProps) => {
    const seo = {
        title: 'Tehnarenok template',
        description: 'This is template',
    };

    const meta = [
        { name: 'viewport', content: 'width=device-width,initial-scale=1', },
        ...(props.meta || [])
    ];

    return (
        <html lang={props.lang}>
            <HtmlHead
                seo={seo}
                stylesheets={props.stylesheets}
                meta={meta}
                inlineStylesheets={props.inlineStylesheets}
                scripts={props.scripts}
                links={props.links}
            >
                {props.headElements}
            </HtmlHead>
            <body>
                <div
                    id={props.rootId}
                    className={cx(props.rootClassName)}
                    dangerouslySetInnerHTML={{
                        __html: props.content,
                    }}
                />
                <script
                    id="initial_state_script"
                    dangerouslySetInnerHTML={{
                        __html: `window.INITIAL_STATE = ${safeStringify(props.initialState)}`,
                    }}
                />
                {props.bodyScripts?.map((script, idx) => (
                    <script
                        key={script.src || idx}
                        src={script.src}
                        crossOrigin={script.crossOrigin?.toString()}
                        dangerouslySetInnerHTML={script.content ? {
                            __html: script.content,
                        } : undefined}
                    />
                ))}
                {props.bodyElements}
            </body>
        </html>
    );
};

export default Html;
