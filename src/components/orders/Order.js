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
    
    const [ orderitems, setOrderitems] = useState([])
    const [ client , setClient ] = useState({})
    const [ products, setProducts] = useState([])
    const [ gotprod, setGotprod ] = useState(0)
    const [ gotcl, setGotcl ] = useState(0)
    const [ g , setG ] = useState(0)
    const [ gotordits, setGotordits]= useState(0)
var o = JSON.parse(localStorage.getItem("order"))
     console.log(o) 
     
     function fetchingorderitems(){
      axios.get(url+"/api/v2/orderitem/"+o.id).then(
          res=>{
              console.log(res)
              setOrderitems(res.data.order_Item_list)
              setGotordits(res.data.length)
            
              console.log(orderitems)
          })
          .catch(res => console.log(res))
        }
     function getclient (o){
   
  axios.get(url+"/api/v2/user/"+o.user_id).then(
   res=>{
     console.log(res.data)
     setClient(res.data)
   
     setGotcl(2)
    // return res.data
   })}
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
      fetchingproducts()
      return()=>{
 fetchingorderitems()
 getclient(o)
 ;}
},[ gotcl,gotordits,gotprod])  

 function typeorder(c){
   if(c.order_type == "collection"){
     return "Collection"
   }
   if(c.order_type == "delivery"){
     return "Livraison"
   }
 }
 function typeofinformation (c){
   if (c.order_type == "collection"){
     return (<div > <p> Data de collection de commande {c.order_pick_up_date} </p>
     <p> horaire de collection :  {(c.order_pick_up_time).slice(11,16)}  </p> </div>)
   }
   if(c.order_type == "delivery"){
     return ( <div><p>Adresse de Livraison : {c.order_shipping_address} </p></div>)
   }
  }
  
  function radiochoose(o){
    var a = "",
    b = "",
    c = "",
    d = ""
     
    if( o.stage == "pending"){
       a = "checked";}
       if( o.stage == "pocessing"){
        b = "checked";}
        if( o.stage == "ready"){
          c = "checked";}
          if( o.stage == "completed"){
            d = "checked";}

    
    
    return(
      
      <div>
        <input type="radio" value="pending" name="stage" checked={a} /> en attente
        <input type="radio" value="processing" name="stage" checked={b}  /> en taitement
        <input type="radio" value="ready" name="stage" checked={c}  /> prète
        <input type="radio" value="completed" name="stage" checked={d}  /> complète
      </div>
    )
  }
function display(){
  console.log(client)
  
  return(
     <GridItem >
         
         <Card>
           <CardHeader >
           <p style={{ color :"#060862"}}><b style={{ color :"#c83737"}} >ID Commande    : </b><b>{o.id} </b></p>
           <p style={{ color :"#060862"}}><b style={{ color :"#c83737"}}>Date passage de commande  : </b> <b>{(o.created_at).slice(0,10)} </b></p>
           <p style={{ color :"#060862"}}><b style={{ color :"#c83737"}}>Total en dt  :</b><b>  { o.total_price}  </b> <small>  dt</small> </p>
           
           <p><b>client  :   </b></p>
           <ul>
             <li><b>nom  et prénom : {client.lastname} {client.firstname}</b></li>
             <li><b>num tel :{client.telnum}</b></li>
             <li><b>email : {client.email}</b></li>
           </ul>
           
           </CardHeader>
             
           
           
             <div >
               
               <a href="#pablo" onClick={(e) => e.preventDefault()}>
               {orderitems.map((o)=>{
                 return(
                   <Card 
                    
                   ><Col>
                     
                     
                     {products.map((p)=>{
                       if(p.id == o.product_id){
                       return(<div>
                        <h3  style={{ color :"#505050",fontSize: 20}}><b>produit : </b>{p.product_name}</h3>
                        
                       <ul>
                         <li><b>reference: </b>{p.ref_product}</li>
                         <li><b>prix unitaire :</b> {p.price}  <small>  dt</small></li>
                         <li><b>quantité: </b>{o.quantity}</li>
                         <li><b>Prix element : </b>{o.quantity * p.price} <small>  dt</small></li>
                        </ul></div>
                       )}
                     })}
                     <ul>
                       
                       
                     </ul>

                     </Col>
                     <Row><Col></Col></Row>
                   </Card>
                 )
               }
                )}
               
 
               
               </a>
               <div style={{
                 paddingLeft: 30
               }}>
              <p style={{ color :"#060862"}}><b style={{ color :"#c83737"}} >Type de Commande  : </b><b>{typeorder(o)} </b></p>
             {typeofinformation(o)} </div>
             </div>

             <CardFooter >
             
             {radiochoose(o)}
           </CardFooter>
         </Card>
       </GridItem>
   )
 }     
   
return(
  <>  
<div>
<button
  className="product_add_btn"
  onClick={(e)=>props.history.goBack()}
   > Retour</button></div>
<div>
{display()}
</div>
            
</>
)

}


const mapStateToProps = (state) => {
    return({
        user: state.userReducer,
        company: state.companyReducer
        
    })
  }
export default connect(mapStateToProps) (Order);