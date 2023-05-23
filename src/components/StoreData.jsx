import { useState, useEffect } from 'react';
import { Form, Input, Button, message } from 'antd';
import moment from 'moment';

const StoreData = () => {
  const [form] = Form.useForm();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (values) => {
    setIsSubmitting(true);
    values.createdAt = new Date().toLocaleString();
    values.birthdate = moment(values.birthdate).format('dddd, DD/MM/YYYY');
    console.log(values);
    message.success('Data stored successfully');
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
    return new Promise((resolve, reject) => {
      // Simulating asynchronous check
      setTimeout(() => {
        if (value === 'John Doe') {
          reject(new Error('Name already exists'));
        } else {
          resolve(); // Validation succeeded
        }
      }, 1000);
    });
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
