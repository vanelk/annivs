import React, { useState } from 'react'
import Avatar,{randomAvatarImg, randomColor} from '../components/Avatar'
import BackButton, { back } from '../components/BackButton';
import Container from '../components/Container';
import { useParams } from 'react-router-dom';
import Button from '../components/Button';
import BirthdateCard from '../components/BirthdateCard';
import {FETCH_INDIVIDUAL_BY_ID_QUERY} from '../graphql/queries';
import { DELETE_INDIVIDUAL_BY_ID_MUTATION } from '../graphql/mutations';
import { useMutation, useQuery } from '@apollo/client';
import Loader from '../components/Loader';
import ErrorHandler from '../components/Error'
import Link from '../components/Link';
const color = randomColor();
const src = randomAvatarImg();
export default function Profile() {
    const { id } = useParams();
    const [errors, setErrors] = useState({delete:null, query: null})
    const {data, loading} = useQuery(FETCH_INDIVIDUAL_BY_ID_QUERY, {
        onError(e){
            setErrors({query: e.message})
        },
        variables: { id }
    })
    const [deleteIndividual, { loading: deleteLoading }] = useMutation(DELETE_INDIVIDUAL_BY_ID_MUTATION, {
        update(){
            back();
        },
        variables: { id }
    })
    if(loading ) return (<Loader/>);
    if(errors.query) return (<ErrorHandler error={errors.query}/>)
    const date = new Date(data?.getIndividual.birthdate.isoString);
    return (
        <Container variant="fluid">
            <BackButton />
            <Container>
                <Avatar variant="md" className="m-auto" src={src} color={color} />
                <div className="text-center mt-2">
                    <Link to={`/app/edit/${id}`} className="text-secondary"> Edit </Link>
                </div>
                <div className="mt-3 text-center">
                    <h1 className="mb-1"> {data?.getIndividual.name} </h1>
                    <h3 className="text-inactive mt-1">Today is {new Date(new Date() - date).getFullYear() - 1970} y.o</h3>
                    <BirthdateCard date={date} className="mt-6" />
                    <div className="mt-10">
                        <Button onClick={deleteIndividual} loading={deleteLoading?true:false}>DELETE</Button>
                    </div>
                </div>
            </Container>
        </Container>
    )
}
