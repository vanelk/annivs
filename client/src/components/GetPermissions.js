import React, { useState } from 'react'
import { useHistory } from 'react-router'
import Button from './Button'
import Container from './Container'

export default function GetPermissions() {
    const history  = useHistory();
    const [loading, setLoading] = useState(false)
    const handleClick = (e) =>{
        if(loading === true) return;
        let tab = window.open("http://localhost:5000/permissions", "_blank", "location=yes,height=570,width=520,scrollbars=yes,status=yes")    
        setLoading(true);
        setInterval(()=>{
            try{
                if(!tab.closed){
                    console.log(tab.location);
                } else {
                    setLoading(false)
                    history.go(0);
                }
            } catch(e){

            }
        }, 500)
    }
    return (
        <Container className="text-center">
            <h1 >Permissions</h1>
            <p>
                We need you to give us permission to access your google drive and spreadsheet to be able to use the app.
                Click The button bellow to authorize this.
            </p>
            <Button loading={loading} onClick={handleClick} >Authorize</Button>
        </Container>
    )


}
