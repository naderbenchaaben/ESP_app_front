import React, { Component } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import { connect } from 'react-redux'
import Login from './components/Login/Login.js'
import Register from './components/Register/Register.js'
import AdminLayout from "layouts/Admin.js";
import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/css/animate.min.css";
import "./assets/scss/light-bootstrap-dashboard-react.scss?v=2.0.0";
import "./assets/css/demo.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
//const App = () =>{
    class App extends Component{
        constructor(){
            super();
            this.state = {
                loggedInStatus: "Not_LOGGED_IN",
                user: {}
            }
        }
render(){
  const { user } = this.props
  return (
    
    
    <BrowserRouter>
      {
      user.login ?
        <Switch>
            <Route exact path = "/"><Login/></Route>
            <Route path = "/register"><Register/></Route>
            <Route path="/admin" render={(props) => <AdminLayout {...props}  />} />
            <Redirect from="/" to="/admin/dashboard" />
        </Switch>
        :
        <Switch>
            <Route exact path = "/"><Login/></Route>
            <Route path = "/register"><Register/></Route>
        </Switch>

      }
  </BrowserRouter> 
    
  );
}}
const mapStateToProps = (state) => {
    return({
        user: state.userReducer
    })
  }
  
  export default connect(mapStateToProps)(App);
