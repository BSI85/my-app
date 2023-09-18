import React from 'react';
import classes from './DialogForm.module.css';
import { Button, Form, Input } from 'antd';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Dispatch } from 'redux';
import { sendMessage } from '../../../redux/dialogs-reducer';

const { TextArea } = Input;

const DialogFormANTD: React.FC = () => {
  let params = useParams();
  const dispatch: Dispatch<any> = useDispatch();
  const [form] = Form.useForm();
  const onFinish = (e: any) => {
    dispatch(sendMessage(Number(params.dialogID), e.message));
    form.resetFields(['message']);
  };
  return (
    <div className={classes.form_wrapper}>
      <Form onFinish={onFinish} form={form}>
        <Form.Item name="message">
          <TextArea
            showCount
            maxLength={100}
            style={{ height: 60, resize: 'none' }}
            placeholder="Write your message here..."
            allowClear
          />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Send
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default DialogFormANTD;
