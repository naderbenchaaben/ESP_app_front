import React, { useState, Fragment, useEffect } from "react";
import axios from "axios";
import { Redirect, Link } from "react-router-dom";
import { MultiUploader } from "../Uploader/MultiUploader";
import "./product.scss";
import { url } from "config";
import star from "../../assets/img/star-rating.jpg";
import { useHistory } from "react-router-dom";
import Rating from "./Rating";
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
const Products = (props) => {
  const [products, setProducts] = useState([]);
  const [gotprod, setGotprod] = useState(0);
  const [updateproduct, setUpdatedproduct] = useState();
  const [gotrating, setGotrating] = useState(0);
  const [score, setScore] = useState({});

  console.log(products);

  const fetchingproducts = () => {
    axios
      .get(url + "/api/v2/p/" + JSON.parse(localStorage.getItem("company")).id)
      .then((res) => {
        setProducts(res.data.product);
        setGotprod(res.data.length);

        console.log(products);
      })
      .catch((res) => console.log(res));
  };
  const fetchrating = (a) => {
    var s;
    {
      axios.get(url + "/api/v3/avgrating/" + a).then((res) => {
        console.log(res.data.rating);
        s = res.data.rating;
        setGotrating(2);
        console.log("the rating", s);
        localStorage.setItem(a, s);
      });
    }

    return s;
  };
  function displayrating(a) {
    {
      fetchrating(a);
    }
    return (
      <div style={{ paddingLeft: 20, paddingRight: 30 }}>
        <span>
          <img width="40px" src={star}></img>
          <p>
            <b>{parseFloat(localStorage.getItem(a)).toFixed(1)} / 5</b>{" "}
          </p>
        </span>
      </div>
    );
  }
  useEffect(() => {
    fetchingproducts();
  }, [gotprod]);
  const deleteproduct = (id) => {
    axios.delete(url + "/api/v2/products/" + id).then((res) => {
      console.log(res);
      setGotprod(2);
    });
  };

  const list = products.map((p) => {
    return (
      <div key={p.id}>
        <Card className="card-stats">
          <Card.Body>
            <Col>
              <Row>
                <div className="numbers">
                  <Card.Title as="h3">{p.product_name}</Card.Title>
                </div>
              </Row>
            </Col>
            <br />
            <Row>
              <Col>
                <Row>
                  <br />
                  <div>
                    <p
                      style={{
                        paddingLeft: 20,
                      }}
                    >
                      <b> Référence : {p.ref_product}</b>{" "}
                    </p>
                    <p
                      style={{
                        paddingLeft: 20,
                      }}
                    >
                      <b> Quantité en stock : {p.available_quantity} </b>
                    </p>
                    <p
                      style={{
                        paddingLeft: 20,
                      }}
                    >
                      <b> Prix: {p.price} DT</b>{" "}
                    </p>

                    <p
                      style={{
                        paddingLeft: 20,
                      }}
                    >
                      <p>
                        {" "}
                        <b> Description : </b>
                      </p>
                      <p>
                        {" "}
                        <b>{p.description}</b>
                      </p>
                    </p>
                  </div>
                </Row>
              </Col>
              <Col xs="5">
                <img width="200" align="middle" src={p.image}></img>
              </Col>
            </Row>
          </Card.Body>
          <Card.Footer>
            <hr></hr>
            {displayrating(p.id)}
            <span>
              <Link to="./UpdateProduct">
                <button
                  className="product_update_btn"
                  onClick={() =>
                    localStorage.setItem("product", JSON.stringify(p))
                  }
                >
                  {" "}
                  modifier
                </button>
              </Link>
              <button
                className="product_delete_btn"
                onClick={() => deleteproduct(p.id)}
              >
                supprimer
              </button>
            </span>

            <Link to="./Comments">
              <button
                className="commentaires"
                onClick={() =>
                  localStorage.setItem("productcomments", JSON.stringify(p))
                }
              >
                Commentaires
              </button>
            </Link>
          </Card.Footer>
        </Card>
      </div>
    );
  });

  return (
    <>
      <div>
        <Link to="./AddProduct">
          <button className="product_add_btn"> Ajouter Produit</button>
        </Link>
      </div>

      <div>
        <ul>{list}</ul>
      </div>
    </>
  );
};

export default Products;
