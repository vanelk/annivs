import { useQuery } from '@apollo/client';
import React, { useState } from 'react';
import propTypes from 'prop-types';
import { LIST_AVATARS_QUERY } from '../../graphql/queries';
import Avatar from '../Avatar';
import Button from '../Button';
import Container from '../Container'
import Error from '../Error';
import Loader from '../Loader';
import './style.scss';function AvatarEditor({ onClose, onChange, value }) {
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
        <div className="avatar-editor">
            <Container variant="fluid">
                <div className="close-btn-container">
                    <button className="close-button">
                        <span onClick={onClose} className="icon-close-square" />
                    </button>
                </div>
                <Avatar src={picture} className="m-auto" variant="lg" />
                <div className="avatars-container">
                    {
                        (data.listAvatars || []).map((a, i) =>
                            (<span className={picture === a ?"active":""} key={i} onClick={selectAvatar(a)}>
                                <Avatar className="m-auto" variant="sm" src={a} />
                            </span>)
                        )
                    }
                </div>
                <div className="btn-container">
                    <Button onClick={handleClick} inactive={value === picture}>Save</Button>
                </div>
            </Container>
        </div>
    )
}

AvatarEditor.propTypes = {
    onClose: propTypes.func,
    onChange: propTypes.func,
    value: propTypes.string
}

export default AvatarEditor;