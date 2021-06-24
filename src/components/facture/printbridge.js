import React, { Component } from "react";
import Orderitems from "../orders/Orderitems";
export default class Printbridge extends Component {
  // var o = JSON.parse(localStorage.getItem("order"))
  render() {
    return (
      <>
        <div>
          <h3>
            Facture de commande ° {JSON.parse(localStorage.getItem("order")).id}
          </h3>

          <Orderitems />
        </div>
      </>
    );
  }
}
