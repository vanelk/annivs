import React, { useState } from 'react'
import BackButton, { back } from '../../components/BackButton';
import Container from '../../components/Container';
import { useMutation } from '@apollo/client';
import { ADD_INDIVIDUAL_MUTATION } from '../../lib/graphql/mutations';
import AddBD from '../../components/Forms/AddBD';
import styles from './style.module.scss';
export default function Add() {
    const [errors, setErrors] = useState({});
    const [formLoading, setFormLoading] = useState(false);
    const [values, setValues] = useState({ name: '', date: undefined, picture: '/avatars/0' });
    const [ addIndividual ] = useMutation(ADD_INDIVIDUAL_MUTATION, {
        update() { back() },
        onError(err) {
            setFormLoading(false);
            setErrors(err.graphQLErrors[0].extensions.errors);
        },
        variables: getRequestVariables()
    });
    
    const handleChange = (value) => {
        setValues({ ...values, ...value});
    }
    function getRequestVariables() {
        let name = values.name;
        let date = values.date;
        let picture = values.picture;
        return { date, name, picture }
    }
    const handleSubmit = (newValues) => {
        setFormLoading(true);
        setValues(newValues);
        addIndividual();
    }
    return (
        <div className={styles.add}>
            <Container variant="fluid">
                <BackButton />
                <AddBD onSubmit={handleSubmit} values={values} errors={errors} onChange={handleChange} loading={formLoading} />
            </Container>
        </div>
    )
}
