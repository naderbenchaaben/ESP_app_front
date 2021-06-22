import React, { Component } from "react";
import { Redirect, Link } from "react-router-dom";
import { loginAction } from '../../actions'
import { connect } from 'react-redux'
import './login.scss'
import axios from 'axios';
import { url } from 'config'
import imageform from '../../assets/login-form.svg'
import imgBackground from'../../assets/login-bg.svg'
import screen1 from '../../assets/login-screen1.svg'
import screen2 from '../../assets/login-screen2.svg'
import screen3 from '../../assets/login-screen3.svg'
import image1 from '../../assets/image1.jpg'
import currency_dollar_blue from '../../assets/currency_dollar_blue.jpg'
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
        echec: ''
       
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
    console.log(this.state.error)
    console.log(this.state);
   
    let data = JSON.stringify(this.state);
    console.log((data, null, 2));

    
    /*axios
      .post("http://localhost:3001/users", this.state)
      .then(res => console.log(res))
      .catch(err => console.log(err));*/
      
      

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
        }if(!email){ this.setState({ error: 'veuillez saisir votre email' }) }
        if(!password){ this.setState({ error: 'veuillez saisir votre mot de passe' }) }
        else {this.setState({ error: 'email ou mot de passe incorrect' })}
        }).catch(error =>{
          console.log("Login error ", error)
          this.setState({ echec: ' * la connexion a échoué veuillez réessayer' }) 
        })
        if( password && email ) {
          
          this.setState({ error: '' })}
    }
    render (){
        
        return(
            <div className="login">
               { this.props.user.login ? <Redirect to="admin/dashboard" /> : '' }  

                <div className="left">
                    <img className="background" src={imgBackground} alt="imgBackground"/>
                    
                    
                   
                    <img className="screen2" src={image1} />
                    <img className="screen33" src={currency_dollar_blue}/>
                    <img className="icons" src={imgIcons} alt="imgIcons"/>
                </div>
                <div className="wrapper">
                    <img src={imageform} alt="imageform"/>
                    <form onSubmit={this.handleSubmit}>
                        <h2>Connexion Admin d'Entreprise</h2>

                        
                        <br/>
                        <label style={{ top: '50px' }} htmlFor="Email">Email</label>
                        <br/>
                        <input onChange={this.handleChange} name="email" id="email" type="text"/>
                        <br/>
                        <label style={{ top: '135px' }} className="password" htmlFor="password">Password</label>
                        <br/>
                        <input onChange={this.handleChange} name="password" id="password" type="password"/>
                          
                        <button
                        class= "test"
                         type="submit"
                         onClick={this.handleSubmit}
                         >Se connecter</button> <p className="echec" > {this.state.echec} </p>
                        <p className="errorl" > {this.state.error} </p> 
                      
                    </form><br/>
                    
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
