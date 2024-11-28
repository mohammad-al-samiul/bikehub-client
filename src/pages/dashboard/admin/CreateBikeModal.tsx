import { Modal } from "antd";
import React from "react";
import BForm from "../../../components/form/BForm";
import { FieldValues, SubmitHandler } from "react-hook-form";
import BInput from "../../../components/form/BInput";
import BSubmit from "../../../components/form/BSubmit";
import BFileInput from "../../../components/form/BFileInput";
import { useCreateBikeMutation } from "../../../redux/features/bike/bikeApi";
import { toast } from "sonner";
import BTextArea from "../../../components/form/BTextArea";

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

    // console.log("bikeInfo", formData);

    const toastId = toast.loading("Creating bike!");
    const res = await createBike(formData).unwrap(); // Send FormData directly
    //console.log("response", res);
    if (res.success) {
      handleOk();
      toast.success("Create bike successfully!", {
        id: toastId,
        duration: 2000,
      });
    }
  };
  return (
    <Modal
      open={isModalOpen}
      onOk={handleOk}
      onCancel={handleCancel}
      width={800}
      footer=""
    >
      <h1 className="text-xl font-bold text-center">Create Bike</h1>
      <div className="w-full ">
        <BForm onSubmit={onSubmit}>
          <div className="lg:flex gap-3">
            <BInput required={true} type="text" name="name" label="Name" />
            <BInput required={true} type="text" name="brand" label="Brand" />
          </div>
          <div className="lg:flex gap-3">
            <BInput required={true} type="text" name="model" label="Model" />
            <BInput
              required={true}
              type="number"
              name="cc"
              label="Engine(cc)"
            />
          </div>
          <div className="lg:flex gap-3">
            <BInput
              required={true}
              type="number"
              name="pricePerHour"
              label="Price (Hr)"
            />
            <BInput required={true} type="number" name="year" label="Year" />
          </div>
          <div className="lg:flex flex-col gap-3 lg:mb-8">
            <BTextArea required={true} name="description" label="Description" />
            <BFileInput required={true} name="image" label="Bike Image" />
          </div>
          <div className="mt-3">
            <BSubmit value="Create Bike" />
          </div>
        </BForm>
      </div>
    </Modal>
  );
};

export default CreateBikeModal;
