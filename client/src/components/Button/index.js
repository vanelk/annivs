import React,{Fragment} from 'react';
import propTypes from 'prop-types';
import './style.scss';
function Button({loading, onClick, inactive, ...rest}) {
    const handleClick = (e)=>{
        if(loading) return e.preventDefault();
        if(inactive) return e.preventDefault();
        if(typeof onClick === 'function')
        onClick(e);
    }
    return (
        <button className={["btn", loading? "loading": null, inactive? "inactive": null].join(" ")} onClick={handleClick} {...rest}>
            <div className="btn_text">
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