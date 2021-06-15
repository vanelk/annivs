import {createContext, useContext, useReducer} from 'react';

const AppContext = createContext({
    token: null,
});
const appReducer = (state, action) => {
    switch(action.type){
        case 'ACCESS_TOKEN':
            return {
                ...state,
                token: action.payload
            }
        default:
            return state
    }
}
const AppProvider = ({children}) =>{
    const [appState, dispatch] = useReducer(appReducer, { token: null });
    const setAuthToken = (token)=>{
        dispatch({type: 'ACCESS_TOKEN', payload: token });
    }
    return (
        <AppContext.Provider value={{appState, setAuthToken}}>
            {children}
        </AppContext.Provider>
    )
}
const useAppState = () => useContext(AppContext);
export { AppProvider, useAppState };