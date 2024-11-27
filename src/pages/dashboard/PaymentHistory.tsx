import { Table } from "antd";

export default function PaymentHistory() {
  const columns = [
    { title: "Date", dataIndex: "date", key: "date" },
    {
      title: "Transaction ID",
      dataIndex: "transactionId",
      key: "transactionId",
    },
    { title: "Amount", dataIndex: "amount", key: "amount" },
    { title: "Payment Status", dataIndex: "status", key: "status" },
  ];

  const data = [
    {
      key: 1,
      date: "2024-11-25",
      transactionId: "TX12345",
      amount: "$50",
      status: "Completed",
    },
    {
      key: 2,
      date: "2024-11-20",
      transactionId: "TX12346",
      amount: "$30",
      status: "Pending",
    },
  ];
  return (
    <div>
      <h2>Payment History</h2>
      <Table columns={columns} dataSource={data} />
    </div>
  );
}
