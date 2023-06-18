import Home from "./components/home/Home";
import {
  Button,
  ConfigProvider,
  Divider,
  Layout,
  Space,
  Typography,
} from "antd";
import my_MM from "antd/locale/my_MM";
import en_US from "antd/locale/en_US";
import LanguageButtons from "./components/home/LanguageButtons";
import { useTranslation } from "react-i18next";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomeLayout from "./layouts/HomeLayout";
import Success from "./components/success/Success";

function App() {
  const { i18n } = useTranslation();
  return (
    <ConfigProvider locale={i18n.resolvedLanguage === "en" ? en_US : my_MM}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomeLayout />}>
            <Route index element={<Home />} />
            <Route path="success" element={<Success />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ConfigProvider>
  );
}

export default App;
