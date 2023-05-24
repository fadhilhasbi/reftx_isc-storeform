import { useState, useEffect } from 'react';
import { Form, Input, Button, message } from 'antd';
import moment from 'moment';
import axios from 'axios';

const StoreData = () => {
  const [form] = Form.useForm();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (values) => {
    setIsSubmitting(true);
    values.createdAt = new Date().toLocaleString();
    values.birthdate = moment(values.birthdate).format('dddd, DD/MM/YYYY');
    console.log(values);

    axios
      .post(import.meta.env.VITE_API_URL, values)
      .then((response) => {
        console.log(response.data);
        message.success('Data stored successfully');
      })
      .catch((error) => {
        console.log(error);
        message.error('Failed to store data');
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  const maxWeight = 1000;
  const intervalTime = 3000;

  useEffect(() => {
    let submitTimer;
    if (isSubmitting) {
      submitTimer = setTimeout(() => {
        setIsSubmitting(false);
      }, intervalTime);
    }
    return () => clearTimeout(submitTimer);
  }, [isSubmitting]);

  const validateName = (_, value) => {
    if (/[^a-zA-Z]/.test(value)) {
      return Promise.reject(new Error('Name should only contain alphabetical characters'));
    }
    return Promise.resolve();
  };

  return (
    <Form form={form} onFinish={handleSubmit}>
      <Form.Item
        name="name"
        label="Name"
        rules={[
          { required: true, message: 'Name is required' },
          { validator: validateName },
        ]}
      >
        <Input placeholder="Enter your name" />
      </Form.Item>
      <Form.Item
        name="weight"
        label="Weight (kg)"
        rules={[{ required: true, message: 'Weight is required' }]}
      >
        <Input type="number" placeholder="Enter your weight" min={0} max={maxWeight} />
      </Form.Item>
      <Form.Item
        name="birthdate"
        label="Birthdate"
        rules={[{ required: true, message: 'Birthdate is required' }]}
      >
        <Input type="date" placeholder="Select your birthdate" />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Submitting...' : 'Submit'}
        </Button>
      </Form.Item>
    </Form>
  );
};

export default StoreData;
