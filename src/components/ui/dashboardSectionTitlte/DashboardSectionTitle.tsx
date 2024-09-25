type TSectionTitleProps = {
  heading: string;
  subHeading?: string;
  align?: "left" | "center" | "right";
  color?: string;
};
const DashboardSectionTitle = ({
  heading,
  subHeading,
  align,
  color,
}: TSectionTitleProps) => {
  return (
    <div
      className={`mb-6 space-y-2 capitalize  ${align || "text-left"}`}
      style={{ color: color }}
    >
      <p className="text-slate-700 uppercase text-sm">{subHeading}</p>
      <h4 className="text-black font-semibold md:text-2xl text-[22px] md:capitalize uppercase">
        {heading}
      </h4>
    </div>
  );
};

export default DashboardSectionTitle;
