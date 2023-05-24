import React, { Dispatch } from 'react';
import classes from './Newpost.module.css';
import { Formik, Form, Field, ErrorMessage, FormikErrors } from 'formik';
import { useDispatch } from 'react-redux';
import { addPost } from '../../../../redux/profile-reducer';
import { UserOutlined } from '@ant-design/icons';
import { Avatar } from 'antd';

type FormValues = {
  newPostText: string;
};
type FormikPropsType = {
  onSubmit: (values: FormValues) => void;
};

const Newpost: React.FC = () => {
  const dispatch: Dispatch<any> = useDispatch();
  const onSubmit = (values: FormValues) => {
    dispatch(addPost(values.newPostText));
  };

  return <FormikForm onSubmit={onSubmit} />;
};

const FormikForm: React.FC<FormikPropsType> = (props) => (
  <div>
    <Formik
      initialValues={{ newPostText: '' }}
      validate={(values: FormValues) => {
        const errors: FormikErrors<FormValues> = {};
        if (!values.newPostText) {
          errors.newPostText = 'Field is required';
        } else if (values.newPostText.length > 200) {
          errors.newPostText = 'Your message is to long';
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
        <Form>
          <div className={classes.wrapper}>
            <div className={classes.img}>
              <Avatar size={48} icon={<UserOutlined />} />
            </div>
            <div className={classes.text}>
              <Field type="text" name="newPostText" placeholder="Write something..." />
            </div>
            <button type="submit" disabled={isSubmitting} className={classes.button}>
              Add message
            </button>
          </div>
          <div className={classes.errorMessage}>
            <ErrorMessage name="newPostText" component="div" />
          </div>
        </Form>
      )}
    </Formik>
  </div>
);

export default Newpost;
