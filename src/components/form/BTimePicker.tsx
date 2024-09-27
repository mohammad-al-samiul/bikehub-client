import { Col, Form, TimePicker } from "antd";
import { Controller } from "react-hook-form";

type TTimePickerProps = {
  name: string;
  label: string;
  placeholder?: string;
  disabled?: boolean;
  colSpanLg?: number;
  colSpanMd?: number;
};

const BTimePicker = ({
  name,
  label,
  placeholder,
  disabled,
  colSpanLg,
  colSpanMd,
}: TTimePickerProps) => {
  return (
    <Col
      span={24}
      lg={{ span: colSpanLg }}
      md={{ span: colSpanMd }}
      className="mx-auto"
    >
      <div className="flex items-center justify-center">
        <Controller
          name={name}
          defaultValue={null}
          render={({ field, fieldState: error }) => (
            <div className="w-full">
              <Form.Item
                htmlFor={name}
                label={label}
                className="mb-3 font-semibold"
              >
                <TimePicker
                  defaultValue={null}
                  format={"HH:mm"}
                  {...field}
                  id={name}
                  required
                  placeholder={placeholder}
                  disabled={disabled}
                  className="block font-normal rounded-none focus:border-primaryColor focus:shadow-none hover:border-primaryColor"
                  size="large"
                  style={{ width: "100%" }}
                />
                {error && <p>{error?.error?.message}</p>}
              </Form.Item>
            </div>
          )}
        />
      </div>
    </Col>
  );
};

export default BTimePicker;
