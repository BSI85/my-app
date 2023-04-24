import { sendMessage } from '../../redux/dialogs-reducer';
import Dialogs from './Dialogs';
import { connect } from 'react-redux';
import { withAuthRedirect } from '../hoc/withAuthRedirect';
import { compose } from 'redux';
import { AppStateType } from '../../redux/redux-store';
import { DialogsDataType, MessagesDataType } from '../types/types';

type MapStateToPropsType = {
  dialogsData: Array<DialogsDataType>;
  messagesData: Array<MessagesDataType>;
};

type MapDispatchToPropsType = {
  sendMessage: (addNewMessage: string) => void;
};

let mapStateToProps = (state: AppStateType): MapStateToPropsType => {
  return {
    dialogsData: state.dialogsPage.dialogsData,
    messagesData: state.dialogsPage.messagesData,
  };
};

export default compose<any>(
  connect<MapStateToPropsType, MapDispatchToPropsType, null, AppStateType>(mapStateToProps, {
    sendMessage,
  }),
  withAuthRedirect
)(Dialogs);
