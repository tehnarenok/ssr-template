import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { useDispatch } from 'react-redux';
import { IRouterState } from 'view/reducers/router';
import { goTo, changeQuery } from 'view/actions/router';
import styles from './index.module.css';

const App = ({ children, }: {children: React.ReactNode}) => {
    const router: IRouterState = useSelector<{router: IRouterState}, IRouterState>(state => state.router);
    const dispatch = useDispatch();
    const [ lastPage, setLastPage ] = useState<string | null>(null);

    useEffect(() => {
        if (!(typeof window === 'undefined')) {
            const query = new URLSearchParams(router.query).toString();
            const url = router.path + (router.hash ? '#' + router.hash : '') + (
                query && query !== '' ? '?' + query : ''
            );

            window.history.replaceState({}, '', url);
        }
    }, [ router ]);

    useEffect(() => {
        if (lastPage && lastPage !== router.page) {
            const query = new URLSearchParams(router.query).toString();
            const url = router.path + (router.hash ? '#' + router.hash : '') + (
                query && query !== '' ? '?' + query : ''
            );

            setLastPage(router.page);
            window.location.assign(url);
        } else {
            if (!lastPage) {
                setLastPage(router.page);
            }
        }
    }, [ lastPage, router ]);

    useEffect(() => {
        if (!(typeof window === 'undefined')) {
            const onLocationChange = () => {
                const search = new URLSearchParams(window.location.search);
                // eslint-disable-next-line prefer-const
                let query: {[key: string]: string} = {};

                for (const key of search.keys()) {
                    const value = search.get(key)?.toString();

                    if (value) {
                        query[key] = value;
                    }
                }

                dispatch(goTo({ path: window.location.pathname, }));
                dispatch(changeQuery({ query, }));
            };

            window.addEventListener('locationchange', onLocationChange);
            window.addEventListener('popstate', onLocationChange);

            return () => {
                window.removeEventListener('popstate', onLocationChange);
                window.removeEventListener('locationchange', onLocationChange);
            };
        }
    }, [ dispatch ]);

    return (
        <div className={styles.container}>
            {children}
        </div>
    );
};

export default App;
