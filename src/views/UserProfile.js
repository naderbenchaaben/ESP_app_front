
import axios from 'axios';
import React, { Component } from 'react';
import { url, headers } from 'config'
// react-bootstrap components
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

class User extends Component {
  constructor(props){
    super(props)
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
        if_admin
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
        companyname: companyname,
        fieldofbusiness: fieldofbusiness,
        city: city


     }
    },{ withCredentials: true }
    
    ).then( response =>{  //axios returns a promise
      console.log("registration response ", response )
    }).catch(error =>{
      console.log("registration error ", error)
    })

    }


  render() {
    return (
      
        <Container fluid>
          <Row>
            <Col md="8">
              <Card>
                <Card.Header>
                  <Card.Title as="h4">Creation Compte </Card.Title>
                </Card.Header>
                <Card.Body>
                  <Form>
                    <Row>
                      <Col className="pl-1" md="4">
                        <Form.Group>
                          <label htmlFor="exampleInputEmail1">
                            Email address
                          </label>
                          <Form.Control
                            name="email"
                            placeholder="Email"
                            onChange={this.handleChange}
                            type="email"
                          ></Form.Control>
                        </Form.Group>
                      </Col>
                    </Row>
                    <Row>
                      <Col className="pr-1" md="6">
                        <Form.Group>
                          <label>password</label>
                          
                          
                          <Form.Control
                            name="password"
                            placeholder="mot de passe"
                            onChange={this.handleChange}
                            type="password"
                          ></Form.Control>
                        </Form.Group>
                      </Col>
                      </Row>
                      <Row>
                      <Col className="pr-1" md="6">
                        <Form.Group>
                          <label>Conformez mot de passe</label>
                          
                          <Form.Control
                            name="password_confirmation"
                            placeholder="confirmer le mot de passe"
                            onChange={this.handleChange}
                            type="password"
                          ></Form.Control>
                        </Form.Group>
                      </Col>
                    </Row>
                    <Row>
                    <Col className="pr-1" md="5">
                        <Form.Group>
                          <label>Nom</label>
                          <Form.Control
                            name="lastname"
                            placeholder="Nom"
                            onChange={this.handleChange}
                            type="text"
                          ></Form.Control>
                        </Form.Group>
                      </Col>
                      <Col className="px-1" md="3">
                        <Form.Group>
                          <label>Prenom</label>
                          <Form.Control

                            name="firstname"
                            placeholder="Prenom"
                            onChange={this.handleChange}
                            type="text"
                          ></Form.Control>
                        </Form.Group>
                      </Col>
                      <Row>
                      <Col className="pr-1" md="10">
                        <Form.Group>
                          <label>Numéro de téléphone</label>
                          
                          <Form.Control
                            name="telnum"
                            placeholder="votre numéro de telephone"
                            onChange={this.handleChange}
                            type="text"
                          ></Form.Control>
                        </Form.Group>
                      </Col>
                    </Row>
                      <Col md="12">
                        <Form.Group>
                          <label>Nom du shop/Entreprise</label>
                          
                          <Form.Control
                            name="companyname"
                            placeholder="le nom du shop/Entreprise"
                            onChange={this.handleChange}
                            type="text"
                          ></Form.Control>
                        </Form.Group>
                      </Col>
                    </Row>
                    <Row>
                      <Col className="pr-1" md="4">
                        <Form.Group>
                          <label>Domaine d'activité</label>
                         
                          <Form.Control
                            name="fieldofbusiness"
                            placeholder="activité de votre shop/Entreprise"
                            onChange={this.handleChange}
                            type="text"
                          ></Form.Control>
                        </Form.Group>
                      </Col>
                      <Col className="px-1" md="4">
                        <Form.Group>
                          <label>ville </label>
                          <h1>{this.props.loggedInStatus}</h1>
                          <Form.Control
                            name="city"
                            placeholder="ville"
                            onChange={this.handleChange}
                            type="text"
                          ></Form.Control>
                          
                        </Form.Group>
                      </Col>
                    </Row>
                    
                    <Button
                      className="btn-fill pull-right"
                      type="submit"
                      variant="info"
                      onClick={this.handleSubmit}
                    >
                      Update Profile
                    </Button>
                    <div className="clearfix"></div>
                  </Form>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
    );
  }
}
export default User;
