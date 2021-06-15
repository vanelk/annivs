import React from 'react';
import propTypes from 'prop-types';
import ClosablePane from "../../components/ClosablePane";

function NotificationsTab ({onClose}){
    return (
        <ClosablePane onClose={onClose}>
            Notifications
        </ClosablePane>
    )
}
NotificationsTab.propTypes ={
    onClose: propTypes.func.isRequired
}

export default NotificationsTab;