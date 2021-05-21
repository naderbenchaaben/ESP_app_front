import { LOGIN,LOGOUT,FETCH_CATEGORIES,FETCH_COMPANY } from '../types'


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
export const categoryAction = (payload) => {
    return (dispatch) => {
        localStorage.setItem('categories', JSON.stringify(payload) )
        dispatch({
            type: FETCH_CATEGORIES,
            payload
        })

    }
}
export const companyAction = (payload) => {
    return (dispatch) => {
        localStorage.setItem('company', JSON.stringify(payload) )
        dispatch({
            type: FETCH_COMPANY,
            payload
        })

    }
}