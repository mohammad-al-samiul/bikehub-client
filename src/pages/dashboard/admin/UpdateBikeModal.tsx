/* eslint-disable @typescript-eslint/no-unused-vars */
import { Modal } from "antd";
import {
  useGetSingleBikeQuery,
  useUpdateBikeMutation,
} from "../../../redux/features/bike/bikeApi";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { toast } from "sonner";
import BForm from "../../../components/form/BForm";
import BInput from "../../../components/form/BInput";
import BFileInput from "../../../components/form/BFileInput";
import BSubmit from "../../../components/form/BSubmit";
import BTextArea from "../../../components/form/BTextArea";

type TUpdateBikeModalProps = {
  bikeId: string;
  handleCancel: () => void;
  handleOk: () => void;
  isModalOpen: boolean;
};

const UpdateBikeModal: React.FC<TUpdateBikeModalProps> = ({
  bikeId,
  isModalOpen,
  handleOk,
  handleCancel,
}) => {
  const [updateBike] = useUpdateBikeMutation();
  const { data, isFetching, isLoading } = useGetSingleBikeQuery(bikeId);

  if (isFetching || isLoading) {
    return null; // Return null or a loader while fetching the data
  }

  const bike = data?.data;

  const defaultValues = {
    name: bike?.name,
    description: bike?.description,
    pricePerHour: parseInt(bike?.pricePerHour),
    isAvailable: true,
    cc: parseInt(bike?.cc),
    year: parseInt(bike?.year),
    model: bike?.model,
    brand: bike?.brand,
  };

  const onSubmit: SubmitHandler<FieldValues> = async (formData) => {
    const bikeInfo = {
      name: formData?.name,
      description: formData?.description,
      pricePerHour: parseInt(formData?.pricePerHour),
      isAvailable: true,
      cc: parseInt(formData?.cc),
      year: parseInt(formData?.year),
      model: formData?.model,
      brand: formData?.brand,
    };

    const updateFormData = new FormData();
    updateFormData.append("file", formData.image); // Assuming image is an array
    updateFormData.append("data", JSON.stringify(bikeInfo));

    const toastId = toast.loading("Updating bike...");

    try {
      const response = await updateBike({
        formData: updateFormData,
        bikeId,
      }).unwrap();
      if (response.success) {
        toast.success("Bike updated successfully!", { id: toastId });
        handleOk(); // Close the modal after successful update
      } else {
        throw new Error("Update failed");
      }
    } catch (error) {
      toast.error("Failed to update bike", { id: toastId });
    }
  };

  return (
    <Modal width={800} open={isModalOpen} onCancel={handleCancel} footer="">
      <h1 className="text-xl font-bold text-center">Update Bike</h1>
      <div className="w-full ">
        <BForm onSubmit={onSubmit} defaultValues={defaultValues}>
          <div className="lg:flex gap-3">
            <BInput type="text" name="name" label="Name" />
            <BInput type="text" name="brand" label="Brand" />
          </div>
          <div className="lg:flex gap-3">
            <BInput type="text" name="model" label="Model" />
            <BInput type="number" name="cc" label="Engine(cc)" />
          </div>

          <div className="lg:flex gap-3">
            <BInput type="number" name="pricePerHour" label="Price (Hr)" />
            <BInput type="number" name="year" label="Year" />
          </div>
          <BTextArea name="description" label="Description" />
          <BFileInput name="image" label="Bike Image" />

          <div className="mt-3">
            <BSubmit value="Update Bike" />
          </div>
        </BForm>
      </div>
    </Modal>
  );
};

export default UpdateBikeModal;
