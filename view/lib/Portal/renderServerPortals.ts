import { load } from 'cheerio';
import ReactDOMServer from 'react-dom/server';
import { flushPortals } from './ssrPortals';

const renderServerPortals = (html: string) => {
    const $ = load(html);

    flushPortals().forEach(({ element, selector, client, }) => {
        const markup = ReactDOMServer.renderToStaticMarkup(element);

        if (client) {
            $(markup).attr('data-ssr-react-portal', '').appendTo(selector);
        } else {
            $(markup).appendTo(selector);
        }
    });

    return $.html();
};

export default renderServerPortals;
