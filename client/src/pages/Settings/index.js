import React, { useEffect, useState } from 'react';
import Container from '../../components/Container'
import BackButton from '../../components/BackButton';
import Button from '../../components/Button';
import ErrorMessage from '../../components/ErrorMessage';
import Avatar from '../../components/Avatar';
import {
    ExternalLink as ExternalLinkIcon,
    FluentArrowRight as FluentArrowRightIcon
} from '../../components/Icons';
import Select from '../../components/Select';
import Toggle from '../../components/Toggle';
import styles from './style.module.scss';
import { disablePush, enablePush, getSubscription, isPushNotificationSupported } from '../../services/service-worker';
import { FormattedMessage, useIntl } from 'react-intl';
import { locales } from '../../lib/i18n';
import { useAppState } from '../../context/app-context';
export default function Settings() {
    const [logoutLoading, setLogoutLoading] = useState(false);
    const [error, setError] = useState(null)
    const [isPushOn, setIsPushOn] = useState(false);
    const [isEmailOn, setIsEmailOn] = useState(false);
    const [theme, setTheme] = useState('auto');
    const { locale } = useIntl();
    const { setLocale } = useAppState();
    const [showPushNotifOption, setShowPushNotifOption] = useState(true);
    useEffect(() => {
        if (!isPushNotificationSupported() || Notification.permission === 'denied') {
            return setShowPushNotifOption(false);
        }
        getSubscription().then(subcription => {
            if (!subcription) {
                setIsPushOn(false);
            } else {
                setIsPushOn(true);
            }
        })
    }, [])
    const togglePush = async () => {
        if (isPushOn) {
            const [result, error] = await disablePush();
            if (error) setError(error);
            setIsPushOn(!result)
        } else {
            const [result, error] = await enablePush();
            if (error) setError(error);
            setIsPushOn(result);
        }
    }
    const toggleEmail = async () => {
        setIsEmailOn(!isEmailOn);
    }
    const openLink = (link) => () => {
        window.open(link, "_blank");
    }
    const handleChangeLocale = (value) => {
        setLocale(value);
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
                            <FormattedMessage id="settings-acc-section" />
                        </div>
                        <div className={styles.section_item} >
                            <div className={styles.flex}>
                                <Avatar src="https://picsum.photos/56" size="sm" />
                                <div className={styles.flex_1}>
                                    <div className={styles.name}>
                                        Vanel Stevy
                                    </div>
                                    <div className={styles.email}>
                                        test@email.com
                                    </div>
                                </div>
                                <button className={styles.more_btn}>
                                    <FluentArrowRightIcon />
                                </button>

                            </div>
                        </div>
                    </section>
                    <section id={styles.general_section}>
                        <div className={styles.section_heading}>
                            <FormattedMessage id="settings-gen-section" />
                        </div>
                        <div className={styles.section_item} >
                            <div className={styles.flex}>
                                <div className={styles.flex_1}>
                                    <FormattedMessage id="settings-theme-text" />
                                </div>
                                <Select defaultValue={theme} onChange={setTheme} values={[
                                    { text: 'Device Theme', value: 'auto' },
                                    { text: 'Dark Theme', value: 'dark' },
                                    { text: 'Light Theme', value: 'light' }
                                ]} />
                            </div>
                        </div>
                        <div className={styles.section_item} >
                            <div className={styles.flex}>
                                <div className={styles.flex_1}>
                                    <FormattedMessage id="settings-lang-text" />
                                </div>
                                <Select onChange={handleChangeLocale} defaultValue={locale} values={
                                    Object.keys(locales).map(locale=>({text: locales[locale].text, value:locale}))
                                } />
                            </div>
                        </div>
                    </section>
                    <section id={styles.contacts_section}>
                        <div className={styles.section_heading}>
                            <FormattedMessage id="settings-cont-section" />
                        </div>
                        <div className={styles.section_item} >
                            <div className={styles.flex}>
                                <div className={styles.flex_1}>
                                    <FormattedMessage id="settings-imp-cont-text" />
                                </div>
                                <FluentArrowRightIcon />
                            </div>
                        </div>
                        <div className={styles.section_item} >
                            <div className={styles.flex}>
                                <div className={styles.flex_1}> 
                                    <FormattedMessage id="settings-exp-cont-text" />
                                </div>
                                <FluentArrowRightIcon />
                            </div>
                        </div>
                    </section>
                    <section id={styles.notification_section}>
                        <div className={styles.section_heading}>

                            <FormattedMessage id="settings-notif-section" />
                        </div>
                        {
                            showPushNotifOption && (
                                <div className={styles.section_item} >
                                    <div className={styles.flex}>
                                        <div className={styles.flex_1}>
                                            <FormattedMessage id="settings-push-notif-text" />
                                        </div>
                                        <Toggle value={isPushOn} onChange={togglePush} />
                                    </div>
                                </div>
                            )
                        }
                        <div className={styles.section_item}>

                            <div className={styles.flex}>
                                <div className={styles.flex_1}>
                                    <FormattedMessage id="settings-email-notif-text" />
                                </div>
                                <Toggle value={isEmailOn} onChange={toggleEmail} />
                            </div>
                        </div>
                    </section>
                    <section id="help-info-section">
                        <div className={styles.section_heading}>
                            <FormattedMessage id="settings-help-section" />
                        </div>

                        <div onClick={openLink("/help")} className={styles.section_item}>
                            <div className={styles.flex}>
                                <div className={styles.flex_1}>
                                    <FormattedMessage id="settings-support-text" />
                                </div>
                                <ExternalLinkIcon />
                            </div>
                        </div>
                        <div onClick={openLink("https://github.com/vanelk/annivs/issues")} className={styles.section_item}>
                            <div className={styles.flex}>
                                <div className={styles.flex_1}>
                                    <FormattedMessage id="settings-report-text" />
                                </div>
                                <ExternalLinkIcon />
                            </div>
                        </div>
                    </section>
                    <div className={styles.btn_container}>
                        <Button loading={logoutLoading} onClick={logout}>
                            <FormattedMessage id="settings-signout" />
                        </Button>
                    </div>
                </div>
            </Container>
        </div>
    )
}