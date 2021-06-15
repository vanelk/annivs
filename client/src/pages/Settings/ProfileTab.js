import React from 'react';
import propTypes from 'prop-types';
import Button from '../../components/Button';
import ClosablePane from '../../components/ClosablePane';

function ProfileTab({ onClose }) {
    return (
        <ClosablePane onClose={onClose}>
            <div>Name</div>
            <div className="button-container">
                <Button>Delete My Account</Button>
            </div>
        </ClosablePane>
    )
}
ProfileTab.propTypes = {
    onClose: propTypes.func.isRequired
}
export default ProfileTab