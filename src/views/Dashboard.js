import React, { useEffect, useState } from "react";
import ChartistGraph from "react-chartist";
import { url } from "config";
import axios from "axios";
import { connect } from "react-redux";
import { categoryAction } from "../actions";
import { companyAction } from "../actions";
import { Line } from "react-chartjs-2";
import { Bar } from "react-chartjs-2";
import { Pie } from "react-chartjs-2";
// react-bootstrap components
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

function Dashboard(props) {
  const [gotcat, setGotcat] = useState(0);
  const [gotcomp, setGotcomp] = useState(0);
  const [orders, setOrders] = useState([]);
  const [gotord, setGotord] = useState(0);
  const [chartData, setChartData] = useState({});
  const [bardata, setBardata] = useState({});
  const [datap, setDatap] = useState([]);

  function getdaydate(a) {
    const today = new Date();
    const date = new Date(today);

    date.setDate(date.getDate() - a);

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
  const countcomptete = () => {
    var x = 0;
    var i;
    for (i = 0; i < orders.length; i++) {
      if (orders[i].stage == "completed") x += 1;
    }
    return x;
  };
  function getdaytotal(a) {
    var sum = 0;
    let day = getdaydate(a).toISOString().slice(0, 10);
    orders.map((o) => {
      if (o.created_at.slice(0, 10) == day && o.stage == "completed") {
        sum += o.total_price;
      }
    });

    return sum;
  }
  function countordersperday(a) {
    var sum = 0;
    let day = getdaydate(a).toISOString().slice(0, 10);
    orders.map((o) => {
      if (o.created_at.slice(0, 10) == day) {
        sum += 1;
      }
    });
    console.log(sum);
    return sum;
  }

  const data = {
    labels: ["prete", "en attente", "en traitement", "complete"],
    datasets: [
      {
        data: [
          Math.round((countready() / orders.length) * 100),
          Math.round((countpending() / orders.length) * 100),
          Math.round((countprocessing() / orders.length) * 100),
          Math.round((countcomptete() / orders.length) * 100),
        ],
        backgroundColor: ["#46BFBD", "#F7464A", "#FDB45C", "#228B22"],
      },
    ],
  };
  const options = {
    responsive: true,
    title: {
      display: true,
      text: "percetage des stade de commandes",
      fontSize: 20,
    },
  };

  const chart = () => {
    setChartData({
      labels: [
        formatdate(6),
        formatdate(5),
        formatdate(4),
        formatdate(3),
        formatdate(2),
        formatdate(1),
        formatdate(0),
      ],
      datasets: [
        {
          label: "nombre de commandes par jour ",
          data: [
            countordersperday(6),
            countordersperday(5),
            countordersperday(4),
            countordersperday(3),
            countordersperday(2),
            countordersperday(1),
            countordersperday(0),
          ],
          backgroudColor: "rgba(75,192,192,1)",
          borderColor: "rgba(0,0,0,1)",

          borderwidth: 5,
        },
      ],
    });
  };
  function formatdate(a) {
    let fd = getdaydate(a).toISOString().slice(0, 10);
    return fd;
  }

  function bar() {
    setBardata({
      labels: [
        formatdate(6),
        formatdate(5),
        formatdate(4),
        formatdate(3),
        formatdate(2),
        formatdate(1),
        formatdate(0),
      ],
      datasets: [
        {
          label: "Revenu par jour pour les commandes complétées",
          backgroundColor: "rgba(75,192,192,1)",
          borderColor: "rgba(0,0,0,1)",
          borderWidth: 2,
          data: [
            getdaytotal(6),
            getdaytotal(5),
            getdaytotal(4),
            getdaytotal(3),
            getdaytotal(2),
            getdaytotal(1),
            getdaytotal(0),
          ],
        },
      ],
    });
  }

  function fetchingcompany() {
    axios
      .get(url + "/api/v2/companies/" + props.user.data.id)
      .then((res) => {
        console.log(res);
        props.companyAction(res.data);
        console.log(props.company);
        console.log(localStorage.getItem("company"));
        axios
          .get(url + "/api/v2/categoryC/" + res.data.id)
          .then((res) => {
            console.log(res.data);
            props.categoryAction(res.data.categories);
          })
          .catch((res) => console.log(res));
      })
      .catch((res) => console.log(res));
  }
  /* const fetchingcategories = () => {
    axios
      .get(
        url +
          "/api/v2/categoryC/" +
          JSON.parse(localStorage.getItem("company")).id
      )
      .then((res) => {
        console.log(res.data);
        props.categoryAction(res.data);
      })
      .catch((res) => console.log(res));
  };
 const fetchingorders= () =>{
  axios.get(url+"/api/v2/order/"+parseInt(props.company["company"][6])).then(
      res=>{
          console.log(res)
          setOrders(res.data.order_list)
          setGotord(res.data.length)
         
          console.log(orders)
      })
      .catch(res => console.log(res))
    }*/
  function fetchingorders() {
    if (props.company.data === undefined) {
      axios
        .get(url + "/api/v2/order/" + parseInt(props.company["company"][6]))
        .then((res) => {
          console.log(res);
          setOrders(res.data.order_list);
          setGotord(res.data.length);

          console.log(orders);
        })
        .catch((res) => console.log(res));
    } else {
      axios
        .get(url + "/api/v2/order/" + parseInt(props.company.data.id))
        .then((res) => {
          console.log(res);
          setOrders(res.data.order_list);
          setGotord(res.data.length);

          console.log(orders);
        })
        .catch((res) => console.log(res));
    }
  }

  useEffect(() => {
    fetchingcompany();
    //fetchingcategories();
    fetchingorders();
    chart();
    bar();
  }, [gotcomp, gotcat, datap, gotord]);

  function totalincome() {
    var sum = 0;
    let today = new Date().toISOString().slice(0, 10);
    orders.map((o) => {
      if (o.created_at.slice(0, 10) == today) {
        sum += o.total_price;
      }
    });

    return sum;
  }
  function totalgain() {
    var sum = 0;
    let today = new Date().toISOString().slice(0, 10);
    orders.map((o) => {
      if (o.created_at.slice(0, 10) == today && o.stage == "completed") {
        sum += o.total_price;
      }
    });

    return sum;
  }
  function getmonth() {
    var sum = 0;
    let month = new Date().toISOString().slice(5, 7);
    orders.map((o) => {
      if (o.created_at.slice(5, 7) == month && o.stage == "completed")
        sum += o.total_price;
    });

    return sum;
  }

  return (
    <>
      <Container fluid>
        <div>
          <Row>
            <Col lg="3" sm="6">
              <Card className="card-stats">
                <Card.Body>
                  <Row>
                    <Col xs="5">
                      <div className="icon-big text-center icon-warning">
                        <i className="nc-icon nc-chart text-primary"></i>
                      </div>
                    </Col>
                    <Col xs="7">
                      <div>
                        <p>Les commandes Actives</p>
                        <Card.Title as="h4">{orders.length}</Card.Title>
                      </div>
                    </Col>
                  </Row>
                </Card.Body>
                <Card.Footer></Card.Footer>
              </Card>
            </Col>

            <Col lg="3" sm="6">
              <Card className="card-stats">
                <Card.Body>
                  <Row>
                    <Col xs="5">
                      <div className="icon-big text-center icon-warning">
                        <i className="nc-icon nc-cart-simple text-danger"></i>
                      </div>
                    </Col>
                    <Col xs="7">
                      <div>
                        <p>Les commande en attente</p>
                        <Card.Title as="h4">{countpending()}</Card.Title>
                      </div>
                    </Col>
                  </Row>
                </Card.Body>
                <Card.Footer></Card.Footer>
              </Card>
            </Col>
            <Col lg="3" sm="6">
              <Card className="card-stats">
                <Card.Body>
                  <Row>
                    <Col xs="5">
                      <div className="icon-big text-center icon-warning">
                        <i className="nc-icon nc-cart-simple text-warning"></i>
                      </div>
                    </Col>
                    <Col xs="7">
                      <div>
                        <p>Les commandes en traitement</p>
                        <Card.Title as="h4">{countprocessing()}</Card.Title>
                      </div>
                    </Col>
                  </Row>
                </Card.Body>
                <Card.Footer></Card.Footer>
              </Card>
            </Col>
            <Col lg="3" sm="6">
              <Card className="card-stats">
                <Card.Body>
                  <Row>
                    <Col xs="5">
                      <div className="icon-big text-center icon-warning">
                        <i className="nc-icon nc-cart-simple text-info"></i>
                      </div>
                    </Col>
                    <Col xs="7">
                      <div>
                        <p>Les commandes prètes</p>
                        <Card.Title as="h4">{countready()}</Card.Title>
                      </div>
                    </Col>
                  </Row>
                </Card.Body>
                <Card.Footer></Card.Footer>
              </Card>
            </Col>
            <Col lg="3" sm="6">
              <Card className="card-stats">
                <Card.Body>
                  <Row>
                    <Col xs="5">
                      <div className="icon-big text-center icon-warning">
                        <i className="nc-icon nc-cart-simple text-success"></i>
                      </div>
                    </Col>
                    <Col xs="7">
                      <div>
                        <p>les commandes complétées</p>
                        <Card.Title as="h4">{countcomptete()}</Card.Title>
                      </div>
                    </Col>
                  </Row>
                </Card.Body>
                <Card.Footer></Card.Footer>
              </Card>
            </Col>
            <Col lg="3" sm="6">
              <Card className="card-stats">
                <Card.Body>
                  <Row>
                    <Col xs="5">
                      <div className="icon-big text-center icon-warning">
                        <i className="nc-icon nc-money-coins text-info"></i>
                      </div>
                    </Col>
                    <Col xs="7">
                      <div>
                        <p>
                          <b>le totale des commande active d'aujourd'hui</b>
                        </p>
                        <Card.Title as="h4">
                          {totalincome()} <small>DT</small>
                        </Card.Title>
                      </div>
                    </Col>
                  </Row>
                </Card.Body>
                <Card.Footer></Card.Footer>
              </Card>
            </Col>
            <Col lg="3" sm="6">
              <Card className="card-stats">
                <Card.Body>
                  <Row>
                    <Col xs="5">
                      <div className="icon-big text-center icon-warning">
                        <i className="nc-icon nc-money-coins text-info"></i>
                      </div>
                    </Col>
                    <Col xs="7">
                      <div>
                        <p>
                          <b>
                            le revenu totale des commande compeletés
                            d'aujourd'hui
                          </b>
                        </p>
                        <Card.Title as="h4">
                          {totalgain()} <small>DT</small>
                        </Card.Title>
                      </div>
                    </Col>
                  </Row>
                </Card.Body>
                <Card.Footer></Card.Footer>
              </Card>
            </Col>
            <Col lg="3" sm="6">
              <Card className="card-stats">
                <Card.Body>
                  <Row>
                    <Col xs="5">
                      <div className="icon-big text-center icon-warning">
                        <i className="nc-icon nc-money-coins text-info"></i>
                      </div>
                    </Col>
                    <Col xs="7">
                      <div>
                        <p>
                          <b>
                            le revenu totale des commande compeletés ce mois
                          </b>
                        </p>
                        <Card.Title as="h4">
                          {getmonth()} <small>DT</small>
                        </Card.Title>
                      </div>
                    </Col>
                  </Row>
                </Card.Body>
                <Card.Footer></Card.Footer>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col>
              <div>
                <div>
                  <Line data={chartData} />
                </div>

                <div>
                  <Bar
                    data={bardata}
                    options={{
                      title: {
                        display: true,

                        fontSize: 20,
                      },
                      legend: {
                        display: true,
                        position: "right",
                      },
                    }}
                  />
                </div>
              </div>
            </Col>
            <div>
              <Row>
                <Pie data={data} options={options} />
              </Row>
            </div>
          </Row>
        </div>
      </Container>
    </>
  );
}
const mapStateToProps = (state) => {
  return {
    category: state.categoriesReducer,
    company: state.companyReducer,
    user: state.userReducer,
  };
};
export default connect(mapStateToProps, { categoryAction, companyAction })(
  Dashboard
);
