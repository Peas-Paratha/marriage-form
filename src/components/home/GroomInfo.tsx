import { useForm } from "react-hook-form";
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
  UploadProps,
  message,
  theme,
} from "antd";
import { useTranslation } from "react-i18next";
import useFormHandle from "../../hooks/formHandle";
import FormItem from "antd/es/form/FormItem";
import React, { useState } from "react";
import { PlusOutlined, UploadOutlined } from "@ant-design/icons";
import { Modal } from "antd";
import type { RcFile } from "antd/es/upload";
import type { UploadFile } from "antd/es/upload/interface";

const { Title } = Typography;

interface IProps {
  onFinish: (values: any) => void;
  formData: any;
  formPosition: number;
}

const GroomInfo = ({ onFinish, formData, formPosition }: IProps) => {
  const { form, t } = useFormHandle(formData);
  const [fileList, setFileList] = useState<UploadFile[]>(
    formData?.groomNRCPhotos || []
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
        {t("groom-info-title")}
      </Title>
      <Form.Item
        label={t("name")}
        name="groomName"
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
        name="groomBirthdate"
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
        name="GroomNRCNumber"
        rules={[
          {
            required: true,
            message: t("nrc-required-msg") as string,
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
        label={t("nrc-photos")}
        valuePropName="fileList"
        getValueFromEvent={(event) => {
          return event?.fileList;
        }}
        name="groomNRCPhotos"
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
          fileList={formData?.groomNRCPhotos || undefined}
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
        name="groomRaceReligion"
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
        name="groomOccupation"
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
        name="groomAddress"
        rules={[
          {
            required: true,
            message: t("address-required-msg") as string,
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Button
        type="primary"
        size="large"
        onClick={form.submit}
        style={{
          backgroundColor: "black",
          color: "white",
          width: "100%",
          marginTop: "15px",
        }}
      >
        {t("next")}
      </Button>
    </Form>
  );
};

export default GroomInfo;
