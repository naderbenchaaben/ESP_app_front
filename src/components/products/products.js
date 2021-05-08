import React, {useState, Fragment}  from 'react'
import axios from 'axios'
import { Redirect, Link } from "react-router-dom";
import {MultiUploader } from '../Uploader/MultiUploader'
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
const Products= (props)=> {

    const [ products, setProducts] = useState([])
    const [ updateproduct, setUpdateproduct ] = useState([])

    const fetchingproducts= () =>{
        axios.get(url+"/api/v2/products").then(
            res=>{
                console.log(res.data)
                setProducts(res.data)
                console.log(products)
            })
            .catch(res => console.log(res))
    }
    const deleteproduct= (id) =>{
      axios.delete(url+"/api/v2/products/"+id).then(
        res=>{
          console.log(res)
        }
      )
    }

    const list =products.map( p =>{
      return(
        <div key={p.id}>
        <Card className="card-stats">
            <Card.Body>
              <Row>
                <Col xs="5">
                  <div className="numbers">
                    
                    <Card.Title as="h4">{p.product_name}</Card.Title>
                  </div>
                </Col>
                <Col xs="5">
                  <br/>
                  <div >
                    <p>Référence : {p.ref_product} </p>
                    <p>Quantité en stock : {p.available_quantity} </p>
                    <p> Prix: {p.price} DT </p>
                    <p> description bref: {p.shortDesc} </p>
                    <p> Description: {p.description} </p>
                    
                  </div>
                </Col>
                
              </Row>
            </Card.Body>
            <Card.Footer>
              <hr></hr>
                <span>
                  <Link to="./UpdateProduct">
                    <button
                  className="product_update_btn"
                  onClick={()=>setUpdateproduct(p)}
                   > modifier</button>
                  </Link>
                <button
                    className="product_delete_btn"
                    onClick={()=>deleteproduct(p.id)}
                      >supprimer
                </button>
              </span>
            </Card.Footer>
          </Card>
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
    
      
                  <Link to="./AddProduct">
                    <button
                  className="product_add_btn"
                  
                   > Ajouter Produit</button>
                  </Link>
    </div>
   
    <div  >
      
          <ul>{list}</ul>
          
   
      
  </div>  

</>
)
}
export default Products;