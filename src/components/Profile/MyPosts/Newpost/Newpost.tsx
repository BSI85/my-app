import React, { Dispatch } from 'react';
import classes from './Newpost.module.css';
import { Formik, Form, Field, ErrorMessage, FormikErrors } from 'formik';
import { useDispatch } from 'react-redux';
import { addPost } from '../../../../redux/profile-reducer';

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
      onSubmit={(values, { setSubmitting, resetForm, setStatus }) => {
        props.onSubmit(values);
        resetForm();
        setSubmitting(false);
      }}
    >
      {({ isSubmitting }) => (
        <Form>
          <div className={classes.wrapper}>
            <div className={classes.img}>
              <img src={require('./icons8-customer-50.png')} alt="" />
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

// const NewpostForm: React.FC<InjectedFormProps<NewPostDataType>> = (props) => {
//   return (
//     <form className={classes.wrapper} onSubmit={props.handleSubmit}>
//       <div className={classes.img}>
//         <img src={require('./icons8-customer-50.png')} alt="" />
//       </div>
//       <Field
//         className={classes.field_ins}
//         component={Textarea}
//         name="newPostText"
//         placeholder="Write something..."
//         validate={[requiredField, maxLength30]}
//       ></Field>
//       <button className={classes.button}>Send message</button>
//     </form>
//   );
// };

// const NewpostFormRedux = reduxForm<NewPostDataType>({
//   form: 'newPost',
// })(NewpostForm);

export default Newpost;
