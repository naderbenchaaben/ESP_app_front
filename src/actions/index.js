import { LOGIN,LOGOUT } from '../types'


export const userAction = (payload, login) => {
    return(dispatch) => {
        dispatch ({
            type: LOGIN,
            payload,
            login,
            
        })
    }
}

export const loginAction = ( payload) => {
    return (dispatch) => {
        dispatch({
            type: LOGIN,
            login : true,
            payload         
        })
    }
}

export const logoutAction = () => {
    return (dispatch) => {
      
        localStorage.removeItem('user')
        dispatch({
            type: LOGOUT,
            login : false,
            payload: null
        })
    }
}