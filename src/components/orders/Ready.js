import React, { useState, Fragment, useEffect } from "react";
import axios from "axios";
import { url } from "config";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
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
const Ready = (props) => {
  const [orders, setOrders] = useState([]);
  const [gotord, setGotord] = useState(0);

  const fetchingorders = () => {
    axios
      .get(url + "/api/v2/order/" + props.company.data.id)
      .then((res) => {
        console.log(res);
        setOrders(res.data.order_list);
        setGotord(res.data.length);

        console.log(orders);
      })
      .catch((res) => console.log(res));
  };
  useEffect(() => {
    fetchingorders();
  }, [gotord]);
  function countpending() {
    var x = 0;
    orders.map((o) => {
      if (o.stage == "pending") {
        x = +1;
      }
    });
    return x;
    console.log(x);
  }

  const stage = (o) => {
    switch (o) {
      case "pending":
        return "En attente ...";
      case "processing":
        return "en traitement ...";
      case "ready":
        return "Prète";
      case "completed":
        return "complété";
    }
  };

  const typeorder = (o) => {
    switch (o) {
      case "delivery":
        return "Livraison";
      case "collection":
        return "Collection";
    }
  };
  async function getclient(o) {
    let client = {};
    await axios.get(url + "/api/v2/user/" + o.user_id).then((res) => {
      client = res.data;
    });

    return client;
  }

  const list = orders.map((o) => {
    if (o.stage == "ready")
      return (
        <div key={o.id}>
          <Col>
            <GridItem>
              <Card>
                <CardHeader color="info" stats icon>
                  <CardIcon color="info">
                    <Icon>Prète</Icon>
                  </CardIcon>
                </CardHeader>
                <ul>
                  <li style={{ fontSize: 20 }}>
                    {" "}
                    L'id de la commande : {o.id}
                  </li>
                  <li style={{ fontSize: 20 }}>
                    {" "}
                    Type de l'ordre: {typeorder(o.order_type)}
                  </li>
                  <li style={{ fontSize: 20 }}>
                    Total de la commande : {o.total_price} dt{" "}
                  </li>
                </ul>

                <CardFooter stats>
                  <div>
                    <a href="#pablo" onClick={(e) => e.preventDefault()}>
                      <Link to="./Order">
                        <button
                          className="product_add_btn"
                          onClick={() =>
                            localStorage.setItem("order", JSON.stringify(o))
                          }
                        >
                          {" "}
                          Detail{" "}
                        </button>
                      </Link>
                    </a>
                  </div>
                </CardFooter>
              </Card>
            </GridItem>
          </Col>
        </div>
      );
  });

  return (
    <>
      <div>
        <button
          className="product_add_btn"
          onClick={(e) => props.history.goBack()}
        >
          {" "}
          Retour
        </button>
      </div>
      <h3>Commandes </h3>

      <Row>{list}</Row>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.userReducer,
    company: state.companyReducer,
  };
};
export default connect(mapStateToProps)(Ready);
