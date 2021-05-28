import React, {useState, Fragment, useEffect}  from 'react'
import axios from 'axios'
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
const Order = (props)=> {
    const [ order, setOrder] = useState([])
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
        useEffect(()=>{
          fetchingorders();
      
    },[gotord])
    const stage=(o)=>{
      switch(o){
        case 'pending':
          return "En attente ..."
        case 'processing':
          return  "en traitement ..."
          case 'ready':
          return  "Prète"
          case 'completed':
          return  "complété"
      }
    }
    const stagecolor=(o)=>{
      switch(o){
        case 'pending':
          return "danger"
        case 'processing':
          return  "warning"
          case 'ready':
          return  "info"
          case 'completed':
          return  "success"
    }
  }
  const typeorder=(o)=>{
    switch(o){
      case 'delivery':
        return "Livraison"
      case 'collection':
        return  "Collection"
  }
}
 async function getclient (o){
    let client={};
    await axios.get(url+"/api/v2/user/"+o.user_id).then(
      res=>{
        console.log(res)
        client = res.data;
        
      }
      
    )
    console.log(client) 
       return client ;
      
  }
  
    const list =orders.map( o =>{
      
      return(
        <div key={o.id}>
          <GridItem >
         { console.log(getclient(o))}
          <Card>
            <CardHeader color={stagecolor(o.stage)} stats icon>
              <CardIcon color={stagecolor(o.stage)}>
              <Icon>{stage(o.stage)}</Icon>
              </CardIcon>
            </CardHeader>
            <ul>
                <li> L'id de la commande : {o.id}</li>
                <li> Type de l'ordre:  {typeorder(o.order_type)}</li>
                <li> client :

                   <ul><li>Nom : {getclient(o).firstname} </li>
                       <li> Prenom :</li>
                       <li> Numero telephone : </li>
                       <li>email : {getclient(o).email}</li>
                    </ul>
                    <li>Total de la commande : {o.total_price} dt </li>
                  
                
                  
                  
                </li>
            </ul>
              
            <CardFooter stats>
              <div >
                
                <a href="#pablo" onClick={(e) => e.preventDefault()}>
                <button
  className="product_add_btn"
  
   > detail commande </button>
                </a>
              </div>
            </CardFooter>
          </Card>
        </GridItem>
        </div>
      )
    })
    
  
return(
  <>

<h3>Commandes </h3>
          <ul>{list}</ul>    
</>
)}



const mapStateToProps = (state) => {
    return({
        user: state.userReducer,
        company: state.companyReducer
        
    })
  }
export default connect(mapStateToProps) (Order);