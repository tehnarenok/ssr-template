import React from 'react';
import { useDispatch } from 'react-redux';
import { goTo } from 'view/actions/router';
import styles from './index.module.css';

const NotFound = () => {
    const dispatch = useDispatch();

    const handleBackHome = () => {
        dispatch(goTo({ path: '/', }));
    };

    return (
        <div className={styles.container}>
            <svg xmlns="http://www.w3.org/2000/svg" version="1.1" className={styles['svg-filters']}>
                <defs>

                    <filter id="squiggly-0">
                        <feTurbulence id="turbulence" baseFrequency="0.02" numOctaves="3" result="noise" seed="0"/>
                        <feDisplacementMap id="displacement" in="SourceGraphic" in2="noise" scale="6" />
                    </filter>
                    <filter id="squiggly-1">
                        <feTurbulence id="turbulence" baseFrequency="0.02" numOctaves="3" result="noise" seed="1"/>
                        <feDisplacementMap in="SourceGraphic" in2="noise" scale="8" />
                    </filter>

                    <filter id="squiggly-2">
                        <feTurbulence id="turbulence" baseFrequency="0.02" numOctaves="3" result="noise" seed="2"/>
                        <feDisplacementMap in="SourceGraphic" in2="noise" scale="6" />
                    </filter>
                    <filter id="squiggly-3">
                        <feTurbulence id="turbulence" baseFrequency="0.02" numOctaves="3" result="noise" seed="3"/>
                        <feDisplacementMap in="SourceGraphic" in2="noise" scale="8" />
                    </filter>

                    <filter id="squiggly-4">
                        <feTurbulence id="turbulence" baseFrequency="0.02" numOctaves="3" result="noise" seed="4"/>
                        <feDisplacementMap in="SourceGraphic" in2="noise" scale="6" />
                    </filter>
                </defs>
            </svg>
            <div className={styles['not-fount-text']}>
                THIS PAGE <br/>
                <div className={styles.small}>- 404 -<br/></div>
                NOT FOUND <br/>
                <div className={styles.smaller}>
                    (You can back to <span className={styles.link} onClick={handleBackHome}>home</span> page)
                </div>
            </div>
        </div>
    );
};

export default NotFound;
