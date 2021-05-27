import React from 'react'
import DriveFileSelect from './DriveFileSelect';
import GetPermissions from './GetPermissions';
import Error from './Error';

export default function ErrorHandler({error}) {
    switch (error){
        case "Insufficient permissions":
            return <GetPermissions />;
        case "Spreadsheet not found":
            return <DriveFileSelect />;
        default:
            return <Error error={error} action="retry"/>
    }
}
