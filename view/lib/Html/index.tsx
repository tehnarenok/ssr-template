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

    return (
        <html lang={props.lang}>
            <HtmlHead seo={seo} stylesheets={props.stylesheets}/>
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
            </body>
        </html>
    );
};

export default Html;
