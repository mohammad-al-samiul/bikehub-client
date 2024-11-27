import { Popconfirm, Space, Table, TableColumnsType, Tooltip } from "antd";
import { QuestionCircleOutlined } from "@ant-design/icons";

import {
  useDeleteUserMutation,
  useGetAllUsersQuery,
  useUpdateUserRoleMutation,
} from "../../../redux/features/auth/authApi";
import Spinner from "../../../components/ui/spinner/Spinner";
import { Trash, User, UserCog } from "lucide-react";
import { toast } from "sonner";

interface DataType {
  _id: string;
  name: string;
  email: string;
  phone: number;
  address: string;
  role: string;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
}

const Users = () => {
  const { data: userData, isLoading } = useGetAllUsersQuery([]);
  const [deleteUser] = useDeleteUserMutation();
  const [updateUserRole] = useUpdateUserRoleMutation();

  if (isLoading) {
    return <Spinner />;
  }

  const users = userData?.data;

  const handleDelete = async (userId: string) => {
    const res = await deleteUser(userId).unwrap();
    if (res.success) {
      toast.success("User Deleted Successfully!");
    }
  };

  const handleUpdate = async (userId: string) => {
    const res = await updateUserRole(userId).unwrap();
    if (res?.success) {
      toast.success("User Role Updated successfully!");
    }
  };

  const data: DataType[] = users?.map((user: DataType) => ({
    key: user?._id,
    _id: user?._id,
    name: user?.name,
    email: user?.email,
    phone: user?.phone,
    role: user?.role,
  }));

  const columns: TableColumnsType<DataType> = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      ellipsis: true,
      responsive: ["xs", "sm"], // Visible on all devices
    },
    {
      title: "User Email",
      dataIndex: "email",
      key: "email",
      ellipsis: true,
      responsive: ["xs", "sm"], // Visible on all devices
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
      render: (phone: number) => phone.toString(),
      ellipsis: true,
      responsive: ["xs", "sm"], // Visible on all devices
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
      ellipsis: true,
      responsive: ["xs", "sm"], // Visible on all devices
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          {/* User role management buttons */}
          {record?.role === "admin" ? (
            <a>
              <Tooltip title="Make User">
                <Popconfirm
                  title="Promote to Admin"
                  description="Are you sure to Promote this User to Admin?"
                  icon={<QuestionCircleOutlined style={{ color: "red" }} />}
                  onConfirm={() => handleUpdate(record?._id)}
                  okText="Yes"
                  cancelText="No"
                >
                  <User className="text-yellow-500" />
                </Popconfirm>
              </Tooltip>
            </a>
          ) : (
            <a>
              <Tooltip title="Make Admin">
                <Popconfirm
                  title="Promote to Admin"
                  description="Are you sure to Demote this Admin to an User?"
                  icon={<QuestionCircleOutlined style={{ color: "red" }} />}
                  onConfirm={() => handleUpdate(record?._id)}
                  okText="Yes"
                  cancelText="No"
                >
                  <UserCog className="text-yellow-500" />
                </Popconfirm>
              </Tooltip>
            </a>
          )}

          <a>
            <Tooltip title="Delete User">
              <Popconfirm
                title="Delete the User"
                description="Are you sure to delete this User?"
                icon={<QuestionCircleOutlined style={{ color: "red" }} />}
                onConfirm={() => handleDelete(record?._id)}
                okText="Yes"
                cancelText="No"
              >
                <Trash className="text-red-500" />
              </Popconfirm>
            </Tooltip>
          </a>
        </Space>
      ),
      responsive: ["xs", "sm"], // Visible on all devices
    },
  ];

  return (
    <div>
      <Table
        dataSource={data}
        columns={columns}
        rowKey="_id"
        loading={isLoading}
        scroll={{ x: "max-content" }} // Allow horizontal scrolling on small screens
      />
    </div>
  );
};

export default Users;
