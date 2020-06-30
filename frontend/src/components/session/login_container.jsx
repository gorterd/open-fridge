import { connect } from "react-redux";
import SessionForm from "./session_form";
import { login, clearErrors } from "../../actions/session_actions";

const mapStateToProps = (state, ownProps) => ({
  formType: "login",
  errors: state.errors.session,
  prevPath: ownProps.location,
  currentUser: state.session.user
});

const mapDispatchToProps = (dispatch) => ({
  processForm: (user) => dispatch(login(user)),
  clearErrors: () => dispatch(clearErrors()),
});

const LoginFormContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(SessionForm);


export default LoginFormContainer;
