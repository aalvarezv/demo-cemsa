import React, { useReducer } from 'react';
import AuthContext from './AuthContext';
import AuthReducer from './AuthReducer';

const AuthState = (props) => {

    const initialState = {
        usuario: null,
    }

    const [state, dispatch] = useReducer(AuthReducer, initialState);
 
    const usuarioAuth = usuario => {

        try {
            dispatch({
                type: 'USUARIO_AUTH_EXITO',
                payload: usuario
            });
        } catch (e) {
            console.log(e)
        }
    }

    const cerrarSesion = () => {

        try {
            dispatch({
                type: 'CERRAR_SESION',
            });
        } catch (e) {
            console.log(e)
        }

    }

    return (
        <AuthContext.Provider
            value={{
                usuario: state.usuario,
                usuarioAuth,
                cerrarSesion,
            }}
        >
            {props.children}
        </AuthContext.Provider>
    )

}

export default AuthState