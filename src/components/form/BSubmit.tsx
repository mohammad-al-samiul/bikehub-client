const BSubmit = ({ value }: { value: string }) => {
  return (
    <input
      className="btn btn-accent w-full text-white"
      type="submit"
      value={value}
    />
  );
};

export default BSubmit;
