import React, { Component } from "react";
//import withContext from "../withContext";
import { Redirect } from "react-router-dom";
import axios from 'axios';
import {url, headers} from "config";
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
  FormControl
} from "react-bootstrap";

 


class AddProduct extends Component {
  constructor(props) {
    super(props);
    this.state = {
      product_name: "",
      ref_product:"",
      price: "",
      shortDesc: "",  
      description: "",
      available_quantity: "",
    };
    this.handleChange = this.handleChange.bind(this);  
  }

  handleChange (e) {
  this.setState({ [e.target.name]: e.target.value });
};
  

   // if (product_name && price) {
      //const id = Math.random().toString(36).substring(2) + Date.now().toString(36);
      

      handleSubmit = e => {
   
        e.preventDefault();
        
        console.log(this.state);
        //console.log(JSON.stringify(this.state, null, 2));
        let data = JSON.stringify(this.state);
        console.log((data, null, 2));
    
        
    
          const {
            product_name,
            ref_product,
            price,
            shortDesc,
            description, 
            available_quantity 
          } =  this.state;
          console.log(JSON.stringify(this.state));
          axios.post(url+'/api/v2/products',{
          product:{
            product_name: product_name,
            ref_product: ref_product,
            price: price,
            shortDesc: shortDesc,
            description: description,
            available_quantity: available_quantity

          }
        }  
          )
          .then(function (response) { 
            console.log("product-addition", response);
          })
          .catch(function (error) {
            console.log(error);
          });
      };
                                          
                                          
                                        /* this.props.context.addProduct(
                                            {
                                              product_name,
                                              ref_product,
                                              price,
                                              shortDesc,
                                              description,
                                              available_quantity: available_quantity || 0
                                              
                                            },
                                            () => this.setState(initState)
                                          );
                                          this.setState(
                                            { flash: { status: 'is-success', msg: 'Product created successfully' }}
                                          );
                                          
                                    */
   
                                                    /*else {
                                                      this.setState(
                                                        { flash: { status: 'is-danger', msg: 'Please enter name and price' }}
                                                      );
                                                    }
                                                  };*/ 

  handleChange = e => this.setState({ [e.target.name]: e.target.value, error: "" });

  render() {
    const { product_name, ref_product, price, shortDesc, description, available_quantity  } = this.state;
   // const { user } = this.props.context;

    return (
     
    
      <Container fluid>
      <Row>
        <Col md="8">
          <Card>
            <Card.Header>
              <Card.Title as="h4">Adding Component</Card.Title>
            </Card.Header>
            <Card.Body>
              <Form>
                <Row>
                  <Col className="pl-1" md="6">
                    <Form.Group>
                      <label htmlFor="product name">
                        Le nom du produit
                      </label>
                      <Form.Control
                        name="product_name"
                        placeholder="name of the product"
                        onChange={this.handleChange}
                        type="text"
                      ></Form.Control>
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col className="pr-1" md="6">
                    <Form.Group>
                      <label>La référence du produit</label>
                      
                      
                      <Form.Control
                        name="ref_product"
                        placeholder="ref_product"
                        onChange={this.handleChange}
                        type="text"
                      ></Form.Control>
                    </Form.Group>
                  </Col>
                  </Row>
                  <Row>
                  <Col className="pl-1" md="6">
                    <Form.Group>
                      <label>Prix</label>
                      
                      <Form.Control
                        name="price"
                        placeholder="le prix du produit"
                        onChange={this.handleChange}
                        type="number"
                        required
                      ></Form.Control>
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                <Col className="pr-1" md="6">
                    <Form.Group>
                      <label>Available in Stock:</label>
                      <Form.Control
                        name="available_quantity"
                        placeholder="quantité, en stock"
                        onChange={this.handleChange}
                        type="text"
                      ></Form.Control>
                    </Form.Group>
                     </Col>
                     
                  <Col md="12">
                    <Form.Group>
                      <label> Bref description</label>
                      
                      <Form.Control
                        name="Short Description: "
                        placeholder="description bref"
                        onChange={this.handleChange}
                        type="text"
                      ></Form.Control>
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col className="pr-1" md="12">
                    <Form.Group>
                      <label>Description</label>
                     
                      <Form.Control
                      as="textarea"
                       rows={3}
                        name="Description"
                        placeholder="description du produit"
                        onChange={this.handleChange}
                        type="text"
                      ></Form.Control>
                    </Form.Group>
                  </Col>

                </Row>
                <Row>
                  <Col>
                  
                  <Form.Group>
                    <Form.File id="exampleFormControlFile1" label="ajoutez des photos du produit" />
                  </Form.Group>

                  </Col>
                </Row>
                
                <Button
                  className="btn-fill pull-right"
                  type="submit"
                  variant="info"
                  onClick={this.handleSubmit}
                >
                  Ajouter Produit
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

export default AddProduct;