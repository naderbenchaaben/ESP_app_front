import React, { Component } from "react";
import { Redirect } from "react-router-dom";
//import jwt_decode from 'jwt-decode';
import "./register.scss";
import axios from "axios";
import { url, headers } from "config";
import imageform from "../../assets/login-form.svg";
import imgBackground from "../../assets/login-bg.svg";
import image1 from "../../assets/image1.jpg";
import currency_dollar_blue from "../../assets/currency_dollar_blue.jpg";
import imgIcons from "../../assets/login-icons.svg";
import { withRouter } from "react-router";
class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      error: "",
      password: "",
      passworderror: "",
      password_confirmation: "",
      password_confirmationerror: "",
      lastname: "",
      firstname: "",
      telnum: "",
      telnumerror: "",
      companyname: "",
      fieldofbusiness: "",
      city: "",
      if_admin: true,
      if_Topadmin: false,
      if_client: false,
      success: false,
      fob: [],
    };
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  goback = () => {
    {
      this.props.history.push("/");
    }
  };
  fetchingfieldofbusiness = () => {
    axios
      .get(url + "/api/v2/fieldofbusiness")
      .then((res) => {
        console.log(res);
        this.setState({ fob: res.data });
      })
      .catch((res) => console.log(res));
  };
  componentDidMount() {
    this.fetchingfieldofbusiness();
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const {
      email,
      error,
      password,
      passworderror,
      password_confirmation,
      password_confirmationerror,
      lastname,
      firstname,
      telnum,
      telnumerror,
      companyname,
      fieldofbusiness,
      city,
      if_admin,
      if_client,
      if_Topadmin,
    } = this.state;

    if (
      !email ||
      !password ||
      !password_confirmation ||
      !lastname ||
      !firstname ||
      !telnum ||
      !companyname ||
      !fieldofbusiness ||
      !city
    ) {
      this.setState({ error: "* veuillez remplir tous les champs" });
    }
    if (password && password.length < 8) {
      this.setState({
        passworderror: "*   mot de passe a  8 caractères minimum",
      });
    }
    if (
      password &&
      password_confirmation &&
      password != password_confirmation
    ) {
      this.setState({
        password_confirmationerror:
          "*  mot de passe et confirmation non conforme",
      });
    }
    if (telnum && telnum.toString().length != 8) {
      this.setState({ telnumerror: " * numero telephone invalide" });
    }

    console.log(this.state);

    let data = JSON.stringify(this.state);
    console.log((data, null, 2));

    if (
      email ||
      password ||
      password_confirmation ||
      lastname ||
      firstname ||
      telnum ||
      companyname ||
      fieldofbusiness ||
      city
    ) {
      axios
        .post(
          url + "/users",
          {
            user: {
              email: email,
              password: password,
              password_confirmation: password_confirmation,
              lastname: lastname,
              firstname: firstname,
              telnum: telnum,
              companyname: companyname,
              fieldofbusiness: fieldofbusiness,
              city: city,
              if_admin: true,
              if_Topadmin: false,
              if_client: false,
            },
          },
          { withCredentials: true }
        )
        .then((response) => {
          //axios returns a promise
          console.log("registration response ", response);
          console.log(this.state.register_test);
          console.log(response.data.status);
          console.log(this.state.register_test);

          axios
            .post(url + "/api/v2/companies", {
              company: {
                companyname: companyname,
                fieldofbusiness: fieldofbusiness,
                city: city,
                user_id: response.data.user.id,
              },
            })
            .then((response) => {
              console.log(response);
              this.setState({ success: true });
            });
        })
        .catch((error) => {
          console.log("registration error ", error);
        });
    }
    if (this.state.success == true) {
      this.props.history.push("/");
    }
  };
  fob() {
    const fieldofbusiness = this.state;
    return (
      <select>
        <option>domaine de</option>
        {fieldofbusiness.map((option) => (
          <option key={option.id} value={option.name}>
            {option.name}
          </option>
        ))}
      </select>
    );
  }

  render() {
    {
      console.log(this.state.fieldofbusiness);
      console.log(this.state);
    }
    return (
      <div className="login">
        <div className="left">
          <img className="background" src={imgBackground} alt="imgBackground" />

          <img className="screen2" src={image1} />
          <img className="screen3" src={currency_dollar_blue} />
          <img className="icons" src={imgIcons} alt="imgIcons" />
        </div>
        <div className="wrapper">
          <img src={imageform} alt="imageform" />
          <form onSubmit={this.handleSubmit}>
            <h2>Inscription Admin d'Entreprise</h2>

            <p className="error"> {this.state.error} </p>
            <br />

            <div>
              <label style={{ top: "50px" }} htmlFor="Email">
                Email
              </label>

              <br />
              <input
                onChange={this.handleChange}
                name="email"
                id="email"
                type="text"
              />
              <br />
              <label
                style={{ top: "135px" }}
                className="password"
                htmlFor="password"
              >
                Passwor{" "}
              </label>
              <p className="error"> {this.state.passworderror} </p>
              <br />
              <input
                onChange={this.handleChange}
                name="password"
                id="password"
                type="password"
              />
              <p className="error"> {this.state.password_confirmationerror} </p>
              <br />
              <label
                style={{ top: "220px" }}
                className="password-conformation"
                htmlFor="password"
              >
                Password-Confomation
              </label>

              <br />
              <input
                onChange={this.handleChange}
                name="password_confirmation"
                id="password-confirmation"
                type="password"
              />
              <br />
              <label style={{ top: "305px" }} htmlFor="Nom">
                Nom
              </label>

              <br />
              <input
                onChange={this.handleChange}
                name="lastname"
                id="lastname"
                type="text"
              />
              <br />
              <label style={{ top: "400px" }} htmlFor="Prénom">
                Prénom
              </label>

              <br />
              <input
                onChange={this.handleChange}
                name="firstname"
                id="firstname"
                type="text"
              />
              <br />
              <label style={{ top: "485px" }} htmlFor="telnum">
                Numero de télephone
              </label>

              <br />
              <input
                onChange={this.handleChange}
                name="telnum"
                id="telnum"
                type="number"
              />
              <br />
              <label style={{ top: "570px" }} htmlFor="Nom shop/Entreprise">
                Nom du shop/Entreprise
              </label>

              <br />
              <p className="error"> {this.state.telnumerror} </p>
              <input
                onChange={this.handleChange}
                name="companyname"
                id="companyname"
                type="text"
              />
              <br />
              <label style={{ top: "655px" }} htmlFor="Domaine d'activité">
                Domaine d'activité
              </label>

              <br />
              {/*  <input
                onChange={this.handleChange}
                name="fieldofbusiness"
                id="fieldofbusiness"
                type="text"
            />*/}
              <div class="dropdownn">
                <select
                  class="dropbtnn"
                  name="fieldofbusiness"
                  onChange={this.handleChange}
                >
                  <option>------</option>
                  {this.state.fob.map((option) => (
                    <option key={option.id} value={option.name}>
                      {option.name}
                    </option>
                  ))}
                </select>
              </div>
              <br />
              <label style={{ top: "740px" }} htmlFor="ville">
                ville
              </label>

              <br />
              <input
                onChange={this.handleChange}
                name="city"
                id="city"
                type="text"
              />
              <br />
            </div>
          </form>
          <div style={{ paddingTop: 50 }}>
            <span>
              <p className="errorr"> {this.state.error} </p>
              <p className="errorr"> {this.state.telnumerror} </p>
            </span>
            <span>
              {" "}
              <p className="errorr">
                {" "}
                {this.state.passworderror}{" "}
                {this.state.password_confirmationerror}{" "}
              </p>
              <p> </p>
            </span>
          </div>
          <button type="submit" onClick={this.handleSubmit}>
            S'inscrire
          </button>
          <br />
          <button class="backb" type="submit" onClick={this.goback}>
            Retour
          </button>
        </div>
      </div>
    );
  }
}

export default withRouter(Register);
