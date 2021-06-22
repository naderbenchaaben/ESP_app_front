import React, { Component } from "react";
//import withContext from "../withContext";
import { Redirect, Link } from "react-router-dom";
import axios from 'axios';
import {url, headers} from "config";
import { withRouter } from 'react-router'



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

 


class UpdateProduct extends Component {
  constructor(props) {
    super(props);
    this.state = {
      product_name: "",
      ref_product:"",
      price: "",  
      description: "",
      available_quantity: "",
      

    };
    
    console.log(localStorage.getItem("product"))
    let prod = (localStorage.getItem("product"))
    console.log(this.state)
    this.setState({
      product_name: JSON.parse(localStorage.getItem('product')).product_name,
    ref_product: JSON.parse(localStorage.getItem('product')).ref_product,
    price: JSON.parse(localStorage.getItem('product')).price,  
    description: JSON.parse(localStorage.getItem('product')).description,
    available_quantity: JSON.parse(localStorage.getItem('product')).available_quantity,
  })
  console.log(this.state)
    
    this.handleChange = this.handleChange.bind(this);  
  }

  handleChange = (e) => {
    if (e.target.name === 'image'){
      this.setState({
        [e.target.name]: e.target.files[0]
      })

    }else{
      if(e.target.value){
  this.setState({ [e.target.name]: e.target.value });
  }
  }};

   
  componentDidMount() {
    
  }

  
      

      handleSubmit = e => {
   
        e.preventDefault();
        
        console.log(this.state);
        let data = JSON.stringify(this.state);
        console.log((data, null, 2));
    
        
    
          const {
            product_name,
            ref_product,
            price,
            description, 
            available_quantity 
          } =  this.state;
          
          console.log(JSON.stringify(this.state));
          axios.put(url+'/api/v2/products/'+JSON.parse(localStorage.getItem('product')).id,{
          product:{
            product_name: product_name,
            ref_product: ref_product,
            price: price,
            description: description,
            available_quantity: available_quantity,
            
          }
        }  
          )
          .then(function (response) { 
            console.log("product-update", response.data.products);
           
          })
         
          .catch(function (error) {
            console.log(error);
          });
          
          this.props.history.goBack()
        }
       

  render() {
    const { product_name, ref_product, price, description, available_quantity  } = this.state;
  

    return (
     
    
      <Container fluid>
      <Row>
        <Col md="8">
          <Card>
            <Card.Header>
              <Card.Title as="h4">Modifier Produit</Card.Title>
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
                        placeholder={JSON.parse(localStorage.getItem('product')).product_name}
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
                        placeholder={JSON.parse(localStorage.getItem('product')).ref_product}
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
                        placeholder={JSON.parse(localStorage.getItem('product')).price}
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
                        placeholder={JSON.parse(localStorage.getItem('product')).available_quantity}
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
                        name="description"
                        placeholder={JSON.parse(localStorage.getItem('product')).description}
                        onChange={this.handleChange}
                        type="text"
                      ></Form.Control>
                    </Form.Group>
                  </Col>

                </Row>
                <Row>
                  <Col>
                  
                  <Form.Group>
                 {/*  <Form.File id="exampleFormControlFile1" label="ajoutez des photos du produit" /> */  }
                  
                  </Form.Group>
                  
                  
                
                  </Col>
                </Row>
                
               <Row>
               

               </Row> 
                <button
                  className="product_update_btn"
                  type="submit"
                  variant="info"
                  onClick={this.handleSubmit}
                >
                  Modifer 
                </button>
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
const mapStateToProps = (state) => {
  return({
      user: state.userReducer
      
  })
}
export default withRouter(UpdateProduct);