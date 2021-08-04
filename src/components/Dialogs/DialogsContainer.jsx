import {connect} from 'react-redux';
import {compose} from 'redux';

import {sendMessageCreator} from '../../Redux/state';
import {withAuthRedirect} from '../../hoc/withAuthRedirect';

import Dialogs from './Dialogs';

const mapStateToProps = state => ({
  dialogsPage: state.dialogsPage,
});
const mapDispatchToProps = dispatch => ({
  sendMessage: newMessageBody => {
    dispatch(sendMessageCreator(newMessageBody));
  },
});

export default compose(connect(mapStateToProps, mapDispatchToProps), withAuthRedirect)(Dialogs);
