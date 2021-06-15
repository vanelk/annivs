import React,{Fragment} from 'react';
import propTypes from 'prop-types';
import joinStyles from '../../lib/joinStyles';
import styles from './style.module.scss';
function Button({loading, onClick, inactive, ...rest}) {
    const handleClick = (e)=>{
        if(loading) return e.preventDefault();
        if(inactive) return e.preventDefault();
        if(typeof onClick === 'function')
        onClick(e);
    }
    return (
        <button className={joinStyles(styles.btn, loading? styles.loading: null, inactive? styles.inactive: null)} onClick={handleClick} {...rest}>
            <div className={styles.btn_text}>
                {loading ?
                (<Fragment>
                    <div/><div/><div/><div/>
                </Fragment>)
                :rest.children}
            </div>
        </button>
    )
}
Button.propTypes = {
    loading: propTypes.bool,
    onClick: propTypes.func,
    inactive: propTypes.bool,
}
export default Button;