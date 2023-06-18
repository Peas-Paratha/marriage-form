import { Button, Form } from "antd";
import { Inputs } from "../../interfaces/form";
import GroomInfo from "./GroomInfo";
import { useForm, SubmitHandler } from "react-hook-form";
import { useState } from "react";
import BrideInfo from "./BrideInfo";
import Signatures from "./Signatures";
import { useTranslation } from "react-i18next";

export default function Home() {
  const [formData, setFormData] = useState({});

  const [formPosition, setFormPosition] = useState(0);

  const { t } = useTranslation();

  const onFinish = (values: any) => {
    setFormData({ ...formData, ...values });
    setFormPosition((formPosition) => formPosition + 1);
    window.scrollTo({ top: 0 });
  };

  const prevFormPositon = async () => {
    setFormPosition((formPosition) => formPosition - 1);
  };

  const handleSignatureInput = (name: string, value: string) => {
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div>
      {formPosition === 0 ? (
        <GroomInfo
          onFinish={onFinish}
          formData={formData}
          formPosition={formPosition}
        />
      ) : formPosition === 1 ? (
        <BrideInfo
          prevFormPosition={prevFormPositon}
          onFinish={onFinish}
          formData={formData}
          formPosition={formPosition}
        />
      ) : (
        formPosition === 2 && (
          <Signatures
            prevFormPosition={prevFormPositon}
            onFinish={onFinish}
            formData={formData}
            formPosition={formPosition}
            handleSignatureInput={handleSignatureInput}
            setFormData={setFormData}
          />
        )
      )}
    </div>
  );
}
