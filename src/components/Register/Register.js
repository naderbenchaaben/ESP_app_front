import React, { Component } from "react";
import { Redirect } from "react-router-dom";
//import jwt_decode from 'jwt-decode';
import './register.scss'
import axios from 'axios';
import { url, headers } from 'config'
import imageform from '../../assets/login-form.svg'
import imgBackground from'../../assets/login-bg.svg'
import imgPerson from '../../assets/login-person.svg'
import screen1 from '../../assets/login-screen1.svg'
import screen2 from '../../assets/login-screen2.svg'
import screen3 from '../../assets/login-screen3.svg'
import imgIcons from '../../assets/login-icons.svg'
import { withRouter } from 'react-router'
class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      
        email: '',
        password: '',
        password_confirmation: '',
        lastname: '',
        firstname: '',
        telnum: '',
        companyname: '',
        fieldofbusiness: '',
        city: '',
        if_admin: true,
        if_Topadmin: false,
        if_client: false
        

      
    };
    this.handleChange = this.handleChange.bind(this);  
}
handleChange (e) {
    this.setState({ [e.target.name]: e.target.value });
  };
  goback=()=>{
   this.props.history.push('/')
  }
  handleSubmit = e => {
   
    e.preventDefault();
    
    console.log(this.state);
    //console.log(JSON.stringify(this.state, null, 2));
    let data = JSON.stringify(this.state);
    console.log((data, null, 2));

    
    /*axios
      .post("http://localhost:3001/users", this.state)
      .then(res => console.log(res))
      .catch(err => console.log(err));*/
      const {
        email,
        password,
        password_confirmation,
        lastname,
        firstname,
        telnum,
        companyname,
        fieldofbusiness,
        city,
        if_admin,
        if_client,
        if_Topadmin

      } =  this.state;

    // Entrez un mdp >= 6 caracteres
    // Il faut mentionner que le mot de passe minimum 6 caracteres avant d'envoyer au serveur ;) 
    axios.post(url +"/users", {
     user:{
        email: email,
        password: password,
        password_confirmation: password_confirmation,
        lastname: lastname,
        firstname: firstname,
        telnum: telnum,
        companyname: companyname,
        fieldofbusiness: fieldofbusiness,
        city: city,
        if_admin: if_admin,
        if_Topadmin: if_Topadmin,
        if_client: if_client


     }
    },{ withCredentials: true }
    
    ).then( response =>{  //axios returns a promise
      console.log("registration response ", response )
      console.log(this.state.register_test)
      console.log(response.data.status)
      this.props.history.push('/')
      console.log(this.state.register_test)
    }).catch(error =>{
      console.log("registration error ", error)
    })

    }
    
    render (){
        return(
            <div className="login">

               

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
                        <h2>Inscription admin</h2>

                        {/*<p className="error"> {error} </p> */}

                        <label style={{ top: '30px' }} htmlFor="Email">Email</label>
                        <br/>
                        <input onChange={this.handleChange} name="email" id="email" type="text"/>
                        <br/>
                        <label style={{ top: '100px' }} className="password" htmlFor="password">Password</label>
                        <br/>
                        <input onChange={this.handleChange} name="password" id="password" type="password"/>
                        <br/>
                        <label style={{ top: '170px' }} className="password-conformation" htmlFor="password">Password-Confomation</label>
                        <br/>
                        <input onChange={this.handleChange} name="password_confirmation" id="password-confirmation" type="password"/>
                        <br/>
                        <label style={{ top: '240px' }} htmlFor="Nom">Nom</label>
                        <br/>
                        <input onChange={this.handleChange} name="lastname" id="lastname" type="text"/>
                        <br/>
                        <label style={{ top: '310px' }} htmlFor="Prénom">Prénom</label>
                        <br/>
                        <input onChange={this.handleChange} name="firstname" id="firstname" type="text"/>
                        <br/>
                        <label style={{ top: '380px' }} htmlFor="telnum">Numero de télephone</label>
                        <br/>
                        <input onChange={this.handleChange} name="telnum" id="telnum" type="number"/>
                        <br/>
                        <label style={{ top: '450px' }} htmlFor="Nom shop/Entreprise">Nom du shop/Entreprise</label>
                        <br/>
                        <input onChange={this.handleChange} name="companyname" id="companyname" type="text"/>
                        <br/>
                        <label style={{ top: '520px' }} htmlFor="Domaine d'activité">Domaine d'activité</label>
                        <br/>
                        <input onChange={this.handleChange} name="fieldofbusiness" id="fieldofbusiness" type="text"/>
                        <br/>
                        <label style={{ top: '590px' }} htmlFor="ville">ville</label>
                        <br/>
                        <input onChange={this.handleChange} name="city" id="city" type="text"/>
                        <br/>
                        <button
                         type="submit"
                         onClick={this.handleSubmit } 
                        
                         >register</button>
                         <br/> 
                         <button
                         class="backb"
                         type="submit"
                         onClick={this.goback } 
                        
                         >Retour</button>

                    </form>
                   
                </div>  
            </div>
        );
    }
}
        
    export default withRouter(Register);
