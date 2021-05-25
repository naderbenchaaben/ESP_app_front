/*!

=========================================================
* Light Bootstrap Dashboard React - v2.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/light-bootstrap-dashboard-react
* Copyright 2020 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/light-bootstrap-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React, { Component } from "react";
import { useLocation, NavLink } from "react-router-dom";
import { connect } from 'react-redux'
import { Nav } from "react-bootstrap";
import Icons from "views/Icons.js";
import Dashboard from "views/Dashboard.js";
import logo from "assets/img/reactlogo.png";

function Sidebar({ color, image, routes , ...rest} ) {
  const location = useLocation();
  const activeRoute = (routeName) => {
    return location.pathname.indexOf(routeName) > -1 ? "active" : "";
  };
  return (
    
    <div className="sidebar" data-image={image} data-color={color}>
      <div
        className="sidebar-background"
        style={{
          backgroundImage: "url(" + image + ")",
        }}
      />
      <div className="sidebar-wrapper">
        <div className="logo d-flex align-items-center justify-content-start">
          <a
              
            className="simple-text logo-mini mx-1"
          >
            <div className="logo-img">
              <img
                src={require("assets/img/logo1.jpg").default}
                alt="..."
              />
            </div>
          </a>
          <a className="simple-text" {...rest}>
            {rest.user.data.companyname}
        </a>
        {/*
       //*** adding a logo and a title   **             */ 
        // side bar would contain 
           // * company Profile 
           // * company owner profile
           // * orders//
                            //the hole operations including the states that the orders is in
           // *uploading products within categoris
           // *  
        } 
        </div>
        <Nav>
        <li
          className={activeRoute( "/admin/dashboard")}
                >
          <NavLink
          to="/admin/dashboard"
          className="nav-link"
          activeClassName="active"
          >
            <i className="nc-icon nc-chart-pie-35" />
            <p>Dashboard</p>
          </NavLink>
          </li>
        </Nav>
        <Nav>
        <li
          className={activeRoute( "/admin/userprofile")}
                >
          <NavLink
          to="/admin/userprofile"
          className="nav-link"
          activeClassName="active"
          >
            <i className="nc-icon nc-circle-09" />
            <p>Votre Profile</p>
          </NavLink>
          </li>
        </Nav>
        <Nav>
        <li
          className={activeRoute( "/admin/company")}
                >
          <NavLink
          to="/admin/company"
          className="nav-link"
          activeClassName="active"
          >
            <i className="nc-icon nc-bank" />
            <p>Entreprise/Shop</p>
          </NavLink>
          </li>
        </Nav>
        <Nav>
        <li
          className={activeRoute("/admin/Categories")}
                >
          <NavLink
          to="/admin/Categories"
          className="nav-link"
          activeClassName="active"
          >
            <i className="nc-icon nc-notes" />
            <p>Categories</p>
          </NavLink>
          </li>
        </Nav>
        <Nav>
        <li
          className={activeRoute( "/admin/Produits")}
                >
          <NavLink
          to="/admin/Products"
          className="nav-link"
          activeClassName="active"
          >
            <i className="nc-icon nc-app" />
            <p>produits</p>
          </NavLink>
          </li>
        </Nav>
        <Nav>
        <li
          className={activeRoute( "/admin/Clients")}
                >
          <NavLink
          to="/admin/clients"
          className="nav-link"
          activeClassName="active"
          >
            <i className="nc-icon nc-badge" />
            <p>Clinets</p>
          </NavLink>
          </li>
        </Nav>
        <Nav>
        <li
          className={activeRoute( "")}
                >
          <NavLink
          to=""
          className="nav-link"
          activeClassName="active"
          >
            <i className="nc-icon nc-notes" />
            <p>commandes</p>
          </NavLink>
          </li>
        </Nav>
        <Nav>
        <li
          className={activeRoute( "/admin/icons")}
                >
          <NavLink
          to="/admin/icons"
          className="nav-link"
          activeClassName="active"
          >
            <i className="nc-icon nc-circle-09" />
            <p>icons</p>
          </NavLink>
          </li>
        </Nav>
        


      </div>
    </div>
  );
}
const mapStateToProps = (state) => {
  return({
      user: state.userReducer
  })
}

export default connect(mapStateToProps)(Sidebar);
