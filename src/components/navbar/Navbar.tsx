import { Space, Typography } from "antd";
import Title from "antd/es/skeleton/Title";
import React from "react";
import LanguageButtons from "../home/LanguageButtons";

const Navbar = () => {
  return (
    <Space
      style={{
        marginBottom: "15px",
        justifyContent: "space-between",
        display: "flex",
      }}
      align="center"
      direction="horizontal"
    >
      <Typography.Title
        level={2}
        style={{ fontWeight: "bold", marginBottom: "0px" }}
      >
        Marriage Form
      </Typography.Title>
      <LanguageButtons />
    </Space>
  );
};

export default Navbar;
