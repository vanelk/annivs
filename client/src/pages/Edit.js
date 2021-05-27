import React, { useState } from 'react'
import Avatar, {randomAvatarImg, randomColor} from '../components/Avatar';
import BackButton, { back } from '../components/BackButton';
import Container from '../components/Container';
import Input from '../components/Input';
import Button from '../components/Button';
import FieldSet from '../components/FieldSet';
import { useMutation, useQuery } from '@apollo/client';
import { UPDATE_INDIVIDUAL_BY_ID_MUTATION } from '../graphql/mutations';
import { FETCH_INDIVIDUAL_BY_ID_QUERY } from '../graphql/queries';
import ErrorBox from '../components/ErrorBox';
import { useParams } from 'react-router-dom';
import Loader from '../components/Loader';
import ErrorHandler from '../components/ErrorHandler';
const src = randomAvatarImg();
const color = randomColor();
export default function Edit() {
    const { id } = useParams();
    const [errors, setErrors] = useState({ update: {}, query: null });
    const [values, setValues] = useState({ name: '', date: '' });
    const { data, loading } = useQuery(FETCH_INDIVIDUAL_BY_ID_QUERY, {
        onCompleted(data) {
            setValues({
                name: data?.getIndividual.name,
                date: data?.getIndividual.birthdate.isoString.substr(0, 10)
            })
        },
        onError(e) {
            setErrors({ query: e.message })
        },
        variables: { id }
    })
    const [updateIndividual, { loading: updateLoading }] = useMutation(UPDATE_INDIVIDUAL_BY_ID_MUTATION, {
        update() {
            back();
        },
        onError(err) {
            setErrors({ update: err?.graphQLErrors[0]?.extensions.errors });
        },
        variables: getRequestParams()
    });
    function getRequestParams() {
        let birthdate = null;
        let name = null;
        if (values.name !== data?.getIndividual.name) { name = values.name }
        if (values.date !== data?.getIndividual.birthdate.isoString.substr(0, 10)) {
            birthdate = values.date?.replace(/-/g, '/')
        }
        return { id, birthdate, name }
    }
    const handleChange = (ev) => {
        setValues({ ...values, [ev.target.name]: ev.target.value })
    }
    const handleSubmit = (ev) => {
        ev.preventDefault();
        updateIndividual();
    }
    if (errors.query) return (<ErrorHandler error={errors.query} />)
    if (loading ) return (<Loader />);
    return (
        <Container className="edit" variant="fluid">
            <BackButton />
            <form onSubmit={handleSubmit} className="text-center">
                <Container>
                    {
                        (Object.keys(errors?.update).length > 0) && (
                            <ErrorBox className="mb-5">
                                <ul className="text-left">
                                    {Object.values(errors.update).map((value, i) => <li key={i}>{value}</li>)}
                                </ul>
                            </ErrorBox>
                        )
                    }
                    <Avatar variant="lg" src={src} color={color} className="m-auto" />
                    <FieldSet>
                        <Input error={errors.update.name ? true : false} onChange={handleChange} value={values.name} label="Name" name="name" placeholder="Ex: John Doe" />
                    </FieldSet>
                    <FieldSet>
                        <Input error={errors.update.birthdate ? true : false} onChange={handleChange} value={values.date} type="date" name="date" label="Birthdate" />
                    </FieldSet>
                    <div className="mt-11">
                        <Button loading={updateLoading}>UPDATE</Button>
                    </div>
                </Container>
            </form>
        </Container>
    )
}
