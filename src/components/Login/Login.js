import React, { Component } from "react";
import { Redirect, Link } from "react-router-dom";
import { loginAction } from '../../actions'
import { connect } from 'react-redux'
import './login.scss'
import axios from 'axios';
import { url } from 'config'
import imageform from '../../assets/login-form.svg'
import imgBackground from'../../assets/login-bg.svg'
import imgPerson from '../../assets/login-person.svg'
import screen1 from '../../assets/login-screen1.svg'
import screen2 from '../../assets/login-screen2.svg'
import screen3 from '../../assets/login-screen3.svg'
import imgIcons from '../../assets/login-icons.svg'
import {
  Badge,
  Button,   
  Card,
  Form,
  Navbar,
  Nav,
  Container,
  Row,
  Col
} from "react-bootstrap";
class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      
        email: null,
        password: null,
        error: '',
       
    };
    this.handleChange = this.handleChange.bind(this);  
}
handleChange (e) {
    
    this.setState({ [e.target.name]: e.target.value });
  };
  handleSubmit = (e) => {
    e.preventDefault();
    const { email , password } = this.state;
    if(!email){ this.setState({ error: 'veuillez saisir votre email' }) }
    if(!password){ this.setState({ error: 'veuillez saisir votre mot de passe' }) }
    if(!email && !password){ this.setState({ error: 'veuillez saisir votre email et mot de passe' }) }
    
    console.log(this.state);
    //console.log(JSON.stringify(this.state, null, 2));
    let data = JSON.stringify(this.state);
    console.log((data, null, 2));

    
    /*axios
      .post("http://localhost:3001/users", this.state)
      .then(res => console.log(res))
      .catch(err => console.log(err));*/
      
      

    // Entrez un mdp >= 6 caracteres
    // Il faut mentionner que le mot de passe minimum 6 caracteres avant d'envoyer au serveur ;) 
    axios.post(url +"/api/v1/sessions", {
     user:{
        email: email,
        password: password,

     }
    },
    
    ).then( res=>{
        if(res.data.logged_in) {
          this.props.loginAction(res.data.user)
          localStorage.setItem('user', JSON.stringify(res.data.user))
          console.log("Login response ", res.data.logged_in)
          console.log("Login response 1 ", res)
          console.log(this.props.user.data)
          
            console.log(localStorage.getItem("user"))
          
          //console.log(res.data.user)
        }
        }).catch(error =>{
          console.log("Login error ", error)
        })

    }
    render (){
        
        return(
            <div className="login">
               { this.props.user.login ? <Redirect to="admin/dashboard" /> : '' }  

                <div className="left">
                    <img className="background" src={imgBackground} alt="imgBackground"/>
                    <img className="person" src={imgPerson} alt="imgPerson"/>
                    <img className="screen1" src={screen1} alt="screen1"/>
                    <img className="screen2" src={screen2} alt="screen2"/>
                    <img className="screen3" src={screen3} alt="screen3"/>
                    <img className="icons" src={imgIcons} alt="imgIcons"/>
                </div>
                <div className="wrapper">
                    <img src={imageform} alt="imageform"/>
                    <form onSubmit={this.handleSubmit}>
                        <h2>connexion admin</h2>

                        <p className="error"> {this.error} </p> 
                        <br/>
                        <label style={{ top: '30px' }} htmlFor="Email">Email</label>
                        <br/>
                        <input onChange={this.handleChange} name="email" id="email" type="text"/>
                        <br/>
                        <label style={{ top: '100px' }} className="password" htmlFor="password">Password</label>
                        <br/>
                        <input onChange={this.handleChange} name="password" id="password" type="password"/>
                        
                        <button
                         type="submit"
                         onClick={this.handleSubmit}
                         >Login</button> 
                        
                       
                    </form>
                    <div className="a">
                   <Link
                    to="/Register"
                    >Créer un compte
                  </Link> 
                     </div>
                </div>  
                
                     
                    
            </div>
        );
    }
}
const mapStateToProps = (state) => {
  return({
      user: state.userReducer
      
  })
}    
    export default connect(mapStateToProps, {loginAction})(Login);
