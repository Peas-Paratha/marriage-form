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
  theme,
} from "antd";
import { useEffect, useRef, Dispatch, SetStateAction, useState } from "react";
import useFormHandle from "../../hooks/formHandle";
import SignatureCanvas from "react-signature-canvas";
import { useNavigate } from "react-router-dom";

const { Title } = Typography;

interface IProps {
  prevFormPosition: () => void;
  onFinish: (values: any) => void;
  formData: any;
  formPosition: number;
  handleSignatureInput: (name: string, value: string) => void;
  setFormData: Dispatch<SetStateAction<{}>>;
}

const Signatures = ({
  onFinish,
  prevFormPosition,
  formData,
  formPosition,
  handleSignatureInput,
  setFormData,
}: IProps) => {
  const { form, t } = useFormHandle(formData);

  const [triedSubmit, setTriedSubmit] = useState(false);

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const groomSigCanvas = useRef();
  const brideSigCanvas = useRef();
  const firstWitnessSigCanvas = useRef();
  const secondWitnessSigCanvas = useRef();

  const formatIntoPng = (name: string) => {
    if (groomSigCanvas.current) {
      // @ts-ignore
      const dataURL = groomSigCanvas.current.getTrimmedCanvas().toDataURL();
      handleSignatureInput(name, dataURL);
    }
  };

  useEffect(() => {
    if (loading) {
      // @ts-ignore
      groomSigCanvas.current.off();
      // @ts-ignore
      brideSigCanvas.current.off();
      // @ts-ignore
      firstWitnessSigCanvas.current.off();
      // @ts-ignore
      secondWitnessSigCanvas.current.off();
    }
  }, [loading]);

  const handleSubmit = (values: any) => {
    if (
      !formData.groomSignature ||
      !formData.brideSignature ||
      !formData.firstWitnessSignature ||
      !formData.secondWitnessSignature
    ) {
      return;
    }
    setFormData({ ...formData, ...values });
    setLoading(true);
    setTimeout(() => navigate("success", { replace: true }), 8000);
  };

  return (
    /* "handleSubmit" will validate your inputs before invoking "onSubmit" */
    <Form
      onFinish={handleSubmit}
      requiredMark={false}
      initialValues={{ ...formData }}
      form={form}
    >
      <Title level={4} style={{ marginBottom: "20px", fontWeight: "normal" }}>
        {t("signature-title")}
      </Title>
      <Form.Item
        label={t("groom-signature")}
        validateStatus={formData.groomSignature ? "success" : "error"}
        help={
          !formData.groomSignature && triedSubmit
            ? t("groom-signature-required-msg")
            : ""
        }
      >
        <Form.Item noStyle>
          <SignatureCanvas
            penColor="black"
            canvasProps={{
              style: {
                border: "1px solid gray",
                width: "100%",
                borderRadius: "5px",
              },
            }}
            onEnd={() => formatIntoPng("groomSignature")}
            ref={groomSigCanvas as any}
          />
          {
            <Button
              size="small"
              style={{
                margin: "10px 0px 5px 0px",
                width: "100px",
              }}
              danger
              //@ts-ignore
              onClick={() => groomSigCanvas.current.clear()}
              disabled={loading}
            >
              Clear
            </Button>
          }
        </Form.Item>
      </Form.Item>

      <Form.Item
        label={t("bride-signature")}
        validateStatus={formData.brideSignature ? "success" : "error"}
        help={
          !formData.brideSignature && triedSubmit
            ? t("bride-signature-required-msg")
            : ""
        }
      >
        <Form.Item noStyle>
          <SignatureCanvas
            penColor="black"
            canvasProps={{
              style: {
                border: "1px solid gray",
                width: "100%",
                borderRadius: "5px",
              },
            }}
            onEnd={() => formatIntoPng("brideSignature")}
            ref={brideSigCanvas as any}
          />
          {
            <Button
              size="small"
              style={{
                margin: "10px 0px 5px 0px",
                width: "100px",
              }}
              danger
              //@ts-ignore
              onClick={() => brideSigCanvas.current.clear()}
              disabled={loading}
            >
              Clear
            </Button>
          }
        </Form.Item>
      </Form.Item>

      <Title
        level={5}
        style={{ margin: "40px 0px 20px 0px", fontWeight: "normal" }}
      >
        {t("first-witness-title")}
      </Title>

      <Form.Item
        label={t("name")}
        name="firstWitnessName"
        rules={[
          {
            required: true,
            message: t("name-required-msg") as string,
          },
        ]}
      >
        <Input disabled={loading} />
      </Form.Item>

      <Form.Item
        label={t("nrc-number")}
        name="firstWitnessNRCNumber"
        rules={[
          {
            required: true,
            message: t("nrc-required-msg") as string,
          },
        ]}
      >
        <Input disabled={loading} />
      </Form.Item>

      <Form.Item
        label={t("witness-signature")}
        validateStatus={formData.firstWitnessSignature ? "success" : "error"}
        help={
          !formData.firstWitnessSignature && triedSubmit
            ? t("signature-required-msg")
            : ""
        }
      >
        <Form.Item noStyle>
          <SignatureCanvas
            penColor="black"
            canvasProps={{
              style: {
                border: "1px solid gray",
                width: "100%",
                borderRadius: "5px",
              },
            }}
            onEnd={() => formatIntoPng("firstWitnessSignature")}
            ref={firstWitnessSigCanvas as any}
          />
          {
            <Button
              size="small"
              style={{
                margin: "10px 0px 5px 0px",
                width: "100px",
              }}
              danger
              //@ts-ignore
              onClick={() => firstWitnessSigCanvas.current.clear()}
              disabled={loading}
            >
              Clear
            </Button>
          }
        </Form.Item>
      </Form.Item>

      <Title
        level={5}
        style={{ margin: "40px 0px 20px 0px", fontWeight: "normal" }}
      >
        {t("second-witness-title")}
      </Title>

      <Form.Item
        label={t("name")}
        name="secondWitnessName"
        rules={[
          {
            required: true,
            message: t("name-required-msg") as string,
          },
        ]}
      >
        <Input disabled={loading} />
      </Form.Item>

      <Form.Item
        label={t("nrc-number")}
        name="secondWitnessNRCNumber"
        rules={[
          {
            required: true,
            message: t("nrc-required-msg") as string,
          },
        ]}
      >
        <Input disabled={loading} />
      </Form.Item>

      <Form.Item
        label={t("witness-signature")}
        validateStatus={formData.secondWitnessSignature ? "success" : "error"}
        help={
          !formData.secondWitnessSignature && triedSubmit
            ? t("signature-required-msg")
            : ""
        }
      >
        <Form.Item noStyle>
          <SignatureCanvas
            penColor="black"
            canvasProps={{
              style: {
                border: "1px solid gray",
                width: "100%",
                borderRadius: "5px",
              },
            }}
            onEnd={() => formatIntoPng("secondWitnessSignature")}
            ref={secondWitnessSigCanvas as any}
          />
          {
            <Button
              size="small"
              style={{
                margin: "10px 0px 5px 0px",
                width: "100px",
              }}
              danger
              //@ts-ignore
              onClick={() => secondWitnessSigCanvas.current.clear()}
              disabled={loading}
            >
              Clear
            </Button>
          }
        </Form.Item>
      </Form.Item>

      {loading ? (
        <Button
          type="primary"
          size="large"
          style={{
            backgroundColor: "black",
            color: "white",
            marginTop: "15px",
            lineHeight: "20px",
          }}
          loading
          block
        >
          {t("loading-text")}
        </Button>
      ) : (
        <Space split style={{ width: "100%", justifyContent: "space-between" }}>
          <Button
            onClick={prevFormPosition}
            type="primary"
            size="large"
            style={{
              backgroundColor: "black",
              color: "white",
              marginTop: "15px",
              width: "150px",
              lineHeight: "20px",
            }}
          >
            {t("previous")}
          </Button>

          <Button
            onClick={() => {
              form.submit();
              setTriedSubmit(true);
            }}
            type="primary"
            size="large"
            style={{
              backgroundColor: "black",
              color: "white",
              marginTop: "15px",
              width: "150px",
              lineHeight: "20px",
            }}
          >
            {t("submit")}
          </Button>
        </Space>
      )}
    </Form>
  );
};

export default Signatures;
