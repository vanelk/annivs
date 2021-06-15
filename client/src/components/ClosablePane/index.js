import React from 'react';
import propTypes from 'prop-types';
import CloseButton from '../CloseButtion';
import Container from '../Container';
import styles from './style.module.scss';
function ClosablePane({children, onClose}) {
    return (
        <div className={styles.closable_pane}>
            <Container variant="fluid">
                <div className={styles.close_btn_container}>
                    <CloseButton onClick={onClose}/>
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
    children: propTypes.any
}

export default ClosablePane;