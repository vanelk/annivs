import React from 'react'
import Container from '../components/Container'
import BackButton from '../components/BackButton';
import Button from '../components/Button';
import SettingsCard from '../components/SettingsCard';
import './style.scss';
export default function Settings() {
    const openLink = (link)=>_=>{
        window.open(link)
    }
    const popUp = (msg) => _=>{
        alert(msg)
    }
    const goTo = (link) => _=>{
        window.location = link
    }
    return (
        <div className="settings">
            <Container variant="fluid">
                <BackButton />
                <Container>
                    <section className="account-section">
                        <div className="section-heading">
                            Account
                        </div>
                        <div className="section-item">
                            <SettingsCard icon={<span className="icon icon-profile" />} title="Profile"/>
                        </div>
                        <div className="section-item">
                            <SettingsCard icon={<span className="icon icon-contacts" />} title="Contacts"/>
                        </div>
                    </section>
                    <section className="privacy-security-section">
                        <div className="section-heading">
                            Privacy
                        </div>
                        <div className="section-item">
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
                        <div className="section-item" onClick={popUp("For any issues or security concerns use github: vanelk/hbd-pwa")}>
                            <SettingsCard icon={<span className="icon-help" />} title="Support"/>
                        </div>
                    </section>
                    <div className="button-container">
                        <Button onClick={goTo("/auth/logout")}>
                            Logout
                        </Button>
                    </div>
                </Container>

            </Container>
        </div>
    )
}
