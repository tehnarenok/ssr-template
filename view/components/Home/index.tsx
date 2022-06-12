import React from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import classNames from 'classnames';
import { changeQuery } from 'view/actions/router';
import { IRouterState } from 'view/reducers/router';
import styles from './index.module.css';
import data from './data';
import logo from './webpack.svg';
import tehdevLogo from './logo_1_without.png';

const cx = classNames.bind(styles);

const Home = () => {
    const router: IRouterState = useSelector<{router: IRouterState}, IRouterState>(state => state.router);
    const dispatch = useDispatch();

    const handleClick = (key: string) => {
        dispatch(changeQuery({ query: { tab: key, }, }));
    };

    let currentKey = Object.keys(data)[0];

    if (router.query?.tab) {
        for (const key of Object.keys(data)) {
            if (key.replace(' ', '_') === router.query.tab) {
                currentKey = key;
                break;
            }
        }
    }

    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <a href='https://tehdev.com'>
                    <img className={styles['header-logo']} src={tehdevLogo}/>
                </a>
                <div className={styles['header-text']}>Custom SSR application</div>
            </header>
            <main className={styles.main}>
                <div className={styles.menu}>
                    {Object.keys(data).map(el => (
                        <div
                            className={cx(
                                styles['menu-item'],
                                { [styles['current-menu-item']]: el === currentKey, }
                            )}
                            key={el.replace(' ', '_')}
                            onClick={() => handleClick(el.replace(' ', '_'))}
                        >
                            {el}
                        </div>
                    ))}
                </div>
                <span className={styles['main-text']}>
                    {currentKey === 'Webpack' &&
                        <div
                            className={cx(
                                styles.image,
                                styles['main-text-image'],
                                styles['main-text-image-spin']
                            )}
                        >
                            <div
                                className={cx(styles.image, styles['main-text-image'])}
                                dangerouslySetInnerHTML={{ __html: logo, }}
                            />
                        </div>
                    }
                    {data[currentKey]}
                </span>
            </main>
            <footer className={styles.footer}>

            </footer>
        </div>
    );
};

export default Home;
