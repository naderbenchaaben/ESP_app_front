
import axios from 'axios';
import React, { Component } from 'react';
import { url, headers } from 'config'
import { connect } from 'react-redux'
import { UpdateProfile } from './UpdateProfile'
import './profile.css'
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

class UserProfile extends Component {
  constructor(props){
    super(props)
    
    this.handleChange = this.handleChange.bind(this);  
}
handleChange (e) {
  this.setState({ [e.target.name]: e.target.value });
  console.log(this.props.user.data.id)
  
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
       
      } =  this.state;

    // Entrez un mdp >= 6 caracteres
    // Il faut mentionner que le mot de passe minimum 6 caracteres avant d'envoyer au serveur ;) 
    axios.put(url +"/api/v1/users/"+this.props.user.data.id, {
     user:{
       
       // password: password,
       // password_confirmation: password_confirmation,
        lastname: lastname,
        firstname: firstname,
        telnum: telnum,
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
            </Col>
            <Col md="8">
              <Card className="card-profile shadow">
                <Card.Header>
                  <Card.Title as="h4">Mise à Jour du Profile </Card.Title>
                </Card.Header>
                <Card.Body>
                  <Form>
                    <Row>
                      <Col className="pl-1" md="4">
                        <Form.Group>
                          <label htmlFor="exampleInputEmail1">
                            email
                          </label>
                          <Form.Control
                            name="email"
                            placeholder={this.props.user.data.email}
                            //onChange={this.handleChange}
                            
                            type="email"
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
                            placeholder={this.props.user.data.lastname}
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
                            placeholder={this.props.user.data.firstname}
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
                            placeholder={this.props.user.data.telnum}
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
                            placeholder={this.props.user.data.companyname}
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
                            placeholder={this.props.user.data.fieldofbusiness}
                            onChange={this.handleChange}
                            type="text"
                          ></Form.Control>
                        </Form.Group>
                      </Col>
                      </Row>
                      <Row>
                      <Col className="pr-1" md="4">
                        <Form.Group>
                          <label>ville </label>
                          <h1>{this.props.loggedInStatus}</h1>
                          <Form.Control
                            name="city"
                            placeholder={this.props.user.data.city}
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
                      Mettre à jour
                    </Button>
                    <div className="clearfix"></div>
                  </Form>
                </Card.Body>
              </Card>
            </Col>
            /
            <Col>
            <Card className="card-profile shadow">
              <Row className="justify-content-center">
                <Col className="order-lg-2" lg="3">
                  <div className="card-profile-image">
                  
                  </div>
                </Col>
              </Row>
              <Card.Header className="text-center border-0 pt-8 pt-md-4 pb-0 pb-md-4">
                <div className="d-flex justify-content-between">
                  
                  
                </div>
              </Card.Header>
              <Card.Body className="pt-0 pt-md-4">
                <Row>
                  <div className="col">
                    <div className="card-profile-stats d-flex justify-content-center mt-md-5">
                    <a href="#pablo" onClick={(e) => e.preventDefault()}>
                      <img
                      width="200" 
                      align="middle"
                        
                        className="rounded-circle"
                        src={
                          require("../../assets/img/profile.jpg")
                            .default
                        }
                      />
                    </a>
                    </div>
                  </div>
                </Row>
                <div className="text-center">
                  <h3>
                  {this.props.user.data.lastname}
                    <span className="font-weight-light">    {this.props.user.data.firstname}</span>
                  </h3>
                  <div className="h5 font-weight-300">
                    <i className="ni location_pin mr-2" />
                    Bucharest, Romania
                  </div>
                  <div className="h5 mt-4">
                    <i className="ni business_briefcase-24 mr-2" />
                    Solution Manager - Creative Tim Officer
                  </div>
                  <div>
                    <i className="ni education_hat mr-2" />
                    University of Computer Science
                  </div>
                  
                  
                </div>
              </Card.Body>
            </Card>

            </Col>
          </Row>
        </Container>
    );
  }
}
const mapStateToProps = (state) => {
  return({
      user: state.userReducer
      
  })
} 

export default connect(mapStateToProps) (UserProfile);
