import React from "react";
import { Link } from "react-router-dom";
import './session.css';
import sandwich from './session-sandwich-flat.png'

class SessionForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      email: "",
      password: "",
      toggle: false,
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.displayErrors = this.displayErrors.bind(this);
  }

  // componentWillUnmount() {
  //   this.props.clearErrors();
  // }

  handleSubmit(e) {
    e.preventDefault();
    const user = Object.assign({}, this.state);
    // if (
    //   this.props.formType === "signup" &&
    //   user.username === "**ENTER A SEEDED DEMO USERR**" ///////
    // )
    //   this.props.demoUser(user);
    this.props.processForm(user);
    if (this.props.formType === "login") {
      this.setState({toggle: true})
    }
  }

  update(field) {
    return (e) => {
      this.setState({ [field]: e.currentTarget.value });
    };
  }

  demoUser(e) {
    const user = {
      username: "**ENTER A SEEDED DEMO USERR EMAIL**",
      email: "**ENTER A SEEDED DEMO USERR EMAIL**",
      password: "PASSWORD",
    };

    return () => {
      this.setState(user);
    };
  }

  displayErrors() {
    let session = this.props.formType;

    return (
      // <ul className={`${session}-error-list`}>
      //   {this.props.errors.map((error, idx) => {
      //     return (
      //       <li key={`error-${idx}`} id={`error-${idx}`}>
      //         {error}
      //       </li>
      //     );
      //   })}
      // </ul>
      <div>{Object.values(this.props.errors)}</div>
    );
  }




  render() {

    let session = this.props.formType;
    let otherLink;
    let loginImage;
    if (this.props.formType === "login") {
      otherLink = "signup";

    } else {
      otherLink = "login";
    }
    if (this.state.toggle) {
      loginImage = "https://media.giphy.com/media/3oz8xISxzK7kuAQ3zq/giphy.gif";
    } else {
      loginImage = sandwich;
    }

    return this.props.formType == "login" ? (
      <div className={`${session}-div`}>
        <div className={`${session}-container`}>
          <div className="other-link-div">
            <Link to={`/${otherLink}`} className="other-link">
              Sign Up
            </Link>

            <button
              onClick={this.demoUser()}
              className={`${session}-demo-button`}>
              Demo Page
            </button>
          </div>

          {/* <Link className={`logo-small ${session}-logo`} to="/">
            <img
              src={window.small_logo}  ///////////////NEED LOGO
              className={`logo-small ${session}-logo`}
              draggable="false"/>
          </Link> */}
          <h1>Member Login</h1>

          <form onSubmit={this.handleSubmit} className={`${session}-form-tag`}>
            <div className={`${session}-form-div`}>
              <input
                type="text"
                value={this.state.username}
                placeholder="username"
                onChange={this.update("username")}
                className={`${session}-input ${session}-username`}
              />
              <input
                type="password"
                value={this.state.password}
                placeholder="password"
                onChange={this.update("password")}
                className={`${session}-input ${session}-password`}
              />

              <button className={`${session}-submit`}>Login</button>
            </div>
          </form>

          <img src={loginImage} draggable="false" className="login-img" />

          {/* <img
              src="https://media.giphy.com/media/3o85g3loeiLcF26OZy/giphy.gif"
              draggable="false"
            /> */}

          {/* FIGURE OUT BEST WAY TO RENDER ERRORS */}
          <div className={`${session}-errors-div`}>
              {this.props.errors ? this.displayErrors() : null}
          </div>
        </div>
      </div>
    ) : (
      <div className="signup-container">
        <div className={`${session}-div`}>
          {/* <Link className="logo-small signup-logo" to="/">  //SHOULD WE HAVE LOGO FOR SIGNUP?
          <img
            src={window.small_logo}  ///////////////NEED LOGO
            className="logo-small signup-logo"
            draggable="false"
          />
        </Link> */}

          <h1>Member Signup</h1>

          <form onSubmit={this.handleSubmit} className={`${session}-form-tag`}>
            <div className={`${session}-form`}>
              <input
                type="text"
                value={this.state.username}
                placeholder="username"
                onChange={this.update("username")}
                className={`${session}-input ${session}-username`}
              />
              <input
                type="text"
                value={this.state.email}
                placeholder="email"
                onChange={this.update("email")}
                className={`${session}-input ${session}-email`}
              />
              <input
                type="password"
                value={this.state.password}
                placeholder="Password (min. 8 characters)"
                onChange={this.update("password")}
                className={`${session}-input ${session}-password`}
              />

              <button className={`${session}-submit`}>Get Cookin'</button>

              <div className="signup-bottom-buttons">
                <span>Have an account?</span>
                <Link to={`/${otherLink}`} className={`other-link`}>
                  Log In
                </Link>

                <button
                  onClick={this.demoUser()}
                  className={`${session}-demo-button`}
                >
                  Demo Page
                </button>
              </div>

              {/* FIGURE OUT BEST WAY TO RENDER ERRORS */}
              <div className={`${session}-errors-div`}> 
                {this.props.errors ? this.displayErrors() : null}
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
