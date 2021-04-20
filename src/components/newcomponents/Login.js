
import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import jwt_decode from 'jwt-decode';
import axios from 'axios';
import { url, headers } from 'config'
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
      email: "",
      password: ""
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
          
        } =  this.state;
  
      // Entrez un mdp >= 6 caracteres
      // Il faut mentionner que le mot de passe minimum 6 caracteres avant d'envoyer au serveur ;) 
      axios.post(url+"/api/v1/sessions",
      {
       user:{
          email: email,
          password: password
       }
      }
      
      ).then( response =>{  //axios returns a promise
        console.log("authentication responce", response )
      }).catch(error =>{
        console.log("authentication responce ", error)
      })
  
      }
render(){
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
                  <Button
                      className="btn-fill pull-right"
                      type="submit"
                      variant="info"
                      onClick={this.handleSubmit}
                    >
                    se connecter
                    </Button>
                    <div className="clearfix"></div>
                  </Form>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>

 /* handleChange = e => this.setState({ [e.target.name]: e.target.value, error: "" });
  login = async (email, password) => {
    console.log(email,password)
    const res = await axios.post(
      'http://localhost:3001/api/v1/sessions',
      { email, password },
    ).catch((res) => {
      return { status: 401, message: 'Unauthorized' }
    })
  
    if(res.status === 200) {
      const { email } = jwt_decode(res.data.accessToken)
      const user = {
        email,
        token: res.data.accessToken,
        accessLevel: email === 'admin@example.com' ? 0 : 1
      }
  
      this.setState({ user });
      localStorage.setItem("user", JSON.stringify(user));
      return true;
    } else {
      return false;
    }
  }
  
  logout = e => {
    e.preventDefault();
    this.setState({ user: null });
    localStorage.removeItem("user");
  };
  login = (e) => {
    e.preventDefault();

    const { email, password } = this.state;
    if (!email|| !password) {
      return this.setState({ error: "Fill all fields!" });
    }
    this.props.login(email, password)
      .then((loggedIn) => {
        if (!loggedIn) {
          this.setState({ error: "Invalid Credentails" });
        }
      })
      
    };
  render() {
    return/* !this.props.context.user ?*/ 
     /* <>
        <div className="hero is-primary ">
          <div className="hero-body container">
            <h4 className="title">Login</h4>
          </div>
        </div>
        <br />
        <br />
        <form onSubmit={this.login}>
          <div className="columns is-mobile is-centered">
            <div className="column is-one-third">
              <div className="field">
                <label className="label">Email: </label>
                <input
                  className="input"
                  type="email"
                  name="email"
                  onChange={this.handleChange}
                />
              </div>
              <div className="field">
                <label className="label">Password: </label>
                <input
                  className="input"
                  type="password"
                  name="password"
                  onChange={this.handleChange}
                />
              </div>
              {this.state.error && (
                <div className="has-text-danger">{this.state.error}</div>
              )}
              <div className="field is-clearfix">
                <button
                  className="button is-primary is-outlined is-pulled-right"
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        </form>
      </>
    )  /*(
      <Redirect to="" />
    );
  }
}                    */
    )

}
}
export default Login;