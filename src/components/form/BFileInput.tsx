import { message, Upload, UploadProps } from "antd";
import { Controller, useFormContext } from "react-hook-form";
import { InboxOutlined } from "@ant-design/icons";
const { Dragger } = Upload;

type TFileInputProps = {
  name: string;
  label: string;
  required?: boolean;
};

const props: UploadProps = {
  name: "file",
  multiple: true,
  action: "https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload",
  onChange(info) {
    const { status } = info.file;
    if (status !== "uploading") {
      // console.log(info.file, info.fileList);
    }
    if (status === "done") {
      message.success(`${info.file.name} file uploaded successfully.`);
    } else if (status === "error") {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
  onDrop(e) {
    console.log("Dropped files", e.dataTransfer.files);
  },
};

const BFileInput = ({ name, label, required = false }: TFileInputProps) => {
  const {
    formState: { errors },
  } = useFormContext();

  const errorMessage = errors[name]?.message as string | undefined;

  return (
    <div className="w-full" style={{ marginBottom: "15px" }}>
      {label && <label htmlFor={name}>{label}</label>}

      <Controller
        name={name}
        defaultValue={null}
        rules={{
          required: required ? `${label} is required` : false, // Conditional required validation
        }}
        render={({ field: { onChange, value } }) => (
          <Dragger
            {...props}
            beforeUpload={(file) => {
              onChange(file); // Update form state
              return false; // Prevent automatic upload
            }}
            fileList={value ? [value] : []} // Display selected files
          >
            <p className="ant-upload-drag-icon">
              <InboxOutlined />
            </p>
            <p className="ant-upload-text">
              Click or drag file to this area to upload
            </p>
          </Dragger>
        )}
      />
      {errorMessage && <p className="text-red-600"> {errorMessage}</p>}
    </div>
  );
};

export default BFileInput;
