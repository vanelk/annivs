import React, { useState } from 'react'
import Container from '../components/Container'
import BackButton from '../components/BackButton';
import Button from '../components/Button';
import SettingsCard from '../components/SettingsCard';
import './style.scss';
import { useHistory, useLocation } from 'react-router';
export default function Settings() {
    const history = useHistory();
    const { hash, pathname } = useLocation();
    const [logoutLoading, setLogoutLoading] = useState(false)
    const openLink = (link)=>_=>{
        window.open(link, "_blank");
    }
    const pushTab = (url) => _=>{
        history.push("#"+url, {
            from: pathname
        })
    }
    const logout = _=>{
        setLogoutLoading(true);
        window.location = "/auth/logout";
    }
    if(hash === "#profile") return <h1>Profile</h1>
    if(hash === "#contacts") return <h1>Contacts</h1>
    if(hash === "#notifications") return <h1>Notifications</h1>
    return (
        <div className="settings">
            <Container variant="fluid">
                <BackButton />
                <div className="settings-container">
                    <section className="account-section">
                        <div className="section-heading">
                            Account
                        </div>
                        <div onClick={pushTab("profile")} className="section-item">
                            <SettingsCard icon={<span className="icon icon-profile" />} title="Profile"/>
                        </div>
                        <div className="section-item" onClick={pushTab("contacts")}>
                            <SettingsCard icon={<span className="icon icon-contacts" />} title="Contacts"/>
                        </div>
                    </section>
                    <section className="privacy-security-section">
                        <div className="section-heading">
                            Privacy
                        </div>
                        <div className="section-item" onClick={pushTab("notifications")}>
                            <SettingsCard icon={<span className="icon icon-notification" />} title="Notifications"/>
                        </div>
                    </section>
                    <section className="help-info-section">
                        <div className="section-heading">
                            Help &amp; Information
                        </div>
                        <div className="section-item" onClick={openLink("/documents/privacy")}>
                            <SettingsCard icon={<span className="icon-privacy" />} title="Privacy Policy"/>
                        </div>
                        <div className="section-item" onClick={openLink("/documents/terms")}>
                            <SettingsCard icon={<span className="icon-document" />} title="Terms of Service"/>
                        </div>
                        <div className="section-item" onClick={openLink("/support")}>
                            <SettingsCard icon={<span className="icon-help" />} title="Support"/>
                        </div>
                    </section>
                    <div className="button-container">
                        <Button loading={logoutLoading} onClick={logout}>
                            Logout
                        </Button>
                    </div>
                </div>
            </Container>
        </div>
    )
}
