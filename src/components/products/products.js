import React, {useState, Fragment, useEffect}  from 'react'
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
    const [ updatedproduct, setUpdatedproduct ] = useState()
    
   
    console.log(products)
    console.log(updatedproduct)

    const fetchingproducts= () =>{
        axios.get(url+"/api/v2/products").then(
            res=>{
                
                setProducts(res.data)
                
                //setProducts( products => [...products, res.data]);
                console.log(products)
            })
            .catch(res => console.log(res))
    }
    useEffect(()=>{
      console.log("a")
      fetchingproducts();
    },[updatedproduct, products])
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
              <Col>             
              <Row>
                
                  <div className="numbers">
                    
                    <Card.Title as="h4">{p.product_name}</Card.Title>
                  </div>
                </Row></Col><br/><Col><Row>
                
                  <br/>
                  <div >
                    <p>Référence : {p.ref_product} </p>
                    <p>Quantité en stock : {p.available_quantity} </p>
                    <p> Prix: {p.price} DT </p>
                    <p> description bref: {p.shortDesc} </p>
                    <p> Description: {p.description} </p>
                    
                  </div>
                
                
              </Row></Col>
            </Card.Body>
            <Card.Footer>
              <hr></hr>
                <span>
                  <Link to="./UpdateProduct">
                    <button
                  className="product_update_btn"
                  onClick={()=>setUpdatedproduct( p )
                  }
                 // setProducts( products => [...products, res.data]);
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
)}

export default Products;