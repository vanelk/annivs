import propTypes from 'prop-types'
import React from 'react'
import './style.scss'
export default function SettingsCard({ title, icon }) {
    return (
        <div className="settings-card">
            <div className="title">
                <div className="icon">
                    {icon}
                </div>
                {title}
            </div>
            <span className="icon-arrow-right2" />
        </div>
    )
}

SettingsCard.popTypes = {
    title: propTypes.string.isRequired,
    icon: propTypes.any
}