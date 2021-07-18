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
const Orders = (props) => {
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

  function getdaydate() {
    const today = new Date();
    const date = new Date(today);

    date.setDate(date.getDate());

    return date;
  }
  const countpending = () => {
    var x = 0;
    var i;
    for (i = 0; i < orders.length; i++) {
      if (orders[i].stage == "pending") x += 1;
    }
    return x;
  };
  const countprocessing = () => {
    var x = 0;
    var i;
    for (i = 0; i < orders.length; i++) {
      if (orders[i].stage == "processing") x += 1;
    }
    return x;
  };
  const countready = () => {
    var x = 0;
    var i;
    for (i = 0; i < orders.length; i++) {
      if (orders[i].stage == "ready") x += 1;
    }
    return x;
  };
  const countcompleted = () => {
    var x = 0;
    var i;
    var today = new Date();
    today = getdaydate().toISOString().slice(0, 10);
    for (i = 0; i < orders.length; i++) {
      if (
        orders[i].stage == "completed" &&
        orders[i].created_at.slice(0, 10) == today
      )
        x += 1;
    }
    return x;
  };
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
  const stagecolor = (o) => {
    switch (o) {
      case "pending":
        return "danger";
      case "processing":
        return "warning";
      case "ready":
        return "info";
      case "completed":
        return "success";
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
  return (
    <>
      <h3>Commandes </h3>
      <Row>
        <Col>
          <GridItem>
            <Card>
              <CardHeader color="danger" stats icon>
                <CardIcon color="danger">
                  <Icon>en attente ...</Icon>
                </CardIcon>
              </CardHeader>

              <h2 style={{ paddingLeft: 100 }}>
                <b>{countpending()}</b>
              </h2>
              <CardFooter stats>
                <div>
                  <a href="#pablo" onClick={(e) => e.preventDefault()}>
                    <Link to="./Pending">
                      <button className="product_add_btn">
                        {" "}
                        Commandes en attentes
                      </button>
                    </Link>
                  </a>
                </div>
              </CardFooter>
            </Card>
          </GridItem>
        </Col>
        <Col>
          <GridItem>
            <Card>
              <CardHeader color="warning" stats icon>
                <CardIcon color="warning">
                  <Icon>en traitement ...</Icon>
                </CardIcon>
              </CardHeader>
              <h2 style={{ paddingLeft: 100 }}>
                <b>{countprocessing()}</b>
              </h2>

              <CardFooter stats>
                <div>
                  <a href="#pablo" onClick={(e) => e.preventDefault()}>
                    <Link to="./Processing">
                      <button className="product_add_btn">
                        {" "}
                        Commandes en traitement
                      </button>
                    </Link>
                  </a>
                </div>
              </CardFooter>
            </Card>
          </GridItem>
        </Col>
      </Row>
      <Row>
        <Col>
          <GridItem>
            <Card>
              <CardHeader color="info" stats icon>
                <CardIcon color="info">
                  <Icon>prète</Icon>
                </CardIcon>
              </CardHeader>

              <h2 style={{ paddingLeft: 100 }}>
                <b>{countready()}</b>
              </h2>
              <CardFooter stats>
                <div>
                  <a href="#pablo" onClick={(e) => e.preventDefault()}>
                    <Link to="./Ready">
                      <button className="product_add_btn">
                        {" "}
                        Commandes pretes
                      </button>
                    </Link>
                  </a>
                </div>
              </CardFooter>
            </Card>
          </GridItem>
        </Col>

        <Col>
          <GridItem>
            <Card>
              <CardHeader color="success" stats icon>
                <CardIcon color="success">
                  <Icon>compeletés</Icon>
                </CardIcon>
              </CardHeader>

              <h2 style={{ paddingLeft: 100 }}>
                <b>{countcompleted()}</b>
              </h2>
              <CardFooter stats>
                <div>
                  <a href="#pablo" onClick={(e) => e.preventDefault()}>
                    <Link to="./Completed">
                      <button className="product_add_btn">
                        {" "}
                        Commandes Completées
                      </button>
                    </Link>
                  </a>
                </div>
              </CardFooter>
            </Card>
          </GridItem>
        </Col>
      </Row>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.userReducer,
    company: state.companyReducer,
  };
};
export default connect(mapStateToProps)(Orders);
