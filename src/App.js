import React, { Component } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import Login from './components/Login/Login.js'
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
  return (
    <div className="App">
    <div>
    </div>
    <BrowserRouter>
  
        <Switch>
             
            <Route path="/admin" render={(props) => <AdminLayout {...props} loggedInStatus={this.state.loggedInStatus} />} />
            <Redirect from="/" to="/admin/dashboard" />
        </Switch>
        
 
  </BrowserRouter> 
    </div>
  );
}
    }
export default App;
