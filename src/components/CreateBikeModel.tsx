import { Modal } from "antd";
import { useCreateBikeMutation } from "../redux/features/bike/bikeApi";
import handleMutation from "../utils/handleMutation";
import BForm from "./form/BForm";
import BInput from "./form/BInput";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { Dispatch } from "react";
import BSubmit from "./form/BSubmit";
type TModalProps = {
  isModalOpen: boolean;
  setIsModalOpen: Dispatch<React.SetStateAction<boolean>>;
};

const CreateBikeModal = ({ isModalOpen, setIsModalOpen }: TModalProps) => {
  const [createBike] = useCreateBikeMutation();

  const handleModalCancel = () => {
    setIsModalOpen(false);
  };

  // handle create a bike
  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    const onSuccess = () => {
      setIsModalOpen(false);
    };
    const bikeData = {
      ...data,
      cc: Number(data.cc),
      year: Number(data.year),
      pricePerHour: Number(data.pricePerHour),
    };
    handleMutation(bikeData, createBike, "Bike is being created...", onSuccess);
  };

  return (
    <div>
      <Modal
        className="lg:min-w-[800px] w-full"
        footer={null}
        title="Create a Bike"
        open={isModalOpen}
        onCancel={handleModalCancel}
      >
        <div>
          <BForm onSubmit={onSubmit}>
            <BInput type="text" name="name" label="Name" />
            <BInput type="file" name="image" label="Image URL" />
            <BInput type="number" name="pricePerHour" label="Price(hr)" />
            <BInput type="text" name="brand" label="Brand" />
            <BInput type="text" name="model" label="Model" />
            <BInput type="text" name="year" label="Year" />
            <BInput type="text" name="cc" label="Engine(CC)" />
            <BInput type="text" name="description" label="Description" />
            <BSubmit value="Login" />
          </BForm>
        </div>
      </Modal>
    </div>
  );
};

export default CreateBikeModal;
