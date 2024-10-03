import { Dispatch } from "react";
import { useReturnBikeMutation } from "../../../redux/features/rent/rentApi";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { Modal } from "antd";
import BForm from "../../../components/form/BForm";
import BTimePicker from "../../../components/form/BTimePicker";

import BSmallButton from "../../../components/form/BSmallButton";
import { toast } from "sonner";

type TModalProps = {
  isModalOpen: boolean;
  setIsModalOpen: Dispatch<React.SetStateAction<boolean>>;
  rentalId: string;
};

const CalculateRentalCostModal = ({
  isModalOpen,
  setIsModalOpen,
  rentalId,
}: TModalProps) => {
  const { reset } = useForm();
  const handleModalCancel = () => {
    setIsModalOpen(false);
  };
  const [returnBike] = useReturnBikeMutation();

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const time = data?.endTime?.toISOString();
    const rentalEndTime = {
      endTime: time,
    };
    const res = await returnBike({ rentalEndTime, rentalId }).unwrap();
    // console.log("res", res);

    if (res.success) {
      setIsModalOpen(false);
      reset();
      toast.success("Bike Return Successfully!");
    }
  };

  return (
    <div>
      <Modal
        footer={null}
        title="Calculate rental cost!"
        open={isModalOpen}
        onCancel={handleModalCancel}
      >
        <div>
          <BForm onSubmit={onSubmit}>
            <BTimePicker
              label="End Time*"
              name="endTime"
              placeholder="Select end time"
            />
            <BSmallButton value="Calculate Cost" />
          </BForm>
        </div>
      </Modal>
    </div>
  );
};

export default CalculateRentalCostModal;
