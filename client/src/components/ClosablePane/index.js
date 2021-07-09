import React from 'react';
import propTypes from 'prop-types';
import Container from '../Container';
import {
    CloseSquare as CloseSquareIcon
} from '../Icons';
import styles from './style.module.scss';
function ClosablePane({ children, onClose }) {
    return (
        <div className={styles.closable_pane}>
            <Container variant="fluid">
                <div className={styles.close_btn_container}>
                    <button onClick={onClose} className={styles.close_button}>
                        <CloseSquareIcon />
                    </button>
                </div>
                <div className={styles.main_content}>
                    {children}
                </div>
            </Container>
        </div>
    )
}
ClosablePane.propTypes = {
    onClose: propTypes.func.isRequired,
    children: propTypes.node
}

export default ClosablePane;