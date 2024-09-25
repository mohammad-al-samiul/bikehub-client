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
  // console.log("b", bikeId);
  const [updateBike] = useUpdateBikeMutation();
  const { data, isLoading } = useGetSingleBikeQuery(bikeId);
  if (isLoading) {
    return;
  }
  const bike = data?.data;
  //console.log("bikeData", data);
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

    console.log("bikeInfo", bikeInfo);

    const formData = new FormData();
    formData.append("file", data.image); // Assuming image is an array
    formData.append("data", JSON.stringify(bikeInfo)); // Append the JSON string

    const toastId = toast.loading("Updating bike!");
    const res = await updateBike({ formData, bikeId }).unwrap(); // Send FormData directly
    console.log("response", res);
    if (res.success) {
      toast.success("Update bike successfully!", {
        id: toastId,
        duration: 2000,
      });
    }
  };
  return (
    <Modal open={isModalOpen} onOk={handleOk} onCancel={handleCancel} footer="">
      <h1 className="text-xl font-bold text-center">Update Bike</h1>
      <div className="w-full ">
        <BForm onSubmit={onSubmit} defaultValues={defaultValues}>
          <BInput type="text" name="name" label="Name" />
          <BInput type="text" name="brand" label="Brand" />
          <BInput type="text" name="model" label="Model" />
          <BInput type="number" name="cc" label="Engine(cc)" />
          <BInput type="number" name="pricePerHour" label="Price (Hr)" />
          <BInput type="number" name="year" label="Year" />
          <BInput type="text" name="description" label="Description" />
          <BFileInput name="image" label="Bike Image" />
          <BSubmit value="Update Bike" />
        </BForm>
      </div>
    </Modal>
  );
};

export default UpdateBikeModal;
