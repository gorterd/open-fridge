import React from "react";
import { Link } from "react-router-dom";

//ARRAY OF SAMPLE USERS FOR DEMO //

class SessionForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      email: "",
      password: "",
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    // this.displayErrors = this.displayErrors.bind(this);
  }

  // componentWillUnmount() {
  //   this.props.clearErrors();
  // }

  handleSubmit(e) {
    e.preventDefault();
    const user = Object.assign({}, this.state);
    // if (
    //   this.props.formType === "signup" &&
    //   user.username === "**ENTER A SEEDED DEMO USERR**" ///////////
    // )
    //   this.props.demoUser(user);
    // else this.props.processForm(user);
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

  // displayErrors() {
  //   let session = this.props.formType;

  //   return (
  //     <ul className={`${session}-error-list`}>
  //       {this.props.errors.map((error, idx) => {
  //         return (
  //           <li key={`error-${idx}`} id={`error-${idx}`}>
  //             {error}
  //           </li>
  //         );
  //       })}
  //     </ul>
  //   );
  // }




  render() {
    // shared items, value change on signup/login

    // let session = this.props.formType;
    let otherLink;
    let otherLinkText;
    let otherLinkLinkText;
    let sessionHeader;
    let submitButton;
    let baseColor;
    let placeholderEmail;
    let placeholderPW;
    let labelEmail;
    let labelPW;
    // if (this.props.formType === "login") {
    //   otherLink = "signup";
    //   sessionHeader = "Welcome to RobinsJacket";

    //   submitButton = "Sign In";
    //   baseColor = "lgreen";
    //   labelEmail = "Email or username";
    //   labelPW = "Password";
    //   placeholderEmail = "";
    //   placeholderPW = "";
    //   otherLinkText = "Get started ";
    //   otherLinkLinkText = "Create an account today";
    // } else {
      otherLink = "login";
    //   sessionHeader = "Make Your Money Move";
    //   submitButton = "Continue";
      baseColor = "sblue";
    //   placeholderEmail = "Email";
    //   placeholderPW = ""; //
    //   otherLinkText = "Already a member?";
    //   otherLinkLinkText = "Log In to start trading";
    // }

    let session = "signup"

    return (

  //     this.props.formType == "login" ? (

  //     <div className={`${session}-div`}>
  //       <div className="other-link-div">
  //         <span>Have an account?</span>
  //         <Link
  //           to={`/${otherLink}`}
  //           className={`link-${baseColor}-only other-link`}>
  //           Log In
  //         </Link>
  //       </div>

  //       <Link className={`logo-small ${session}-logo`} to="/">
  //         <img
  //           src={window.small_logo}  ///////////////NEED LOGO
  //           className={`logo-small ${session}-logo`}
  //           draggable="false"/>
  //       </Link>
  //       <h1>Member Login</h1>

  //       <form onSubmit={this.handleSubmit} className={`${session}-form-tag`}>
  //         <input
  //           type="text"
  //           value={this.state.username}
  //           placeholder="username"
  //           onChange={this.update("username")}
  //           className={`${session}-input ${session}-username`}/>
  //         <input
  //           type="password"
  //           value={this.state.password}
  //           placeholder="Password (min. 8 characters)"
  //           onChange={this.update("password")}
  //           className={`${session}-input ${session}-password`}/>

  //         <button className={`button-${baseColor} ${session}-submit`}>
  //           Login
  //         </button>




  //           <button 
  //             onClick={this.demoUser()}
  //             className={`button-${baseColor}`}>
  //             Demo Page
  //           </button>
  //         </div>

  //         {/* FIGURE OUT BEST WAY TO RENDER ERRORS */}
  //         <div className={`${session}-errors-div`}> 
  //           {this.props.errors ? this.displayErrors() : null}
  //         </div>

  //       </form>




  // ) : ( 
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
          <input
            type="text"
            value={this.state.username}
            placeholder="username"
            onChange={this.update("username")}
            className={`${session}-input ${session}-username`}/>
          <input
            type="text"
            value={this.state.email}
            placeholder="email"
            onChange={this.update("email")}
            className={`${session}-input ${session}-email`}/>
          <input
            type="password"
            value={this.state.password}
            placeholder="Password (min. 8 characters)"
            onChange={this.update("password")}
            className={`${session}-input ${session}-password`}/>

          <button className={`button-${baseColor} ${session}-submit`}>
            Get Cookin'
          </button>

          <div>
            <Link
              to={`/${otherLink}`}
              className={`link-${baseColor}-only other-link`}>
              Have an account? Log In
            </Link>

            <button 
              onClick={this.demoUser()}
              className={`button-${baseColor}`}>
              Demo Page
            </button>
          </div>

          {/* FIGURE OUT BEST WAY TO RENDER ERRORS */}
          {/* <div className={`${session}-errors-div`}> 
            {this.props.errors ? this.displayErrors() : null}
          </div> */}

        </form>

        <div className="session-footer">
          <p>openFridge Est. Mar 2020</p>
        </div>
      </div>

    ); //close return
  }
}

export default SessionForm;
