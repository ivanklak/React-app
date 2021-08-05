import {connect} from 'react-redux';

import {sendMessageCreator} from '../../Redux/state';

import Dialogs from './Dialogs';

const mapStateToProps = state => ({
  dialogsPage: state.dialogsPage,
});
const mapDispatchToProps = dispatch => ({
  sendMessage: newMessageBody => {
    dispatch(sendMessageCreator(newMessageBody));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Dialogs);
