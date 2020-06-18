import { connect } from "react-redux";
import ProfileShow from "./profile_show"

const mSTP = ({ session, entities: { users } }) => {
  return {
    currentUser: session.user,
  };
};

const mDTP = dispatch => {
    // return {
    //     fetchPinnedRecipes: ,
    //     fetchOwnRecipes: 
    // }
}

export default connect(mSTP)(ProfileShow);
