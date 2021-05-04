import React, { Component } from "react";
//import withContext from "../withContext";
import { Redirect, Link } from "react-router-dom";
import axios from 'axios';
import {MultiUploader, Uploader } from '../../Uploader/MultiUploader'
import {
    
    Container,
    
  } from "react-bootstrap";
const Imageup = () => {
    return(
        <Container>
            <Uploader/>
        </Container>
    )
}