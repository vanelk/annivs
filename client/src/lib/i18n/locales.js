import en_US_msgs from './en-US.json';
import fr_FR_msgs from './fr-FR.json';
const defaultLocale = 'en-US';

const locales = {
    'en-US': {
        text: 'English (US)',
        messages: en_US_msgs
    },
    'fr-FR': {
        text: 'Français (FR)',
        messages: fr_FR_msgs
    }
}
export { locales as default, defaultLocale};