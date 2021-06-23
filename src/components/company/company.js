import React from "react";
import { useState, Fragment, useEffect } from "react";
import { connect } from "react-redux";
import axios from "axios";
import { url, headers } from "config";
import {
  Badge,
  Button,
  Card,
  Navbar,
  Nav,
  Table,
  Container,
  Row,
  Col,
  Form,
  OverlayTrigger,
  Tooltip,
} from "react-bootstrap";
import userprofile from "components/userprofile/userprofile";
const Company = (props) => {
  const [image, setImage] = React.useState({});
  const handleChange = (e) => {
    if (e.target.name === "image") {
      setImage(e.target.files[0]);
      console.log(image);
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const form = new FormData();
    form.append("image", image);
    console.log(image);

    axios
      .put(url + "/api/v2/companyimage/" + props.company.data.id, form)
      .then(function (response) {
        console.log("product-addition", response);
        this.props.history.push("./");
      })

      .catch(function (error) {
        console.log(error);
      });
  };
  return (
    <Container>
      <Row>
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
                        width="500"
                        align="middle"
                        src={props.company.data.image}
                      />
                    </a>
                  </div>
                </div>
              </Row>
              <Col></Col>
              <div className="text-center">
                <h2>{props.company.data.companyname}</h2>
                <div className="h5 font-weight-300">
                  <i className="ni location_pin mr-2" />
                  Entreprise/shop : {props.company.data.companyname}
                </div>
                <div className="h5 mt-4">
                  <i className="ni business_briefcase-24 mr-2" />
                  domain d'activité : {props.company.data.fieldofbusiness}
                </div>
                <div>
                  <i className="ni education_hat mr-2" />
                  Administrer par : {props.user.data.lastname}{" "}
                  {props.user.data.firstname}
                </div>
                <div className="h5 mt-4">
                  <i className="ni education_hat mr-2" />
                  ville : {props.company.data.city}
                </div>
              </div>
              <div className="text-center">
                <input type="file" name="image" onChange={handleChange} />
                <Button
                  className="btn-fill pull-right"
                  type="submit"
                  variant="info"
                  onClick={handleSubmit}
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
};
const mapStateToProps = (state) => {
  return {
    company: state.companyReducer,
    user: state.userReducer,
  };
};

export default connect(mapStateToProps)(Company);
