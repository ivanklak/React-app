import {connect} from 'react-redux';
import {compose} from 'redux';

import {sendMessageCreator} from '../../Redux/state';
import Dialogs from './Dialogs';
import {withAuthRedirect} from '../../hoc/withAuthRedirect';


let mapStateToProps = state => {
  return {
    dialogsPage: state.dialogsPage,
  };
};
let mapDispatchToProps = dispatch => {
  return {
    sendMessage: newMessageBody => {
      dispatch(sendMessageCreator(newMessageBody));
    },
  };
};

export default compose(connect(mapStateToProps, mapDispatchToProps), withAuthRedirect)(Dialogs);
