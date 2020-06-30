import { connect } from "react-redux";
import SessionForm from "./session_form";
import { login, clearErrors } from "../../actions/session_actions";
import sessionReducer from "../../reducers/session_reducer";

const mapStateToProps = (state, ownProps) => {
  console.log("MSTP LOGIN")
  console.log(state)
  console.log("MSTP LOGIN END")
  return {
  formType: "login",
  errors: state.errors.session,
  prevPath: ownProps.location,
  currentUser: state.session.user }
  // currentUser: sessionReducer.user }
};

const mapDispatchToProps = (dispatch) => ({
  processForm: (user) => dispatch(login(user)),
  clearErrors: () => dispatch(clearErrors()),
});

const LoginFormContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(SessionForm);


export default LoginFormContainer;
