import { LOGIN, LOGOUT } from '../types'  

const initialState = {
    
    user: localStorage.getItem('user')
}
export const userReducer = ( state = initialState, action ) => {
    switch (action.type) {
        case LOGIN:
            return {
                
                data: action.payload,
                login: action.login
            }
        case LOGOUT:
            return {
                
                data: action.payload,
                login: action.login
            }
        default:
            return state
    }
}