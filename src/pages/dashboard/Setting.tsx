import React from "react";
import { Form, Input, Switch, Button } from "antd";

const Settings: React.FC = () => {
  const [form] = Form.useForm();

  const onFinish = (values: any) => {
    console.log("Settings Updated:", values);
  };

  return (
    <div>
      <h2>Settings</h2>
      <Form form={form} layout="vertical" onFinish={onFinish}>
        <Form.Item
          label="Email Notifications"
          name="emailNotifications"
          valuePropName="checked"
        >
          <Switch />
        </Form.Item>
        <Form.Item label="Phone Number" name="phone">
          <Input placeholder="Enter your phone number" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Save Settings
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Settings;
