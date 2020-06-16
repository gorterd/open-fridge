import { connect } from 'react-redux';

import Splash from './splash';
import { openModal, closeModal } from '../../actions/modal_actions';

const mSTP = state => {
  return {}
}

const mDTP = dispatch => ({
  openModal: modal => dispatch(openModal(modal)),
  closeModal: () => dispatch(closeModal()),
});

export default connect(mSTP, mDTP)(Splash);