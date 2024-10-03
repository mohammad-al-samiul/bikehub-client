import { Modal } from "antd";
import BForm from "../../components/form/BForm";
import { FieldValues, SubmitHandler } from "react-hook-form";
import BTimePicker from "../../components/form/BTimePicker";
import BSmallButton from "../../components/form/BSmallButton";
import { useRentBikeMutation } from "../../redux/features/rent/rentApi";
import { useSelector } from "react-redux";
import { currentUser } from "../../redux/features/auth/authSlice";
import { toast } from "sonner";

type TBookingModalProps = {
  bikeId: string;
  isModalOpen: boolean;
  handleOk: () => void;
  handleCancel: () => void;
};

type TUser = {
  email?: string;
  role?: string;
  iat?: number;
  exp?: number;
};
const BookingModal = ({
  bikeId,
  isModalOpen,
  handleOk,
  handleCancel,
}: TBookingModalProps) => {
  const user: TUser = useSelector(currentUser)!;

  const [rentBike] = useRentBikeMutation();

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const time = new Date(data.startTime).toISOString();
    const formattedTime = time.slice(0, 19) + "Z";
    // console.log("time", time);

    const rentInfo = {
      bikeId,
      userEmail: user?.email,
      startTime: formattedTime,
    };

    const res = await rentBike(rentInfo).unwrap();
    //console.log(res);
    if (res.statusCode) {
      toast.success("Booking successfull");
      handleOk();
    }
  };
  return (
    <Modal
      title="Book the Bike"
      open={isModalOpen}
      onCancel={handleCancel}
      footer={null}
    >
      <>
        <BForm onSubmit={onSubmit}>
          <BTimePicker
            label="Start Time*"
            name="startTime"
            placeholder="Select Start Time"
          />
          <BSmallButton value="Book" />
        </BForm>
      </>
    </Modal>
  );
};

export default BookingModal;
