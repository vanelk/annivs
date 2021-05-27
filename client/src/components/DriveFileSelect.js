import { useMutation, useQuery } from '@apollo/client'
import React, { useState } from 'react'
import { useHistory } from 'react-router';
import { UPDATE_SPREADSHEET_ID } from '../graphql/mutations';
import { FETCH_DRIVE_FILES } from '../graphql/queries'
import Button from './Button';
import Container from './Container';
import FileItem from './FileItem';
import Loader from './Loader';

export default function DriveFileSelect() {
    const history = useHistory();
    const { data, loading } = useQuery(FETCH_DRIVE_FILES);
    const [selected, setSelected] = useState(null);
    const [errors, setErrors] = useState(null)
    const [setSpreadSheetID, {loading: updateLoading}] = useMutation(UPDATE_SPREADSHEET_ID, {
        update() { history.go(0) },
        onError(err) {
            setErrors(err.graphQLErrors[0].extensions.errors);
        },
        variables:{
            spreadsheetId: selected
        }
    });
    const handleChange = (e)=>{
        setSelected(e.target.id)
    }
    const handleClick = ()=>{
        setSpreadSheetID();
    }
    if (loading) return (<Loader />)
    return (
        <Container>
            <h2>Drive Files</h2>
            <p className="text-inactive">Select a spreadsheet to store data</p>
            <div className="file-list-container" onChange={handleChange}>
                {
                    data.listDriveSpreadSheets.map(({ name, id }) => <FileItem name={name} id={id} key={id}></FileItem>)
                }
            </div>
            <div className="mt-5 text-center">
                <Button loading={updateLoading} onClick={handleClick} inactive={selected ===  null ? true: false}>Select</Button>
            </div>
        </Container>
    )
}
