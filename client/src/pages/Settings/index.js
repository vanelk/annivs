import React, { useEffect, useState } from 'react';
import Container from '../../components/Container'
import BackButton from '../../components/BackButton';
import Button from '../../components/Button';
import SettingsCard from '../../components/SettingsCard';
import ErrorMessage from '../../components/ErrorMessage';
import Avatar from '../../components/Avatar';
import {
    Document as DocumentIcon,
    Privacy as PrivacyIcon,
    Help as HelpIcon,
    Ellipsis as EllipsisIcon
} from '../../components/Icons';
import styles from './style.module.scss';
import { disablePush, enablePush, getSubscription, isPushNotificationSupported } from '../../serviceWorker';
import Toggle from '../../components/Toggle';
export default function Settings() {
    const [logoutLoading, setLogoutLoading] = useState(false);
    const [error, setError] = useState(null)
    const [isPushOn, setIsPushOn] = useState(false);
    const [isEmailOn, setIsEmailOn] = useState(false);
    useEffect(() => {
        if (!isPushNotificationSupported()) {
            return setError('Push messaging not supported by browser');
        }
        if (Notification.permission === 'denied') {
            return setError('Push notifications disabled on browser');
        }
        getSubscription().then(subcription => {
            if (!subcription) {
                setIsPushOn(false);
            } else {
                setIsPushOn(true);
            }
        })
    }, [])
    const changePush = async () => {
        if (isPushOn) {
            const [result, error] = await disablePush()
            if (error) setError(error);
            setIsPushOn(!result)
        } else {
            const [result, error] = await enablePush()
            if (error) setError(error);
            setIsPushOn(result);
        }
    }
    const changeEmail = async () => {
        setIsEmailOn(!isEmailOn);
    }
    const openLink = (link) => () => {
        window.open(link, "_blank");
    }
    const logout = () => {
        setLogoutLoading(true);
        window.location = "/auth/logout";
    }
    return (
        <div className={styles.settings}>
            <Container variant="fluid">
                <BackButton />
                <div className={styles.settings_container}>
                    {error && (
                        <ErrorMessage >
                            {error}
                        </ErrorMessage>
                    )}
                    <section id={styles.account_section}>
                        <div className={styles.section_heading}>
                            Account
                        </div>
                        <div className={styles.section_item} >
                            <div className={styles.flex}>
                                <Avatar src="https://picsum.photos/seed/picsum/150" size="sm" />
                                <div className={styles.flex_1}>
                                    <div className={styles.name}>
                                        Vanel Stevy
                                    </div>
                                    <div className={styles.email}>
                                        test@email.com
                                    </div>
                                </div>
                                <button className={styles.more_btn}>
                                    <EllipsisIcon />
                                </button>

                            </div>
                        </div>
                    </section>
                    <section id={styles.contacts_section}>
                        <div className={styles.section_heading}>
                            Contacts
                        </div>
                        <div className={styles.section_item} >
                            Import Contacts
                        </div>
                        <div className={styles.section_item} >
                            Export Contacts
                        </div>
                    </section>
                    <section id={styles.notification_section}>
                        <div className={styles.section_heading}>
                            Notifications
                        </div>
                        <div className={styles.section_item} >
                            <div className={styles.flex}>
                                <div className={styles.flex_1}>
                                    Push Notifications
                                </div>
                                <Toggle value={isPushOn} onChange={changePush} />
                            </div>
                        </div>
                        <div className={styles.section_item}>

                            <div className={styles.flex}>
                                <div className={styles.flex_1}>
                                    Email Notifications
                                </div>
                                <Toggle value={isEmailOn} onChange={changeEmail} />
                            </div>
                        </div>
                    </section>
                    <section id="help-info-section">
                        <div className={styles.section_heading}>
                            Help &amp; Information
                        </div>
                        <div className={styles.section_item} onClick={openLink("/documents/privacy")}>
                            <SettingsCard icon={<PrivacyIcon />} title="Privacy Policy" />
                        </div>
                        <div className={styles.section_item} onClick={openLink("/documents/terms")}>
                            <SettingsCard icon={<DocumentIcon />} title="Terms of Service" />
                        </div>
                        <div className={styles.section_item} onClick={openLink("/support")}>
                            <SettingsCard icon={<HelpIcon />} title="Support" />
                        </div>
                    </section>
                    <div className={styles.btn_container}>
                        <Button loading={logoutLoading} onClick={logout}>
                            Log Out
                        </Button>
                    </div>
                </div>
            </Container>
        </div>
    )
}