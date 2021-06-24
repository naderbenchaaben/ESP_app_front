import React, { useState, Fragment, useEffect } from "react";
import axios from "axios";
import { url } from "config";
import star from "../../assets/img/star-rating.jpg";

const Rating = ({ ID }) => {
  const [gotrating, setGotrating] = useState(0);
  const [score, setScore] = useState({});
  function fetchrating() {
    axios
      .get(url + "/api/v3/avgrating/" + ID)
      .then((res) => {
        console.log(res.data.rating);
        setScore(res.data.rating);
        setGotrating(2);
      })
      .catch((res) => console.log(res));
  }
  useEffect(() => {
    fetchrating();
  }, [gotrating]);

  return (
    <div>
      <span>
        <img width="40px" src={star}></img>
        <p> {score}</p>
      </span>
    </div>
  );
};

export default Rating;
