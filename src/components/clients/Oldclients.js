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
  import { makeStyles } from "@material-ui/core/styles";
import Icon from "@material-ui/core/Icon";
  import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardIcon from "components/Card/CardIcon.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
const Oldclients= (props)=> {
  const [ orders , setOrders ] = useState([])
  const [clients , setClients ] = useState([])
  const [ gotclt, setGotclt] = useState(0)
  const [ gotord, setGotord] = useState(0)

  const fetchingorders= () =>{
    axios.get(url+"/api/v2/order/"+props.company.data.id).then(
        res=>{
            console.log(res) 
            setOrders(res.data.order_list)
            setGotord(res.data.length)
            console.log(orders)
        })
        .catch(res => console.log(res))
      }
      const fetchingclients= () =>{
        axios.get(url+"/api/v2/users/"+props.user.data.city).then(
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
    
      
      useEffect(()=>{
        fetchingorders();
        fetchingclients();
        
      },[gotord],[gotclt])

      const list = clients.map( p =>{
        return(
          <div key={p.id}>
            <GridItem >
       
          <Card>
            <CardHeader color="info" stats icon>
              <CardIcon color="info">
               <Icon>
              <img src={
                          require("../../assets/img/client.png")
                            .default
                        } alt="" width="100" height="120"></img></Icon>
              </CardIcon>
             
             <h3 >
                 <small>Client : {p.firstname } { p.lastname }</small>
              </h3>
              <h3>
                 <small> Client depuit : {(p.created_at).slice(0,10)} </small>
              </h3>
              <h3>
                 <small> Numero telephone : {p.telnum} </small>
              </h3>
              <h3>
                 <small> Email: {p.email} : 2 </small>

              </h3>
              <h3>
                 <small> Nombre d'achats a {props.company.data.companyname} : 2 </small>
              </h3>
            </CardHeader>
             
            <CardFooter stats>
              <div >
                
                
                  
              </div>
            </CardFooter>
          </Card>
        </GridItem>
          </div>
        )
      })
return(
  <>
  <div>
    <span>
  <Link to="./Clients">
    <button
  className="product_add_btn"
  
   >Clients dans {props.user.data.city}</button>
  </Link></span>
<span>
<Link to="./Oldclients">
  
                    <button
                  className="product_add_btn"
                  
                   > clients de {props.user.data.companyname}</button>
                  </Link></span>
</div>
<div>

<h3>clients de {props.user.data.companyname}</h3></div>


    
          <ul>{list}</ul>
          
   
      
  



</>
)
   
}

const mapStateToProps = (state) => {
    return({
        user: state.userReducer,
        company: state.companyReducer
        
    })
  }
export default connect(mapStateToProps) (Oldclients);