import { useTranslation } from "react-i18next";
import { Inputs } from "../../interfaces/form";
import {
  Button,
  Calendar,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Space,
  Typography,
  Upload,
  UploadFile,
  UploadProps,
  message,
  theme,
} from "antd";
import useFormHandle from "../../hooks/formHandle";
import { UploadOutlined } from "@ant-design/icons";
import { useState } from "react";

const { Title } = Typography;

interface IProps {
  prevFormPosition: () => void;
  onFinish: (values: any) => void;
  formData: any;
  formPosition: number;
}

const BrideInfo = ({
  onFinish,
  prevFormPosition,
  formData,
  formPosition,
}: IProps) => {
  const { form, t } = useFormHandle(formData);
  const [fileList, setFileList] = useState<UploadFile[]>(
    formData?.brideNRCPhotos || []
  );

  const handleChange: UploadProps["onChange"] = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };
  return (
    /* "handleSubmit" will validate your inputs before invoking "onSubmit" */
    <Form
      onFinish={onFinish}
      requiredMark={false}
      initialValues={{ ...formData }}
      form={form}
    >
      <Title level={4} style={{ marginBottom: "20px", fontWeight: "normal" }}>
        {t("bride-info-title")}
      </Title>
      <Form.Item
        label={t("name")}
        name="brideName"
        rules={[
          {
            required: true,
            message: t("name-required-msg") as string,
          },
          {
            pattern: /^[a-zA-Z0-9]+$/,
            message: "Name can only include letters and numbers.",
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label={t("birthdate")}
        name="brideBirthdate"
        rules={[
          {
            required: true,
            message: t("birthdate-required-msg") as string,
          },
        ]}
      >
        <DatePicker />
      </Form.Item>
      <Form.Item
        label={t("nrc-number")}
        name="BrideNRCNumber"
        rules={[
          {
            required: true,
            message: t("nrc-required-msg") as string,
          },
          {
            pattern: /^[a-zA-Z0-9]+$/,
            message: "NRCNumber can only include letters and numbers.",
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label={t("nrc-photos")}
        valuePropName="fileList"
        getValueFromEvent={(event) => {
          return event?.fileList;
        }}
        name="brideNRCPhotos"
        validateFirst
        rules={[
          {
            required: true,
            message: t("nrc-both-required-msg") as string,
          },
          {
            validator(_, fileList) {
              return new Promise((resolve, reject) => {
                if (fileList.length < 2) {
                  reject(t("nrc-both-required-msg"));
                } else {
                  resolve("Success");
                }
              });
            },
          },
        ]}
      >
        <Upload
          listType="picture"
          fileList={formData?.brideNRCPhotos || undefined}
          onChange={handleChange}
          maxCount={2}
          beforeUpload={(file: any) => {
            if (file.size > 500000) {
              message.error(t("nrc-size-limit-msg"));
              return Upload.LIST_IGNORE;
            }

            return false;
          }}
        >
          {fileList?.length >= 2 ? null : (
            <Button icon={<UploadOutlined />}>{t("upload")}</Button>
          )}
        </Upload>
      </Form.Item>
      <Form.Item
        label={t("race-religion")}
        name="brideRaceReligion"
        rules={[
          {
            required: true,
            message: t("race-required-msg") as string,
          },
          {
            pattern: /^[a-zA-Z0-9]+$/,
            message: "Race & Religion can only include letters and numbers.",
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label={t("occupation")}
        name="brideOccupation"
        rules={[
          {
            required: true,
            message: t("occupation-required-msg") as string,
          },
          {
            pattern: /^[a-zA-Z0-9]+$/,
            message: "Occupation can only include letters and numbers.",
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label={t("address")}
        name="brideAddress"
        rules={[
          {
            required: true,
            message: t("address-required-msg") as string,
          },
          {
            pattern: /^[a-zA-Z0-9]+$/,
            message: "Address can only include letters and numbers.",
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Space split style={{ width: "100%", justifyContent: "space-between" }}>
        <Button
          onClick={prevFormPosition}
          type="primary"
          size="large"
          style={{
            backgroundColor: "black",
            color: "white",
            marginTop: "15px",
            width: "160px",
          }}
        >
          {t("previous")}
        </Button>

        <Button
          onClick={form.submit}
          type="primary"
          size="large"
          style={{
            backgroundColor: "black",
            color: "white",
            marginTop: "15px",
            width: "160px",
          }}
        >
          {t("next")}
        </Button>
      </Space>
    </Form>
  );
};

export default BrideInfo;
