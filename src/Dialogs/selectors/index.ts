import {AppStateType} from '../../App/redux-store';

const selector = (state: AppStateType) => ({
  dialogsPage: state.dialogsPage,
});

export default selector;
