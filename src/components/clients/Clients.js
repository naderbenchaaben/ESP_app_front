import React, {useState, Fragment, useEffect}  from 'react'
import axios from 'axios'
import { Redirect, Link } from "react-router-dom";
import {MultiUploader } from '../Uploader/MultiUploader'
import './clients.scss'
import {url} from "config";
import { connect } from 'react-redux'
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
const Clients= (props)=> {

    const [ clients, setClients] = useState([])
    const [ gotclt, setGotclt ] = useState(0)
    
   
    console.log(clients)
   

    const fetchingclients= () =>{
        axios.get(url+"/api/v2/user/"+props.user.data.city).then(
            res=>{
              console.log(res)
                
                setClients(res.data.client_list)
                setGotclt(res.data.length)
               
                console.log(clients)
            })
            .catch(res => console.log(res))
    }
    useEffect(()=>{
      console.log("a")
      fetchingclients();
    },[gotclt])
    
    

    

    const list =clients.map( p =>{
      return(
        <div key={p.id}>
          
        <Card className="card-stats">
            <Card.Body>
              <Col>             
              <Row>
                
                  <div className="numbers">
                    
                    <Card.Title as="h4">{p.firstname}   {p.lastname}</Card.Title>
                  </div>
                </Row></Col><br/><Col><Row>
                
                  <br/>
                  <div >
                    <p> email: {p.email}   </p>
                    <p> numero de téléphone: {p.telnum}   </p>
                    

                    
                    
                  </div>
                
                
              </Row></Col>
            </Card.Body>
           
          </Card>
          
          </div>

      )
    })
  
return (
    <>
    <div>
           
        
        
    
      
                  <Link to="./Oldclients">
                    <button
                  className="product_add_btn"
                  
                   > clients de {props.user.data.companyname}</button>
                  </Link>
    </div>
   
    <div  >
    <h3>Clients dans votre ville {props.user.data.city}</h3>
          <ul>{list}</ul>
          
   
      
  </div>  

</>
)}


const mapStateToProps = (state) => {
    return({
        user: state.userReducer
        
    })
  }
export default connect(mapStateToProps) (Clients);