import { DatePicker, Space } from "antd";
import type { GetProps } from "antd";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { CSSProperties } from "react";

type RangePickerProps = GetProps<typeof DatePicker.RangePicker>;
dayjs.extend(customParseFormat);
const { RangePicker } = DatePicker;

const datePickerStyles: CSSProperties = {
  zIndex: 1050,
};

const CustomDatePicker = () => {
  const disabledDate: RangePickerProps["disabledDate"] = (current) => {
    return current && current < dayjs().startOf("day");
  };

  const handleChange = (
    dates: [dayjs.Dayjs | null, dayjs.Dayjs | null] | null,
    dateStrings: [string, string]
  ) => {
    console.log("Selected Dates:", dates);
    console.log("Formatted Date Strings:", dateStrings);
  };

  return (
    <Space>
      <RangePicker
        disabledDate={disabledDate}
        onChange={handleChange}
        getPopupContainer={(trigger) => trigger.parentElement!}
        popupClassName="custom-date-picker-dropdown"
        style={datePickerStyles}
      />
    </Space>
  );
};

export default CustomDatePicker;
