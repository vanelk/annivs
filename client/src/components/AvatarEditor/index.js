import { useQuery } from '@apollo/client';
import React, { useState } from 'react';
import propTypes from 'prop-types';
import { LIST_AVATARS_QUERY } from '../../graphql/queries';
import Avatar from '../Avatar';
import Button from '../Button';
import Error from '../Error';
import Loader from '../Loader';
import styles from './style.module.scss';
import ClosablePane from '../ClosablePane';
function AvatarEditor({ onClose, onChange, value }) {
    const { data, loading, error } = useQuery(LIST_AVATARS_QUERY);
    const [picture, setPicture] = useState(value);
    const handleClick = (e) => {
        onChange(picture);
        onClose();
    }
    if (loading) return (<Loader />);
    if (error) return (<Error error={error}/>);
    const selectAvatar = (avatar) => () => {
        setPicture(avatar);
    }
    return (
        <div className={styles.avatar_editor}>
            <ClosablePane onClose={onClose}>
                <div className={styles.avatar_container}>
                    <Avatar src={picture} size="lg" />
                </div>
                <div className={styles.avatars_container}>
                    {
                        (data.listAvatars || []).map((a, i) =>
                            (<span role="button" className={`${styles.avatar_btn} ${picture === a ?styles.active:""}`} key={i} onClick={selectAvatar(a)}>
                                <Avatar size="sm" transparent src={a} />
                            </span>)
                        )
                    }
                </div>
                <div className={styles.btn_container}>
                    <Button onClick={handleClick} inactive={value === picture}>Save</Button>
                </div>
            </ClosablePane>
        </div>
    )
}

AvatarEditor.propTypes = {
    onClose: propTypes.func,
    onChange: propTypes.func,
    value: propTypes.string
}

export default AvatarEditor;