import React, { useState } from 'react'
import Avatar from '../../components/Avatar';
import BackButton, { back } from '../../components/BackButton';
import Container from '../../components/Container';
import Input from '../../components/Input';
import Button from '../../components/Button';
import Fieldset from '../../components/Fieldset';
import ErrorMessage from '../../components/ErrorMessage';
import { useMutation } from '@apollo/client';
import { ADD_INDIVIDUAL_MUTATION } from '../../graphql/mutations';
import AvatarEditor from '../../components/AvatarEditor';
import {Edit as EditIcon} from '../../components/Icons';
import styles from './style.module.scss';
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
    const toggleAvatarEditor = (e) => {
        e.preventDefault();
        setShowA(true);
    }
    if (showAvatarEditor) {
        return (<AvatarEditor value={values.picture} onClose={() => setShowA(false)} onChange={(p) => setValues({ ...values, picture: p })} />)
    }
    return (
        <div className={styles.add}>
            <Container variant="fluid">
                <BackButton />
                <form onSubmit={handleSubmit} className={styles.add_form}>
                    <Container>
                        {
                            (Object.keys(errors).length > 0) && (
                                <div className={styles.errmsg_container}>
                                    <ErrorMessage>
                                        <ul>
                                            {Object.values(errors).map((value, i) => <li key={i}>{value}</li>)}
                                        </ul>
                                    </ErrorMessage>
                                </div>
                            )
                        }
                        <div className={styles.avatar_container}>
                            <Avatar size="lg" src={values.picture} />
                        </div>
                        <Fieldset>
                            <button onClick={toggleAvatarEditor} className={styles.edit_button}>
                                <EditIcon /> Edit Avatar
                            </button>
                        </Fieldset>
                        <Fieldset>
                            <Input autoComplete="off" error={errors.name ? true : false} onChange={handleChange} value={values.name} label="Name" name="name" placeholder="Ex: John Doe" />
                        </Fieldset>
                        <Fieldset>
                            <Input error={errors.birthdate ? true : false} onChange={handleChange} value={values.date} type="date" name="date" label="Birthdate" />
                        </Fieldset>
                        <div className={styles.button_container}>
                            <Button loading={loading}>ADD</Button>
                        </div>
                    </Container>
                </form>
            </Container>
        </div>
    )
}
