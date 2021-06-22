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
    const [ gotprod, setGotprod ] = useState(0)
    const [ updateproduct ,setUpdatedproduct ] =useState()
   
    console.log(products)
   

    const fetchingproducts= () =>{
        axios.get(url+"/api/v2/products").then(
            res=>{
                
                setProducts(res.data)
                setGotprod(res.data.length)
               
                console.log(products)
            })
            .catch(res => console.log(res))
    }
    useEffect(()=>{
      console.log("a")
      fetchingproducts();
    },[gotprod])
    const deleteproduct= (id) =>{
      axios.delete(url+"/api/v2/products/"+id).then(
        res=>{
          console.log(res)
          setGotprod(gotprod-1)
        }
      )
    }
    const prodtobeupdated =(p)=>{
      localStorage.setItem('product',p.id );
    }

    

    const list =products.map( p =>{
      return(
        <div key={p.id}>
        <Card className="card-stats">
            <Card.Body>
              <Col>             
              <Row>
                
                  <div className="numbers">
                    
                    <Card.Title as="h3">{p.product_name}</Card.Title>
                  </div>
                </Row></Col><br/><Col><Row>
                
                  <br/>
                  <div >
                    <p><b>Référence : {p.ref_product}</b> </p>
                    <p><b>Quantité en stock : {p.available_quantity} </b></p>
                    <p> <b>Prix: {p.price} DT</b> </p>
                    <p><b> description bref: {p.shortDesc}</b> </p>
                    <p><b> Description: {p.description}</b> </p>
                    
                  </div>
                  
                
                
              </Row></Col>
            </Card.Body>
            <Card.Footer>
              <hr></hr>
                <span>
                  <Link to="./UpdateProduct">
                    <button
                  className="product_update_btn"
                  onClick={()=>localStorage.setItem('product', JSON.stringify(p) )
                  }
                 
                   > modifier</button>
                  </Link>
                <button
                    className="product_delete_btn"
                    onClick={()=>deleteproduct(p.id)}
                      >supprimer
                </button>
              </span>

                  <Link to="./UpdateProduct">
                    <button
                  className="commentaires"
                  onClick={()=>localStorage.setItem('product', JSON.stringify(p) )
                  }
                 
                   > 
                   Commentaires</button>
                  </Link>
            </Card.Footer>
          </Card>
          
          </div>

      )
    })
  
return (
    <>
    <div>
           
        
        
    
      
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