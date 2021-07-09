import React, { useState } from 'react'
import Button from '../Button';
import Fieldset from '../Fieldset';
import Input from '../Input';
import { Edit as EditIcon } from '../Icons';
import Avatar from '../Avatar';
import Container from '../Container';
import AvatarSelect from './AvatarSelect';
import DatePicker from '../DatePicker';
import styles from './add-bd.module.scss';
export default function PersonForm({ values, onSubmit, errors, loading, onChange }) {
    
    const handleChange = (ev) => {
        onChange({[ev.target.name]: ev.target.value })
    }
    const [showAvatarEditor, setShowA] = useState(false);
    const handleSubmit = (ev) => {
        ev.preventDefault();
        onSubmit(values);
    }
    const onEditAvatar = (ev) => {
        ev.preventDefault();
        setShowA(true);
    }
    if(showAvatarEditor) return <AvatarSelect value={values.picture} onClose={() => setShowA(false)} onChange={(p) => onChange({ picture: p })} />
    return (
        <form onSubmit={handleSubmit} className={styles.person_form}>
            <Container >
                <div className={styles.avatar_container}>
                    <Avatar size="md" src={values.picture} />
                </div>
                <Fieldset>
                    <button onClick={ onEditAvatar } className={styles.edit_button}>
                        <EditIcon /> Edit Avatar
                    </button>
                </Fieldset>
                <Fieldset>
                    <Input autoComplete="off" error={errors.name} onChange={handleChange} value={values.name} label="Full Name" name="name" placeholder="Ex: John Doe" />
                </Fieldset>
                <Fieldset>
                    <DatePicker error={errors.birthdate} onChange={handleChange} value={ values.date } name="date" label="Birthdate" />
                </Fieldset>
                <div className={styles.btn_container}>
                    <Button loading={loading}>Save</Button>
                </div>
            </Container>
        </form>
    )
}
