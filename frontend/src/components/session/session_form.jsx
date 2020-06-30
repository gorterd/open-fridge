import React from "react";
import { Link } from "react-router-dom";
import './session.css';
import { FaLinkedin, FaGithub } from "react-icons/fa";

class SessionForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      email: "",
      password: "",
      errors: this.props.errors ///prepare local state
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    console.log("sessionprops start")
    console.log(this.props)
    console.log("sessionprops end")
  }

  componentWillUnmount() {
    this.props.clearErrors();
  }

  handleSubmit(e) {
    e.preventDefault();
    const user = Object.assign({}, this.state);
    if ( this.props.formType === "signup" && user.username === "openFridgeDemo" ) {
      this.props.demoUser(user);
    }
    else {
      this.props.history.goBack()
      this.props.processForm(user)
        .then( () => { 
          if (this.props.location.state && this.props.prevPath.state) {
            this.props.history.push(this.props.prevPath.state.prevPath)
          }
        })
    }
  }

  update(field) {
    return (e) => {
      this.setState({ [field]: e.currentTarget.value });
    };
  }

  demoUser(e) {
    const user = {
      username: "openFridgeDemo",
      email: "demoUser@openFridge.com",
      password: "password",
    };

    return () => {
      this.setState(user)
    };
  }

  render() {

    let session = this.props.formType;
    let otherLink;
    otherLink = (this.props.formType === "login") ? "signup" : "login";

    let loginError = "";
    let loginErrorMsg = " ";
    let loginErrorClass = "";
    if (this.props.formType === "login" && Object.values(this.props.errors).length) {
      loginError = "animated shake"; 
      loginErrorMsg = "invalid username & password combination";
      loginErrorClass = "login-error-class";
    }

    let usernameErrors = null;
    let userErrorsCN = "";
    let emailErrors = null;
    let emailErrorsCN = "";
    let passwordErrors = null;
    let passErrorsCN = "";
    if (this.props.errors) {
      if (this.props.errors.username) {
        usernameErrors = this.props.errors.username;
        userErrorsCN = "userErrors";
      };
      if (this.props.errors.email) {
        emailErrors = this.props.errors.email;
        emailErrorsCN = "emailErrors";
      };
      if (this.props.errors.password) {
        passwordErrors = this.props.errors.password;
        passErrorsCN = "passErrors";
      };
    }

    return this.props.formType === "login" ? (
      <div className={`${session}-div`}>
        <Link className="session-logo login-logo" to="/"></Link>

        <div className={`${session}-container`}>
          <div className="session-github">
            <a href="https://github.com/gorterd/open-fridge.git" id="of-github">oF</a>
            <a href="https://github.com/gorterd" id="dg-github">DG</a>
            <a href="https://github.com/EricLo1321" id="dg-github">EL</a>
            <a href="https://github.com/keely-lee" id="dg-github">KL</a>
            <a href="https://github.com/tt954" id="dg-github">TT</a>
            <FaGithub />
          </div>
          {/* <div className="session-linkedin">
            <FaLinkedin />
            <a href="" id="dg-linkedin">TT</a>
            <a href="https://www.linkedin.com/in/keely-lee1/" id="dg-linkedin">KL</a>
            <a href="" id="dg-linkedin">EL</a>
            <a href="" id="dg-linkedin">DG</a>
          </div> */}

          <h1>Member Login</h1>

          <form onSubmit={this.handleSubmit} className={`${session}-form-tag`}>
            <div className={`${session}-form-div`}>
              <input
                type="text"
                value={this.state.username}
                placeholder="username"
                onChange={this.update("username")}
                className={`${session}-input ${loginError}`}
              />

              <input
                type="password"
                value={this.state.password}
                placeholder="password"
                onChange={this.update("password")}
                className={`${session}-input ${loginError}`}
              />
            </div>

            <button className={`${session}-submit`}>Login</button>

            <div className="other-link-wrap">
              <div className={loginErrorClass}>{loginErrorMsg}</div>
              <Link to={`/${otherLink}`} className={`${session}-other-link`}>
                Create an Account
              </Link>

              <button
                onClick={this.demoUser()}
                className={`${session}-demo-button`}
              >
                Demo Page
              </button>
            </div>
          </form>
        </div>
      </div>
    ) : (
      <div className="signup-container">
        <Link className="session-logo" to="/"></Link>

        <div className={`${session}-div`}>
          <h1>Member Signup</h1>

          <form onSubmit={this.handleSubmit} className={`${session}-form-tag`}>
            <div className={`${session}-form`}>
              <input
                type="text"
                value={this.state.username}
                placeholder="username"
                onChange={this.update("username")}
                className={`${session}-input ${session}-username`}
                id={userErrorsCN}
              />
              <div className={`${userErrorsCN}-signup`}>{usernameErrors}</div>

              <input
                type="text"
                value={this.state.email}
                placeholder="email"
                onChange={this.update("email")}
                className={`${session}-input ${session}-email`}
                id={emailErrorsCN}
              />
              <div className={`${emailErrorsCN}-signup`}>{emailErrors}</div>

              <input
                type="password"
                value={this.state.password}
                placeholder="Password (min. 8 characters)"
                onChange={this.update("password")}
                className={`${session}-input ${session}-password`}
                id={passErrorsCN}
              />
              <div className={`${passErrorsCN}-signup`}>{passwordErrors}</div>

              <button className={`${session}-submit`}>Get Cookin'</button>

              <div className="signup-bottom-buttons">
                <span>Have an account?</span>
                <Link to={`/${otherLink}`} className={`${session}-other-link`}>
                  Log In
                </Link>

                <button
                  onClick={this.demoUser()}
                  className={`${session}-demo-button`}
                >
                  Demo Page
                </button>
              </div>
            </div>
          </form>

          <div className="session-footer">
            <p>openFridge Est. Mar 2020</p>
          </div>
        </div>
      </div>
    ); 
  }
}

export default SessionForm;
