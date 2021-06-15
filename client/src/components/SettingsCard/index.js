import propTypes from 'prop-types'
import React from 'react'
import { ArrowRightLined as ArrowRightLinedIcon } from '../Icons';
import styles from './style.module.scss'
export default function SettingsCard({ title, icon }) {
    return (
        <div className={styles.settings_card}>
            <div className={styles.settings_card__title}>
                <div className={styles.icon}>
                    {icon}
                </div>
                {title}
            </div>
            <ArrowRightLinedIcon/>
        </div>
    )
}

SettingsCard.popTypes = {
    title: propTypes.string.isRequired,
    icon: propTypes.any
}