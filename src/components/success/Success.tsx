import React from "react";
import { useTranslation } from "react-i18next";

const Success = () => {
  const { t } = useTranslation();
  return (
    <div
      style={{
        width: "100%",
        height: "100px",
        fontSize: "1rem",
        border: "1px solid green",
        borderRadius: "5px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        margin: "70px 0px",
        color: "green",
      }}
    >
      {t("success")}
    </div>
  );
};

export default Success;
