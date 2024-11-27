import { Modal } from "antd";
import React, { Dispatch } from "react";
import BForm from "../../components/form/BForm";
import BInput from "../../components/form/BInput";
import BSubmit from "../../components/form/BSubmit";
import { FieldValues } from "react-hook-form";

type TModalProps = {
  isModalOpen: boolean;
  setIsModalOpen?: Dispatch<React.SetStateAction<boolean>>;
  userInfo: {
    name: string;
    email: string;
    phone: string;
    address: string;
  };
  handleCancel: () => void;
  handleOk?: () => void;
};

export default function UpdateProfileModal({
  isModalOpen,
  userInfo,
  handleCancel,
}: TModalProps) {
  const defaultValues = {
    name: userInfo.name,
    email: userInfo.email,
    phone: userInfo.phone,
    address: userInfo.address,
  };
  const onSubmit = (data: FieldValues) => {
    console.log(data);
  };

  return (
    <div>
      <Modal open={isModalOpen} onCancel={handleCancel} footer="">
        <h1 className="text-xl font-bold text-center">Update Profile</h1>
        <div className="w-full ">
          <BForm onSubmit={onSubmit} defaultValues={defaultValues}>
            <BInput type="text" name="name" label="Name" />
            <BInput type="text" name="email" label="Email" />
            <BInput type="number" name="phone" label="Phone" />
            <BInput type="text" name="address" label="Address" />
            <BSubmit value="Update" />
          </BForm>
        </div>
      </Modal>
    </div>
  );
}
