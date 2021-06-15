import propTypes from "prop-types"
import ClosablePane from "../../components/ClosablePane"

function ContactsTab ({onClose}){
    return (
        <ClosablePane onClose={onClose}>
            Contacts
        </ClosablePane>
    )
}

ContactsTab.propTypes = {
    onClose: propTypes.func.isRequired
}
export default ContactsTab;