import { Form, UploadFile, UploadProps } from "antd";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

const useFormHandle = (formData: any) => {
  const [form] = Form.useForm();
  const { t, i18n } = useTranslation();

  useEffect(() => {
    const errorFields = form.getFieldsError().reduce((arr, field) => {
      if (field.errors.length > 0) {
        arr.push(field.name);
      }
      return arr;
    }, [] as any);

    form.validateFields(errorFields);
  }, [i18n.resolvedLanguage, form]);

  return { form, t };
};

export default useFormHandle;
