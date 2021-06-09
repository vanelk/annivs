import React, { useState } from 'react'
import Avatar from '../components/Avatar';
import BackButton, { back } from '../components/BackButton';
import Container from '../components/Container';
import Input from '../components/Input';
import Button from '../components/Button';
import Fieldset from '../components/Fieldset';
import Loader from '../components/Loader';
import Error from '../components/Error';
import ErrorMessage from '../components/ErrorMessage';
import { dateToYMD } from '../components/Calendar';
import { useMutation, useQuery } from '@apollo/client';
import { UPDATE_INDIVIDUAL_BY_ID_MUTATION } from '../graphql/mutations';
import { FETCH_INDIVIDUAL_BY_ID_QUERY } from '../graphql/queries';
import { useParams } from 'react-router-dom';
import AvatarEditor from '../components/AvatarEditor';
export default function Edit() {
    const { id } = useParams();
    const [errors, setErrors] = useState({ update: {}, query: null });
    const [values, setValues] = useState({ name: '', date: '', picture: '/avatars/0' });
    const [showAvatarEditor, setShowA] = useState(false);
    const { data, loading } = useQuery(FETCH_INDIVIDUAL_BY_ID_QUERY, {
        onCompleted(data) {
            setValues({
                name: data?.getContactById?.name,
                date: data?.getContactById?.birthdate,
                picture: data?.getContactById?.picture
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
        let picture = null;
        if (values.name !== data?.getContactById?.name) { name = values.name }
        if (values.date !== data?.getContactById?.birthdate) {
            birthdate = values.date?.replace(/-/g, '/')
        }
        if (values.picture !== data?.getContactById?.picture) {
            picture = values.picture
        }
        return { id, birthdate, name, picture }
    }
    const handleChange = (ev) => {
        setValues({ ...values, [ev.target.name]: ev.target.value })
    }
    const handleSubmit = (ev) => {
        ev.preventDefault();
        updateIndividual();
    }
    const toggleAvatarEditor = (e) => {
        e.preventDefault();
        setShowA(true);
    }
    if (errors.query) return (<Error error={errors.query} />)
    if (loading) return (<Loader />);
    if (showAvatarEditor) {
        return (<AvatarEditor value={values.picture} onClose={() => setShowA(false)} onChange={(p) => setValues({ ...values, picture: p })} />)
    }
    return (
        <div className="edit">
            <Container variant="fluid">
                <BackButton />
                <form onSubmit={handleSubmit} className="edit-form">
                    <Container>
                        {
                            (Object.keys(errors?.update || {}).length > 0) && (
                                <div className="errmsg-container">
                                    <ErrorMessage>
                                        <ul >
                                            {Object.values(errors.update).map((value, i) => <li key={i}>{value}</li>)}
                                        </ul>
                                    </ErrorMessage>
                                </div>
                            )
                        }
                        <div className="avatar-container">
                            <Avatar variant="lg" src={values.picture} />
                        </div>
                        <Fieldset>
                            <button onClick={toggleAvatarEditor} className="edit-button">
                                <span className="icon-edit" /> Edit Avatar
                            </button>
                        </Fieldset>
                        <Fieldset>
                            <Input autoComplete="off" error={errors?.update?.name ? true : false} onChange={handleChange} value={values.name} label="Name" name="name" placeholder="Ex: John Doe" />
                        </Fieldset>
                        <Fieldset>
                            <Input error={errors?.update?.birthdate ? true : false} onChange={handleChange} value={dateToYMD(new Date(values.date))} type="date" name="date" label="Birthdate" />
                        </Fieldset>
                        <div className="button-container">
                            <Button loading={updateLoading}>UPDATE</Button>
                        </div>
                    </Container>
                </form>
            </Container>
        </div>
    )
}
