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
const Oldclients= (props)=> {
return(
  <>
  <div>
  <Link to="./Clients">
    <button
  className="product_add_btn"
  
   >Clients dans votre ville {props.user.data.city}</button>
  </Link>
</div>
    <h2>the clients qui on effectuer des commande a {props.user.data.companyname}</h2>

</>
)
   
}

const mapStateToProps = (state) => {
    return({
        user: state.userReducer
        
    })
  }
export default connect(mapStateToProps) (Oldclients);