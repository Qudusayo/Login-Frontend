import React, { Component } from "react";
import styles from './style.module.scss'

import logo from '../../assets/react.svg'

class index extends Component {
    render() {
        return (
            <div className={styles.App}>
                <header className={styles.AppHeader}>
                    <img src={logo} className={styles.AppLogo} alt="logo" />
                    <p>
                        WELCOME HOME, DON'T FORGET TO<br /> GIVE ME A STAR TO ENCOURAGE ME
                    </p>
                    <a
                        className={styles.AppLink}
                        href="https://reactjs.org"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        BUY ME A COFFEE
                    </a>
                </header>
            </div>
        );
    }
}

export default index;
