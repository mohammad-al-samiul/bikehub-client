import { Button, message, Space } from "antd";

const ErrorMessage = ({ messageData }: { messageData: string }) => {
  const [messageApi, contextHolder] = message.useMessage();
  const error = () => {
    messageApi.open({
      type: "error",
      content: `${messageData}`,
    });
  };
  return (
    <div>
      {contextHolder}
      <Space>
        <Button onClick={error}>Error</Button>
      </Space>
    </div>
  );
};

export default ErrorMessage;
