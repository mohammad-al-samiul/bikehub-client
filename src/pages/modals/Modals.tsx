const Modals = ({ id }: { id: string }) => {
  return (
    <div className="w-full">
      <dialog
        id={id}
        className="modal modal-bottom sm:modal-middle h-full w-full"
      >
        <div className="modal-box h-[700px] w-[600px]">
          <h3 className="font-bold text-lg">Submit this Booking Form</h3>

          <div className="modal-action"></div>
        </div>
      </dialog>
    </div>
  );
};

export default Modals;
