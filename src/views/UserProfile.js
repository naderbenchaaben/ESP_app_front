
import axios from 'axios';
import React, { Component } from 'react';
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
  constructor(){
    super()
    this.state = {
      
        email: '',
        password: '',
        password_confirmation: '',
        lastName: '',
        firstName: '',
        companyname: '',
        fieldofbusiness: '',
        city: ''
      
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
        lastName,
        firstName,
        companyname,
        fieldofbusiness,
        city
      } =  this.state;
      console.log(JSON.stringify(this.state));
      axios.post('https://localhost:3001/users', 
     
        
          JSON.stringify(this.state)
        
      )
      .then(function (response) { 
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  };


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
                      <Col className="pl-1" md="6">
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
                            name="lastName"
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

                            name="firstName"
                            placeholder="Prenom"
                            onChange={this.handleChange}
                            type="text"
                          ></Form.Control>
                        </Form.Group>
                      </Col>
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
