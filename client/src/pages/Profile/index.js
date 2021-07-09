import React, { useState } from 'react'
import { useMutation, useQuery } from '@apollo/client';
import Avatar from '../../components/Avatar'
import BackButton, { back } from '../../components/BackButton';
import Container from '../../components/Container';
import BirthdateCard from '../../components/BirthdateCard';
import Loader from '../../components/Loader';
import Error from '../../components/Error'
import { useParams } from 'react-router-dom';
import Link from '../../components/Link';
import { FETCH_INDIVIDUAL_BY_ID_QUERY } from '../../lib/graphql/queries';
import { DELETE_INDIVIDUAL_BY_ID_MUTATION } from '../../lib/graphql/mutations';
import FloatingButton from '../../components/FloatingButton';
import { Edit as EditIcon, Ellipsis as EllipsisIcon } from '../../components/Icons';
import Paper from '../../components/Paper';
import MenuList from '../../components/MenuList';
import MenuItem from '../../components/MenuItem';
import styles from './style.module.scss';
export default function Profile() {
    const { id } = useParams();
    const [errors, setErrors] = useState({ delete: null, query: null });
    const [menuOpen, setMenuOpen] = useState(false);
    const { data, loading } = useQuery(FETCH_INDIVIDUAL_BY_ID_QUERY, {
        fetchPolicy: 'cache-and-network',
        onError(e) {
            setErrors({ query: e.message })
        },
        variables: { id }
    })
    const [deleteIndividual, { loading: deleteLoading }] = useMutation(DELETE_INDIVIDUAL_BY_ID_MUTATION, {
        update() {
            back();
        },
        variables: { id }
    })
    const openMenu = () => {
        setMenuOpen(true);
        document.body.addEventListener('click', closeMenu)
    }
    const closeMenu = (ev) => {
        let menu = document.querySelector("#menu-target");
        if(!menu) return document.body.removeEventListener('click', closeMenu)
        if(!menu.contains(ev.target)){
            setMenuOpen(false);
            document.body.removeEventListener('click', closeMenu)
        }
    }
    const handleDelete = () => {
        setMenuOpen(false);
        deleteIndividual();
    }
    if (loading || deleteLoading) return (<Loader />);
    if (errors.query) return (<Error error={errors.query} />)
    const date = new Date(data?.getContactById?.birthdate);
    const name = (data?.getContactById?.name);
    return (
        <div className={styles.profile}>
            <Container variant="fluid">
                <div className={styles.app_bar}>
                    <div className={styles.main_btn}>
                        <BackButton />
                    </div>
                    <div id="menu-target" className={styles.menu_container}>
                        <button onClick={openMenu} className={styles.menu_action}>
                            <EllipsisIcon />
                        </button>
                        {menuOpen && (
                            <div className={styles.menu_wrapper}>
                                <Paper>
                                    <MenuList>
                                        <MenuItem onClick={handleDelete}>
                                            Delete
                                        </MenuItem>
                                    </MenuList>
                                </Paper>
                            </div>
                        )}
                    </div>
                </div>
                <Container>
                    <div className={styles.profile_avatar_wrapper}>
                        <div className={styles.avatar_container}>
                            <Avatar size="md" src={data?.getContactById?.picture} />
                        </div>
                    </div>
                    <div className={styles.profile_container}>
                        <h1 className={styles.text_title}> {name} </h1>
                        <h3 className={styles.text_body}>Today is {new Date(new Date() - date).getFullYear() - 1970} y.o</h3>
                        <div className={styles.card_container}>
                            <BirthdateCard date={date} />
                        </div>
                        <Link to={`/app/edit/${id}`} >
                            <FloatingButton>
                                <EditIcon />
                            </FloatingButton>
                        </Link>
                    </div>
                </Container>
            </Container>
        </div >
    )
}