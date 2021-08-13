import {AppStateType} from '../../Redux/redux-store';

const selector = (state: AppStateType) => ({
  dialogsPage: state.dialogsPage,
});

export default selector;
