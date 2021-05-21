import React  from 'react'
import  {useState, Fragment, useEffect}  from 'react'
import { connect } from 'react-redux'
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
import userprofile from 'components/userprofile/userprofile';
const Company=(props)=>{    
    console.log(props.company.data.companyname)
    return(
<Container>
    <Row>
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
                 {props.company.data.companyname}
                    
                  </h3>
                  <div className="h5 font-weight-300">
                    <i className="ni location_pin mr-2" />
                      Entreprise/shop : {props.company.data.companyname}
                  </div>
                  <div className="h5 mt-4">
                    <i className="ni business_briefcase-24 mr-2" />
                       domain d'activité :   {props.company.data.fieldofbusiness}
                  </div>
                  <div>
                    <i className="ni education_hat mr-2" />
                  Administrer par : {props.user.data.lastname}  {props.user.data.firstname}
                  </div >
                  <div className="h5 mt-4">
                    <i className="ni education_hat mr-2" />
                   ville :  {props.company.data.city}
                  </div>
                  
                </div>
              </Card.Body>
            </Card>

            </Col>
            </Row>
        </Container>
    )
        
    }
    const mapStateToProps = (state) => {
        return({
            company: state.companyReducer,
            user: state.userReducer
            
        })
      }
    export default connect (mapStateToProps) (Company);
