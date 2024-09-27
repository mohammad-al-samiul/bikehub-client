const BSmallButton = ({ value }: { value: string }) => {
  return (
    <div className="flex justify-end">
      <input
        className="btn btn-accent btn-sm text-white"
        type="submit"
        value={value}
      />
    </div>
  );
};

export default BSmallButton;
