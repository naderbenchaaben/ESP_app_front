import { FETCH_COMPANY } from '../types'
const initialState = {
    company: localStorage.getItem('company')
}
export const companyReducer = ( state = initialState, action ) => {
    switch (action.type) {
        case FETCH_COMPANY:
            return {
                data: action.payload
            }
        default:
            return state
    }
}