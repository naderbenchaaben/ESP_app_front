import React, {useState, Fragment}  from 'react'
import axios from 'axios'
import { Redirect, Link } from "react-router-dom";
import {MultiUploader } from '../../Uploader/MultiUploader'
import './product.scss'
import {url} from "config";
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
const Products= ()=> {
    const [ products, setProducts] = useState([]);
    const fetchingproducts= () =>{
        axios.get(url+"/api/v2/products").then(
            res=>{
                console.log(res.data)
                setProducts(res.data)
                console.log(products)
            })
            .catch(res => console.log(res))
    }
  const prodItem =() =>  products.map(item => {
         return(   
             <div key={item.id}>
        <Container fluid>
        <Row>
        <Col lg="3" sm="6">
          <Card className="card-stats">
            <Card.Body>
              <Row>
                <Col xs="5">
                  <div className="icon-big text-center icon-warning">
                    <i className="nc-icon nc-chart text-warning"></i>
                  </div>
                </Col>
                <Col xs="7">
                  <div className="numbers">
                    <p className="card-category">Les ordres Active</p>
                    <Card.Title as="h4">5</Card.Title>
                  </div>
                </Col>
              </Row>
            </Card.Body>
            <Card.Footer>
              <hr></hr>
              <div className="stats">
                <i className="fas fa-redo mr-1"></i>
                Mettre à
              </div>
            </Card.Footer>
          </Card>
    </Col>
    </Row>
    </Container>
    </div>
            )

         })
return (
    <>
    <div>
           
        
        <button
        class="test"
     type="submit"
     onClick={fetchingproducts }
      
    
     >refrech listes produit</button> 
    
     <Link
                    to="./AddProduct"
                    >Add product
                  </Link> 
    </div>
    <li>{prodItem}</li>
    <div >
    <Container fluid>
        <Row>
        <Col lg="3" sm="6">
          <Card className="card-stats">
            <Card.Body>
              <Row>
                <Col xs="5">
                  <div className="icon-big text-center icon-warning">
                    <i className="nc-icon nc-chart text-warning"></i>
                  </div>
                </Col>
                <Col xs="7">
                  <div className="numbers">
                    <p className="card-category">Les ordres Active</p>
                    <Card.Title as="h4">5</Card.Title>
                  </div>
                </Col>
              </Row>
            </Card.Body>
            <Card.Footer>
              <hr></hr>
              <div className="stats">
                <i className="fas fa-redo mr-1"></i>
                Mettre à
              </div>
            </Card.Footer>
          </Card>
    </Col>
    </Row>
    </Container>
  </div>  

</>
)
}
export default Products;