import React, { useState } from 'react'
import Avatar from '../components/Avatar/index';
import BackButton, { back } from '../components/BackButton/index';
import Container from '../components/Container/index';
import Input from '../components/Input/index';
import Button from '../components/Button/index';
import Fieldset from '../components/Fieldset/index';
import ErrorMessage from '../components/ErrorMessage/index';
import { useMutation } from '@apollo/client';
import { ADD_INDIVIDUAL_MUTATION } from '../graphql/mutations';
import AvatarEditor from '../components/AvatarEditor';
export default function Add() {
    const [errors, setErrors] = useState({});
    const [values, setValues] = useState({ name: '', date: '', picture: '/avatars/0' });
    const [showAvatarEditor, setShowA] = useState(false);
    const [addIndividual, { loading }] = useMutation(ADD_INDIVIDUAL_MUTATION, {
        update() { back() },
        onError(err) {
            setErrors(err.graphQLErrors[0].extensions.errors);
        },
        variables: {
            name: values.name,
            date: values.date.replace(/-/g, '/'),
            picture: values.picture
        }
    });
    const handleChange = (ev) => {
        setValues({ ...values, [ev.target.name]: ev.target.value })
    }
    const handleSubmit = (ev) => {
        ev.preventDefault();
        addIndividual();
    }
    const toggleAvatarEditor  = (e)=>{
        e.preventDefault();
        setShowA(true);
    }
    if(showAvatarEditor){
        return (<AvatarEditor value={values.picture} onClose={()=>setShowA(false)} onChange={(p)=>setValues({...values, picture:p})}/>)
    }
    return (
        <div className="add">
            <Container variant="fluid">
                <BackButton />
                <form onSubmit={handleSubmit} className="add-form">
                    <Container>
                        {
                            (Object.keys(errors).length > 0) && (
                                <ErrorMessage className="errmsg">
                                    <ul>
                                        {Object.values(errors).map((value, i) => <li key={i}>{value}</li>)}
                                    </ul>
                                </ErrorMessage>
                            )
                        }
                        <Avatar variant="lg" src={values.picture} className="m-auto" />
                        <Fieldset className="edit-avatar">
                            <button onClick={toggleAvatarEditor} className="edit-button">
                                <span className="icon-edit"/> Edit Avatar
                            </button>
                        </Fieldset>
                        <Fieldset>
                            <Input error={errors.name ? true : false} onChange={handleChange} value={values.name} label="Name" name="name" placeholder="Ex: John Doe" />
                        </Fieldset>
                        <Fieldset>
                            <Input error={errors.birthdate ? true : false} onChange={handleChange} value={values.date} type="date" name="date" label="Birthdate" />
                        </Fieldset>
                        <div className="button-container">
                            <Button loading={loading}>ADD</Button>
                        </div>
                    </Container>
                </form>
            </Container>
        </div>
    )
}
