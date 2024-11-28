/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { Button, Space, Table } from "antd";

import type { TableColumnsType, TableProps } from "antd";
import Spinner from "../../components/ui/spinner/Spinner";
import { useGetPaymentQuery } from "../../redux/features/payment/paymentApi";
import DashboardSectionTitle from "../../components/ui/dashboardSectionTitlte/DashboardSectionTitle";
import { useSelector } from "react-redux";
import { currentUser } from "../../redux/features/auth/authSlice";

type OnChange = NonNullable<TableProps<DataType>["onChange"]>;
type Filters = Parameters<OnChange>[1];

type DataType = {
  key: string;
  _id: string;
  createdAt: string;
  transactionId: string;
  amount: number;
  clientEmail: string;
  bikeId: string;
};

type SortState = {
  order?: "ascend" | "descend" | null;
  columnKey?: React.Key;
};

const PaymentManagement: React.FC = () => {
  const user = useSelector(currentUser);
  const [filteredInfo, setFilteredInfo] = useState<Filters>({});
  const [sortedInfo, setSortedInfo] = useState<SortState>({});

  const {
    data: paymentData,
    isLoading,
    refetch,
  } = useGetPaymentQuery(undefined);
  //console.log(paymentData);

  useEffect(() => {
    if (user) {
      refetch();
    }
  }, [user]);

  if (isLoading) return <Spinner />;

  const payments = paymentData?.data || [];

  const data: DataType[] = payments.map((payment: DataType) => ({
    key: payment._id,
    _id: payment._id,
    date: payment.createdAt,
    transactionId: payment.transactionId,
    amount: payment.amount,
    clientEmail: payment.clientEmail,
    bikeId: payment.bikeId,
  }));

  const columns: TableColumnsType<DataType> = [
    { title: "Date", dataIndex: "date", key: "date", ellipsis: true },
    {
      title: "Transaction ID",
      dataIndex: "transactionId",
      key: "transactionId",
      ellipsis: true,
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
      sorter: (a, b) => a.amount - b.amount,
      sortOrder: sortedInfo.columnKey === "amount" ? sortedInfo.order : null,
      ellipsis: true,
    },
    {
      title: "Email",
      dataIndex: "clientEmail",
      key: "clientEmail",
      filters: [...new Set(data.map((payment) => payment.clientEmail))].map(
        (clientEmail) => ({
          text: clientEmail,
          value: clientEmail,
        })
      ),
      filteredValue: filteredInfo.clientEmail || null,
      onFilter: (value, record) => record.clientEmail === value, // Exact match instead of includes
      ellipsis: true,
    },
    {
      title: "Bike ID",
      dataIndex: "bikeId",
      key: "bikeId",
      ellipsis: true,
    },
  ];

  const handleChange: OnChange = (_, filters, sorter) => {
    setFilteredInfo(filters);

    if (Array.isArray(sorter)) {
      setSortedInfo(sorter[0]);
    } else {
      setSortedInfo(sorter);
    }
  };

  const clearFilters = () => setFilteredInfo({});
  const clearAll = () => {
    setFilteredInfo({});
    setSortedInfo({});
  };

  return (
    <div className="p-2 sm:p-6">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <DashboardSectionTitle heading="All Payments" align="left" />
      </div>

      <Space style={{ marginBottom: 16 }} wrap>
        <Button onClick={clearFilters}>Clear filters</Button>
        <Button onClick={clearAll}>Clear filters and sorters</Button>
      </Space>

      <Table<DataType>
        columns={columns}
        dataSource={data}
        onChange={handleChange}
        scroll={{ x: "max-content" }}
      />
    </div>
  );
};

export default PaymentManagement;
