import React, { Component } from "react";


import axios from 'axios';
import {url, headers} from "config";
import { withRouter } from "react-router";



//import ImageUploading from 'react-images-uploading';



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

 


class AddCategory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      category_name:'',
      

    };
    
  
    this.handleChange = this.handleChange.bind(this);  
  }

  handleChange = (e) => {
    if (e.target.name === 'image'){
      this.setState({
        [e.target.name]: e.target.files[0]
      })

    }else{
  this.setState({ [e.target.name]: e.target.value });
  }};
  

  
       

      handleSubmit = e => {
   
        e.preventDefault();
        
        console.log(this.state);
        let data = JSON.stringify(this.state);
        console.log((data, null, 2));
    
        
    
          const {
            category_name,
            
          } =  this.state;
          console.log(JSON.stringify(this.state));
          axios.post(url+'/api/v2/categories',{
          category:{
            category_name
          }
        }  
          )
          .then(function (response) { 
            console.log("category-addition", response)
            
          })
         
          .catch(function (error) {
            console.log(error);
          });
          this.props.history.goBack()
        }
         
  render() {
    const { category_name} = this.state;
   

    return (
     
    
      <Container fluid>
      <Row>
        <Col md="8">
          <Card>
            <Card.Header>
              <Card.Title as="h4">category</Card.Title>
            </Card.Header>
            <Card.Body>
              <Form>
                <Row>
                  <Col className="pl-1" md="6">
                    <Form.Group>
                      <label htmlFor="category name">
                        La categorie
                      </label>
                      <Form.Control
                        name="category_name"
                        placeholder="name of the product"
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
                  Ajouter categorie
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


export default withRouter(AddCategory);