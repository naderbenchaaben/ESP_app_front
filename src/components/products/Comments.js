import React, { useState, Fragment, useEffect } from "react";
import axios from "axios";
import { url } from "config";
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
const Comments = (props) => {
  const [comments, setComments] = useState([]);
  const [gotComments, setGotComments] = useState(0);
  const [clients, setClients] = useState([]);
  const [gotclient, setGotclient] = useState(0);
  function fetchcomments() {
    axios
      .get(
        url +
          "/api/v2/comment/" +
          JSON.parse(localStorage.getItem("productcomments")).id
      )

      .then((res) => {
        console.log(res.data.comment_list);
        setComments(res.data.comment_list);
        setGotComments(2);
      })
      .catch((res) => console.log(res));
  }
  function fetchclients() {
    axios.get(url + "/api/v2/customer").then((res) => {
      console.log(res.data.client_list);
      setClients(res.data.client_list);
      setGotclient(2);
    });
  }
  useEffect(() => {
    fetchcomments();
    return () => {
      fetchclients();
    };
  }, [gotComments, gotclient]);

  return (
    <div>
      <div>
        <button
          className="product_add_btn"
          onClick={(e) => props.history.goBack()}
        >
          {" "}
          Retour
        </button>
      </div>
      {comments.map((c) => {
        return (
          <div>
            {clients.map((cl) => {
              if (cl.id == c.user_id) {
                return (
                  <Card>
                    <h3
                      style={{
                        color: "#505050",
                        // backgroundColor: "#D3D3D3",
                        paddingLeft: 20,
                        fontSize: 20,
                      }}
                    >
                      <b>
                        {cl.firstname} {cl.lastname}
                      </b>
                    </h3>

                    <h3
                      style={{
                        color: "#000000",
                        paddingLeft: 30,
                        fontSize: 15,
                      }}
                    >
                      <b>{c.body}</b>
                    </h3>
                  </Card>
                );
              }
            })}
          </div>
        );
      })}
    </div>
  );
};
export default Comments;
