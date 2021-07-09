import React, { Fragment } from 'react';
import { IntlProvider } from 'react-intl';
import locales, { defaultLocale } from './locales';
const Provider = ({ children, locale = defaultLocale }) => (
    <IntlProvider textComponent={Fragment}
        locale={locale}
        messages={locales[locale].messages}
    >
        {children}
    </IntlProvider>
)
export default Provider;