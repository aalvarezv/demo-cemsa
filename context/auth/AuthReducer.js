
const AuthReducer = (state, action) => {
   
    switch (action.type) {
        
        case 'USUARIO_AUTH_EXITO':
            return{
                ...state,
                usuario: action.payload,
               
            }
        case 'CERRAR_SESION':
            return{
                ...state,
                usuario: null,
               
            }
        
        default:
            return state
    }

}

export default AuthReducer;