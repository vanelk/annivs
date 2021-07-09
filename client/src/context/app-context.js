import {createContext, useContext, useReducer} from 'react';
const defaultLocale = (navigator.userLanguage || navigator.language);
const AppContext = createContext({
    token: null,
    locale: defaultLocale
});
const appReducer = (state, action) => {
    switch(action.type){
        case 'ACCESS_TOKEN':
            return {
                ...state,
                token: action.payload
            }
        case 'LOCALE': 
            return {
                ...state,
                locale: action.payload
            }
        default:
            return state
    }
}
const AppProvider = ({children}) =>{
    const [appState, dispatch] = useReducer(appReducer, { token: null, locale: defaultLocale });
    const setAuthToken = (token)=>{
        dispatch({type: 'ACCESS_TOKEN', payload: token });
    }
    const setLocale = (locale) => {
        dispatch({type: 'LOCALE', payload: locale});
    }
    return (
        <AppContext.Provider value={{appState, setAuthToken, setLocale}}>
            {children}
        </AppContext.Provider>
    )
}
const useAppState = () => useContext(AppContext);
export { AppProvider, useAppState };