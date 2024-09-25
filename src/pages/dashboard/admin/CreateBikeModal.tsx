import { Modal } from "antd";
import React from "react";
import BForm from "../../../components/form/BForm";
import { FieldValues, SubmitHandler } from "react-hook-form";
import BInput from "../../../components/form/BInput";
import BSubmit from "../../../components/form/BSubmit";
import BFileInput from "../../../components/form/BFileInput";
import { useCreateBikeMutation } from "../../../redux/features/bike/bikeApi";
import { toast } from "sonner";

export type TCreateBikeModalProps = {
  isModalOpen: boolean;
  handleOk: () => void;
  handleCancel: () => void;
};

const CreateBikeModal: React.FC<TCreateBikeModalProps> = ({
  isModalOpen,
  handleOk,
  handleCancel,
}) => {
  const [createBike] = useCreateBikeMutation();
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const bikeInfo = {
      name: data?.name,
      description: data?.description,
      pricePerHour: parseInt(data?.pricePerHour),
      isAvailable: true,
      cc: parseInt(data?.cc),
      year: parseInt(data?.year),
      model: data?.model,
      brand: data?.brand,
    };

    const formData = new FormData();
    formData.append("file", data.image); // Assuming image is an array
    formData.append("data", JSON.stringify(bikeInfo)); // Append the JSON string

    console.log("bikeInfo", formData);

    const toastId = toast.loading("Creating bike!");
    const res = await createBike(formData).unwrap(); // Send FormData directly
    console.log("response", res);
    if (res.success) {
      toast.success("Create bike successfully!", {
        id: toastId,
        duration: 2000,
      });
    }
  };
  return (
    <Modal open={isModalOpen} onOk={handleOk} onCancel={handleCancel} footer="">
      <h1 className="text-xl font-bold text-center">Create Bike</h1>
      <div className="w-full ">
        <BForm onSubmit={onSubmit}>
          <BInput type="text" name="name" label="Name" />
          <BInput type="text" name="brand" label="Brand" />
          <BInput type="text" name="model" label="Model" />
          <BInput type="number" name="cc" label="Engine(cc)" />
          <BInput type="number" name="pricePerHour" label="Price (Hr)" />
          <BInput type="number" name="year" label="Year" />
          <BInput type="text" name="description" label="Description" />
          <BFileInput name="image" label="Bike Image" />
          <BSubmit value="Create Bike" />
        </BForm>
      </div>
    </Modal>
  );
};

export default CreateBikeModal;
