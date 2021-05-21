import React, { Component } from "react";
//import withContext from "../withContext";
import { Redirect, Link } from "react-router-dom";
import axios from 'axios';
import { connect } from 'react-redux'
import { categoryAction } from '../../actions'
import {url, headers} from "config";
import {MultiUploader } from '../Uploader/MultiUploader'
//import ImageUploading from 'react-images-uploading';
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
      category: "",
      categories:[]
      

    };
    this.handleChange = this.handleChange.bind(this);  
    
   
  }

  componentDidMount(){
        this.categories = localStorage.getItem('categories')
      }
  handleChange = (e) => {
    if (e.target.name === 'image'){
      this.setState({
        [e.target.name]: e.target.files[0] 
      })
    }else{
      this.setState({ [e.target.name]: e.target.value });
      
      }};
  
   listingcategories = () => {
     categories.map((g)=>{
      return(
              <option value={g.category_name}>{g.category_name}</option> 
      )
    })
   };
  
  
      

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
            description: description,
            available_quantity: available_quantity,
            shortDesc:shortDesc
          }
        }  
          )
          .then(function (response) { 
            console.log("product-addition", response);
           this.props.history.push('./')
          })
         
          .catch(function (error) {
            console.log(error);
          });
          this.props.history.goBack()
        }
         
  render() {
    const { product_name, ref_product, price, shortDesc, description, available_quantity  } = this.state;
   

    return (
     
    
      <Container fluid>
      <Row>
        <Col md="10">
          <Card>
            <Card.Header>
              <Card.Title as="h4">Ajout Produit</Card.Title>
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

                
                <Col>
                <label htmlFor="categorie">
                        La categorie
                      </label>
                </Col>
                <Col>
                <div class="dropdown">
                    
                    <select class="dropbtn" >
              <option class="dropdown-content" value=""onchange={this.handleChange}>select categorie</option>
              
            </select>
                  </div>
                  
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
                        name="shortDesc "
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
                        name="description"
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
                 {/*  <Form.File id="exampleFormControlFile1" label="ajoutez des photos du produit" /> */  }
                  
                  </Form.Group>
                  
                  
                
                  </Col>
                </Row>
                
               <Row>
               

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
////////////////////////////////////////////////////////////
      </Row>
    </Container>
       
        
    );
  }
}
const mapStateToProps = (state) => {
  return({
      category: state. categoriesReducer
  })
}

export default connect(mapStateToProps, { categoryAction })(AddProduct);
