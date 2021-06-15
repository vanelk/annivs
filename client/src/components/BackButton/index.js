import React from 'react';
import {useHistory, useLocation} from  'react-router-dom';
import {ArrowLeftCircle as ArrowLeftCircleIcon} from '../Icons';
import styles from './style.module.scss';
var back;
function BackButton() {
    const history = useHistory();
    const { state } = useLocation();
    back = () => {
        if(state?.from){
            history.goBack();
        } else {
            history.push("/app");
        }
    }
    return (
        <button aria-label="back" onClick={back} className={styles.back_btn}>
            <ArrowLeftCircleIcon/> 
        </button>
    )
}

export {BackButton as default, back}