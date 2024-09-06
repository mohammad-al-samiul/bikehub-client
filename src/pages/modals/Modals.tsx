import CustomDatePicker from "../datePicker/CustomDatePicker";

const Modals = ({ id }: { id: string }) => {
  return (
    <div className="w-full">
      <dialog id={id} className="modal modal-bottom sm:modal-middle ">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Hello!</h3>
          <p className="py-4">
            Press ESC key or click the button below to close
          </p>
          <div className="modal-action">
            <form method="dialog">
              <CustomDatePicker />
              <button className="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default Modals;
