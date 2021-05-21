import { combineReducers } from 'redux'   
import { categoriesReducer }  from './categories'
import { companyReducer }  from './company'

import { userReducer } from './user'



export default combineReducers({ userReducer ,categoriesReducer, companyReducer })