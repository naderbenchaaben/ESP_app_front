import React from "react";
import Orderitems from "./Orderitems";
import { Redirect, Link } from "react-router-dom";

const Order = (props) => {
  return (
    <>
      <button
        className="product_add_btn"
        onClick={(e) => props.history.goBack()}
      >
        {" "}
        Retour
      </button>
      <Orderitems />
      <Link to="./Facture">
        <button className="commentaires">Facture</button>
      </Link>
    </>
  );
};

export default Order;
