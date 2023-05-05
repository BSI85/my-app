import React, { Dispatch } from 'react';
import classes from './Dialogs.module.css';
import Message from './Message/Message';
import DialogItem from './DialogItem/DialogItem';
import { Formik, Form, Field, ErrorMessage, FormikErrors } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { AppStateType } from '../../redux/redux-store';
import { sendMessage } from '../../redux/dialogs-reducer';

type FormValues = {
  newMessageBody: string;
};
type FormikPropsType = {
  onSubmit: (values: FormValues) => void;
};

const Dialogs: React.FC = () => {
  const dialogsData = useSelector((state: AppStateType) => state.dialogsPage.dialogsData);
  const messagesData = useSelector((state: AppStateType) => state.dialogsPage.messagesData);

  const dispatch: Dispatch<any> = useDispatch();
  const onSubmit = (values: FormValues) => {
    dispatch(sendMessage(values.newMessageBody));
  };

  let dialogsElements = dialogsData.map((d) => <DialogItem key={d.id} name={d.name} id={d.id} />);
  let messagesElements = messagesData.map((m) => <Message key={m.id} message={m.message} />);

  return (
    <div className={classes.dialogs}>
      <div className={classes.dialogs_block}>{dialogsElements}</div>
      <div className={classes.messages_block}>
        <div className={classes.messages}>{messagesElements}</div>
        <div className={classes.sendarea}>
          <FormikForm onSubmit={onSubmit} />
        </div>
      </div>
    </div>
  );
};

const FormikForm: React.FC<FormikPropsType> = (props) => (
  <div>
    <Formik
      initialValues={{ newMessageBody: '' }}
      validate={(values: FormValues) => {
        const errors: FormikErrors<FormValues> = {};
        if (values.newMessageBody.length > 100) {
          errors.newMessageBody = 'Your message is to long';
        }
        return errors;
      }}
      onSubmit={(values, { setSubmitting, resetForm }) => {
        props.onSubmit(values);
        resetForm();
        setSubmitting(false);
      }}
    >
      {({ isSubmitting }) => (
        <Form className={classes.textarea_wrapper}>
          <div className={classes.textarea}>
            <Field type="text" name="newMessageBody" />
          </div>
          <ErrorMessage name="newMessageBody" component="div" className={classes.errorMessage} />

          <button type="submit" disabled={isSubmitting}>
            Submit
          </button>
        </Form>
      )}
    </Formik>
  </div>
);

export default Dialogs;
