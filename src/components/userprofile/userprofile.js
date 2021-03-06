import axios from "axios";
import React, { Component } from "react";
import { url, headers } from "config";
import { connect } from "react-redux";

import "./profile.css";
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
  Col,
} from "react-bootstrap";

class UserProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      lastname: "",
      firstname: "",
      telnum: "",
      companyname: "",
      fieldofbusiness: "",
      city: "",
      image: "",
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    if (e.target.value) {
      this.setState({ [e.target.name]: e.target.value });
    } else {
      let a = e.target.name;
      console.log(a);
      this.setState({ [e.target.name]: this.props.user.data.a });
    }
  }

  handleSubmit = (e) => {
    e.preventDefault();

    console.log(this.state);
    //console.log(JSON.stringify(this.state, null, 2));
    let data = JSON.stringify(this.state);
    console.log((data, null, 2));

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
    } = this.state;

    // Entrez un mdp >= 6 caracteres
    // Il faut mentionner que le mot de passe minimum 6 caracteres avant d'envoyer au serveur ;)
    axios
      .put(
        url + "/api/v1/users/" + this.props.user.data.id,
        {
          user: {
            // password: password,
            // password_confirmation: password_confirmation,
            lastname: lastname,
            firstname: firstname,
            telnum: telnum,
            companyname: companyname,
            fieldofbusiness: fieldofbusiness,
            city: city,
          },
        },
        { withCredentials: true }
      )
      .then((response) => {
        //axios returns a promise
        console.log("registration response ", response);
      })
      .catch((error) => {
        console.log("registration error ", error);
      });
  };
  handleChangeimage = (e) => {
    if (e.target.name === "image") {
      this.setState({ image: e.target.files[0] });
      console.log(this.state.image);
    }
  };

  handleSubmitimage = (e) => {
    e.preventDefault();
    const form = new FormData();
    form.append("image", this.state.image);
    console.log(this.state.image);

    axios
      .put(url + "/api/v2/userimage/" + this.props.user.data.id, form)
      .then(function (response) {
        console.log("image upload", response);
        this.props.history.push("./");
      })

      .catch(function (error) {
        console.log(error);
      });
  };

  render() {
    return (
      <Container fluid>
        <Row>
          <Col md="8"></Col>
          <Col md="8">
            <Card className="card-profile shadow">
              <Card.Header>
                <Card.Title as="h4">Mise ?? Jour du Profile </Card.Title>
              </Card.Header>
              <Card.Body>
                <Form>
                  <Row>
                    <Col className="pl-1" md="4">
                      <Form.Group>
                        <label htmlFor="exampleInputEmail1">email</label>
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
                          <label>Num??ro de t??l??phone</label>

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
                        <label>Domaine d'activit??</label>

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
                    Mettre ?? jour
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
                  <div className="card-profile-image"></div>
                </Col>
              </Row>
              <Card.Header className="text-center border-0 pt-8 pt-md-4 pb-0 pb-md-4">
                <div className="d-flex justify-content-between"></div>
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
                          src={this.props.user.data.image}
                        />
                      </a>
                    </div>
                  </div>
                </Row>
                <div className="text-center">
                  <h4>
                    {this.props.user.data.lastname}
                    <span className="font-weight-light">
                      {" "}
                      {this.props.user.data.firstname}{" "}
                    </span>
                  </h4>
                  <div className="h5 font-weight-300">
                    <i className="ni location_pin mr-2" />
                    votre email : {this.props.user.data.email}
                  </div>
                  <div className="h5 mt-4">
                    <i className="ni business_briefcase-24 mr-2" />
                    Administrateur de : {this.props.user.data.companyname}
                  </div>
                  <div>
                    <i className="ni education_hat mr-2" />
                    Domain d'activit?? : {this.props.user.data.fieldofbusiness}
                  </div>
                </div>

                <div className="text-center">
                  <input
                    type="file"
                    name="image"
                    onChange={this.handleChangeimage}
                  />
                  <Button
                    className="btn-fill pull-right"
                    type="submit"
                    variant="info"
                    onClick={this.handleSubmitimage}
                  >
                    ajout photo
                  </Button>
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
  return {
    user: state.userReducer,
  };
};

export default connect(mapStateToProps)(UserProfile);
