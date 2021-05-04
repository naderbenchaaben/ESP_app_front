import React from 'react'
import { connect } from 'react-redux'
import { Route, Redirect } from "react-router-dom";
function ProtectedRoute({component: Component, ...rest}){
    return(
        <Route
        {...rest}
        render={(props) =>{
            if(rest.user.login)  {
                return<Component/>;
            }else{
                return(
                    <Redirect to={{ pathname: "/", state: {from: props.location}}}/>
                );
            }
        }
        
        }
        />
    );
}
const mapStateToProps = (state) => {
    return({
        user: state.userReducer
        
    })
  } 
export default connect(mapStateToProps) (ProtectedRoute);
