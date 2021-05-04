import React, { Component } from "react";
//import withContext from "../withContext";
import { Redirect, Link } from "react-router-dom";
import axios from 'axios';
import { connect } from 'react-redux'
import {url, headers} from "config";
import ImageUploading from 'react-images-uploading';
import UploadFiles from "../../Uploader/upload-files.component";


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
//import Imageup from "./imageup";

 


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
      images: []

    };
  
    this.handleChange = this.handleChange.bind(this); 
   // this.selecteFiles= this.selectFiles.bind(this); 
  }

    handleChange = (e) => {
      
        this.setState({
          [event.target.name]: event.target.value
        
        })
  };

   handlechangeimage= (e) => {
    this.setState({images : e.target.files});
   }


   
      

      handleSubmit = e => {
        console.log(this.state.images)
        e.preventDefault();
        const formData = new FormData();
        formData.append('product_name', this.state.product_name);
        formData.append('ref_product', this.state.ref_product);
        formData.append('price', this.state.price);
        formData.append('description', this.state.description);
        formData.append('shortDesc', this.state.shortDesc);
        
        formData.append('available_quantity', this.state.available_quantity);
        let images = this.state.images;
        var p=new Array();

        for(let i=0; i< images.length; i++){
          p.push(images[i])
        }
        debugger
        formData.append('images', p);

              fetch(url+'/api/v2/products', {
        method: 'POST',
        body: formData
      },
      { withCredentials: true }
      ).then( response => {
        console.log("register succeed", response)
        debugger
        if (response.status === 200 ){
          this.props.history.push('/Products');

        }
      }).catch(error=>console.log(error));
    }
    
        
                                                
  render() {
   

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
                        name="shortDesc"
                        placeholder="dw2a18wc8escription bref"
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
               handlechangeimage
          <div className="col-8">
            <label className="btn btn-default p-0">
              <input name="imeges" type="file" multiple onChange={this.handlechangeimage} />
            </label>
          </div>

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
            <Row>
              
            </Row>
          </Card>
        </Col>
      </Row>
    </Container>
       
        
    );
  }
}

export default AddProduct;