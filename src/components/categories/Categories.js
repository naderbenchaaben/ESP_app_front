import React, {useState,  useEffect}  from 'react'
import axios from 'axios'
import {  Link } from "react-router-dom";
import {url} from "config";
import { connect } from 'react-redux'
import { categoryAction } from '../../actions'
import './category.scss'
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
const Categories= (props)=> {

    const [ categories, setcategories] = useState([])
   

    const fetchingcategories= () =>{
        axios.get(url+"/api/v2/categories").then(
            res=>{
                console.log(res.data)
                setcategories(res.data)
                
                console.log(categories)
            })
            .catch(res => console.log(res))
    }
    useEffect(()=>{
      
      fetchingcategories();
    })
    const deletecategory= (id) =>{
      axios.delete(url+"/api/v2/categories/"+id).then(
        res=>{
          console.log(res)
        }
      )
    }

    const list =categories.map( p =>{
      return(
        <div key={p.id}>
        <Card className="card-stats">
            <Row>
              <Col>             
              
                
                  <div className="numbers">
                    
                    <Card.Title as="h4">{p.category_name}</Card.Title>
                  </div>
                </Col>
                <Col>
                
                <span>
                  
                  <button
                      className="product_delete_btn"
                      onClick={()=>deletecategory(p.id)}
                        >supprimer
                  </button>
                </span>
                 
                  
                
                
              </Col>
            
            </Row>
          </Card>
          </div>
      )
    })
  
return (
    <>
    <div>
           
        
       
    
      
                  <Link to="./AddCategory">
                    <button
                  className="product_add_btn"
                  
                   > Ajouter Category</button>
                  </Link>
    </div>
   
    <div  >
      
          <ul>{list}</ul>
          
   
      
  </div>  

</>
)
}
const mapStateToProps = (state) => {
  return({
      category: state. categoriesReducer
  })
}
export default  connect(mapStateToProps, { categoryAction })(Categories);