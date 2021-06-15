import React, { useState } from 'react';
import Container from '../../components/Container'
import BackButton from '../../components/BackButton';
import Button from '../../components/Button';
import SettingsCard from '../../components/SettingsCard';
import { useHistory, useLocation } from 'react-router';
import ProfileTab from './ProfileTab';
import ContactsTab from './ContactsTab';
import NotificationsTab from './NotificationsTab';
import { 
    Profile as ProfileIcon, 
    Contacts as ContactsIcon,
    Notification as NotificationIcon,
    Document as DocumentIcon,
    Privacy as PrivacyIcon,
    Help as HelpIcon
 } from '../../components/Icons';
import styles from './style.module.scss';
export default function Settings() {
    const history = useHistory();
    const { hash, pathname } = useLocation();
    const [logoutLoading, setLogoutLoading] = useState(false)
    const openLink = (link)=> () =>{
        window.open(link, "_blank");
    }
    const pushTab = (url) => ()=>{
        history.push("#"+url, {
            from: pathname
        })
    }
    const logout = ()=>{
        setLogoutLoading(true);
        window.location = "/auth/logout";
    }
    const onClose = ()=>{
        history.push(pathname);
    }
    if(hash === "#profile") return <ProfileTab onClose={onClose}/>
    if(hash === "#contacts") return <ContactsTab onClose={onClose}/>
    if(hash === "#notifications") return <NotificationsTab onClose={onClose}/>
    return (
        <div className={styles.settings}>
            <Container variant="fluid">
                <BackButton />
                <div className={styles.settings_container}>
                    <section id="account-section">
                        <div className={styles.section_heading}>
                            Account
                        </div>
                        <div className={styles.section_item} onClick={pushTab("profile")} >
                            <SettingsCard icon={<ProfileIcon />} title="Profile"/>
                        </div>
                        <div className={styles.section_item} onClick={pushTab("contacts")}>
                            <SettingsCard icon={<ContactsIcon />} title="Contacts"/>
                        </div>
                    </section>
                    <section id="privacy-security-section">
                        <div className={styles.section_heading}>
                            Privacy
                        </div>
                        <div className={styles.section_item} onClick={pushTab("notifications")}>
                            <SettingsCard icon={<NotificationIcon />} title="Notifications"/>
                        </div>
                    </section>
                    <section id="help-info-section">
                        <div className={styles.section_heading}>
                            Help &amp; Information
                        </div>
                        <div className={styles.section_item} onClick={openLink("/documents/privacy")}>
                            <SettingsCard icon={<PrivacyIcon />} title="Privacy Policy"/>
                        </div>
                        <div className={styles.section_item} onClick={openLink("/documents/terms")}>
                            <SettingsCard icon={<DocumentIcon />} title="Terms of Service"/>
                        </div>
                        <div className={styles.section_item} onClick={openLink("/support")}>
                            <SettingsCard icon={<HelpIcon />} title="Support"/>
                        </div>
                    </section>
                    <div className={styles.btn_container}>
                        <Button loading={logoutLoading} onClick={logout}>
                            Logout
                        </Button>
                    </div>
                </div>
            </Container>
        </div>
    )
}