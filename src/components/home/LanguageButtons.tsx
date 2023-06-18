import { Space, Typography } from "antd";
import React from "react";
import { useTranslation } from "react-i18next";

const selectLanguageStyle = {
  //fontWeight: "bold",
  textShadow: "0 0 0.1px black",
  padding: "0px 0px 3px 0px",
  borderBottom: "1px solid black",
};

const LanguageButtons = () => {
  const { t, i18n } = useTranslation();
  const changeLanguage = (arg: string) => {
    i18n.changeLanguage(arg);
  };

  return (
    <Space style={{}} direction="horizontal">
      <div style={{}}>
        <Typography.Text
          onClick={() => changeLanguage("mm")}
          style={i18n.resolvedLanguage === "mm" ? selectLanguageStyle : {}}
        >
          မြန်မာ
        </Typography.Text>
      </div>

      <div>|</div>
      <div style={{}}>
        <Typography.Text
          onClick={() => changeLanguage("en")}
          style={i18n.resolvedLanguage === "en" ? selectLanguageStyle : {}}
        >
          Eng
        </Typography.Text>
      </div>
    </Space>
  );
};

export default LanguageButtons;
