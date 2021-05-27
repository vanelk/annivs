import React, { useState } from 'react'
import Avatar, {randomAvatarImg, randomColor} from '../components/Avatar';
import BackButton, { back } from '../components/BackButton';
import Container from '../components/Container';
import Input from '../components/Input';
import Button from '../components/Button';
import FieldSet from '../components/FieldSet';
import { useMutation } from '@apollo/client';
import { ADD_INDIVIDUAL_MUTATION } from '../graphql/mutations';
import ErrorBox from '../components/ErrorBox';
const src = randomAvatarImg();
const color = randomColor();
export default function Add() {
    const [errors, setErrors] = useState({});
    const [values, setValues] = useState({
        name: "",
        date: ""
    });
    const [addIndividual, { loading }] = useMutation(ADD_INDIVIDUAL_MUTATION, {
        update() { back() },
        onError(err) {
            setErrors(err.graphQLErrors[0].extensions.errors);
        },
        variables: {
            name: values.name,
            date: values.date.replace(/-/g, '/')
        }
    });
    const handleChange = (ev) => {
        setValues({ ...values, [ev.target.name]: ev.target.value })
    }
    const handleSubmit = (ev) => {
        ev.preventDefault();
        addIndividual();
    }
    return (
        <Container className="add" variant="fluid">
            <BackButton />
            <form onSubmit={handleSubmit} className="text-center">
                <Container>
                    {
                        (Object.keys(errors).length > 0) && (
                            <ErrorBox className="mb-5">
                                <ul className="text-left">
                                    {Object.values(errors).map((value, i) => <li key={i}>{value}</li>)}
                                </ul>
                            </ErrorBox>
                        )
                    }
                    <Avatar variant="lg" src={src} color={color} className="m-auto" />
                    <FieldSet>
                        <Input error={errors.name ? true : false} onChange={handleChange} value={values.name} label="Name" name="name" placeholder="Ex: John Doe" />
                    </FieldSet>
                    <FieldSet>
                        <Input error={errors.birthdate ? true : false} onChange={handleChange} value={values.date} type="date" name="date" label="Birthdate" />
                    </FieldSet>
                    <div className="mt-11">
                        <Button loading={loading}>ADD</Button>
                    </div>
                </Container>
            </form>
        </Container>
    )
}
