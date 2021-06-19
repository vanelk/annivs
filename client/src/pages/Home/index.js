import React from 'react';
import { useLocation, Redirect } from 'react-router-dom';
import { useAppState } from '../../providers/AppProvider';
import GoogleButton from '../../components/GoogleButton';
import Container from '../../components/Container';
import { ReactComponent as LogoSvg } from '../../assets/images/icon.svg'
import styles from './style.module.scss';
export default function Home() {
    const { appState } = useAppState();
    const { state } = useLocation();
    if (appState.token) {
        return <Redirect to={state?.from || '/app'} />
    }
    return (
        <div className={styles.login}>
            <div className={styles.login_container}>
                <Container>
                    <div className={styles.icon_container}>
                        <LogoSvg />
                    </div>
                    <div className={styles.text_container}>
                        <h1 className={styles.text_title}>Happybd</h1>
                        <div className={styles.text_body}>
                            Never forget a birthday again
                    </div>
                    </div>
                    <a href="/auth/login">
                        <GoogleButton />
                    </a>
                </Container>
            </div>
        </div>
    )
}
