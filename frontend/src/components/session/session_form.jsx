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
      signupErrors: {
        username: null,
        email: null,
        password: null,
      },
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this._redirectAfterSubmit = this._redirectAfterSubmit.bind(this);
  }

  componentWillUnmount() {
    if (Object.keys(this.props.errors).length) {
      this.props.clearErrors();
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    const user = Object.assign({}, this.state);

    if ( this.props.formType === "signup" && user.username === "openFridgeDemo" ) {
      this.props.demoUser(user)
        .then( (res) => this._redirectAfterSubmit(res) )
    } else {
      this.props.processForm(user)
        .then((res) => {
          if (res.type){
            this.setState({ signupErrors: Object.assign({}, res.errors) })
          } else {
            this._redirectAfterSubmit(res);
          }
        })
    }
  }

  update(field) {
    return (e) => {
      if ( this.props.formType === 'login' && Object.keys(this.props.errors).length ){
        this.props.clearErrors();
      } else if ( this.props.formType === 'signup' && Object.keys(this.props.errors).length ){
        const err = Object.assign({}, this.state.signupErrors);
        err[field] = "";
        this.setState({ signupErrors: err })
      }
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

  _redirectAfterSubmit(user){
    if (this.props.prevPath.state
      && this.props.prevPath.state.prevPath !== '/'
    ) {
      this.props.history.push(this.props.prevPath.state.prevPath)
    } else {
      this.props.history.push(`/users/${user.id}`);
    }
  }

  render() {

    let session = this.props.formType;
    let otherLink;
    otherLink = (this.props.formType === "login") ? "signup" : "login";

    let loginError = "";
    let loginErrorMsg = "";
    let loginErrorClass = "";
    if (this.props.formType === "login" && Object.values(this.props.errors).length) {
      loginError = "animated shake"; 
      loginErrorMsg = "invalid username & password combination";
      loginErrorClass = "login-error-class";
    }

    let userErrorsCN = "";
    let emailErrorsCN = "";
    let passErrorsCN = "";
    let signupErrors = this.state.signupErrors;
    if (this.props.errors) {
      if (signupErrors.username) {
        userErrorsCN = "userErrors";
      };
      if (signupErrors.email) {
        emailErrorsCN = "emailErrors";
      };
      if (signupErrors.password) {
        passErrorsCN = "passErrors";
      };
    }

    return this.props.formType === "login" ? (
      <div className={`${session}-div`}>
        <Link className="session-logo login-logo" to="/"></Link>

        <div className={`${session}-container`}>
          <div className="session-github">
            <a href="https://github.com/gorterd/open-fridge.git" id="of-github">oF</a>
            <a href="https://github.com/gorterd" className="dg-github">DG</a>
            <a href="https://github.com/EricLo1321" className="dg-github">EL</a>
            <a href="https://github.com/keely-lee" className="dg-github">KL</a>
            <a href="https://github.com/tt954" className="dg-github">TT</a>
            <FaGithub />
          </div>
          <div className="session-linkedin">
            <a href="https://www.linkedin.com/in/tieulam-thai-01bb3112b/" className="dg-linkedin">TT</a>
            <a href="https://www.linkedin.com/in/keely-lee1/" className="dg-linkedin">KL</a>
            {/* <a href="" className="dg-linkedin">EL</a> */}
            <a href="https://www.linkedin.com/in/daniel-gorter-87549277/" className="dg-linkedin">DG</a>
            <FaLinkedin />
          </div>

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
              <Link className={`${session}-other-link`} to={{
                pathname: `/${otherLink}`,
                state: { prevPath: this.props.prevPath.state ? this.props.prevPath.state.prevPath : this.props.prevPath }
              }}>
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
                id={userErrorsCN || 'sgn-user'}
              />
              <div className={`${userErrorsCN}-signup`}>{signupErrors.username}</div>

              <input
                type="text"
                value={this.state.email}
                placeholder="email"
                onChange={this.update("email")}
                className={`${session}-input ${session}-email`}
                id={emailErrorsCN || 'sgn-email'}
              />
              <div className={`${emailErrorsCN}-signup`}>{signupErrors.email}</div>

              <input
                type="password"
                value={this.state.password}
                placeholder="Password (min. 8 characters)"
                onChange={this.update("password")}
                className={`${session}-input ${session}-password`}
                id={passErrorsCN || 'sgn-password'}
              />
              <div className={`${passErrorsCN}-signup`}>{signupErrors.password}</div>

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
