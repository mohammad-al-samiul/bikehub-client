import { Dispatch } from "react";
import {
  useGetSingleBikeQuery,
  useUpdateBikeMutation,
} from "../redux/features/bike/bikeApi";
import { FieldValues, SubmitHandler } from "react-hook-form";
import handleMutation from "../utils/handleMutation";
import { Modal } from "antd";
import Spinner from "./ui/spinner/Spinner";
import BForm from "./form/BForm";
import BInput from "./form/BInput";
import BSubmit from "./form/BSubmit";
import BNoData from "./form/BNoData";

type TModalProps = {
  isModalOpen: boolean;
  setIsModalOpen: Dispatch<React.SetStateAction<boolean>>;
  bikeId: string;
};

const UpdateBikeModal = ({
  isModalOpen,
  setIsModalOpen,
  bikeId,
}: TModalProps) => {
  const [updateBike] = useUpdateBikeMutation();
  const { data, isFetching } = useGetSingleBikeQuery(bikeId || undefined, {
    refetchOnMountOrArgChange: true,
  });
  const bikeData = data?.data;
  const defaultValues = {
    brand: bikeData?.brand,
    cc: bikeData?.cc,
    description: bikeData?.description,
    image: bikeData?.image,
    model: bikeData?.model,
    name: bikeData?.name,
    pricePerHour: bikeData?.pricePerHour,
    year: bikeData?.year,
  };

  const handleModalCancel = () => {
    // refetch();
    setIsModalOpen(false);
  };

  // handle update bike
  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    const bikeData = {
      ...data,
      cc: Number(data.cc),
      year: Number(data.year),
      pricePerHour: Number(data.pricePerHour),
    };
    const onSuccess = () => {
      setIsModalOpen(false);
    };
    handleMutation(
      { bikeData, bikeId },
      updateBike,
      "Bike is updating...",
      onSuccess
    );
  };

  return (
    <div>
      <Modal
        className="lg:min-w-[800px] w-full min-h-[400px]"
        footer={null}
        title="Update a Bike"
        open={isModalOpen}
        onCancel={handleModalCancel}
      >
        <div className=" min-h-[400px] flex items-center justify-center">
          {isFetching ? (
            <Spinner />
          ) : bikeData ? (
            <BForm onSubmit={onSubmit} defaultValues={defaultValues}>
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
          ) : (
            <BNoData />
          )}
        </div>
      </Modal>
    </div>
  );
};

export default UpdateBikeModal;
