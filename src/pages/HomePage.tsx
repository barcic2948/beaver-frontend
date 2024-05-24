import React, { useState } from "react";
import {
  LaptopOutlined,
  NotificationOutlined,
  UserOutlined,
  AimOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import store from "../redux/Store";
import { Breadcrumb, Flex, Layout, Menu, theme } from "antd";

const { Header, Content, Sider } = Layout;

const items1: MenuProps["items"] = ["1", "2", "3"].map((key) => ({
  key,
  label: `nav ${key}`,
}));

const items2: MenuProps["items"] = [
  UserOutlined,
  LaptopOutlined,
  NotificationOutlined,
].map((icon, index) => {
  const key = String(index + 1);

  return {
    key: `sub${key}`,
    icon: React.createElement(icon),
    label: `subnav ${key}`,

    children: new Array(4).fill(null).map((_, j) => {
      const subKey = index * 4 + j + 1;
      return {
        key: subKey,
        label: `option${subKey}`,
      };
    }),
  };
});

const HomePage: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const user = store.getState().user;

  return (
    <Layout>
      <Header
        style={{ display: "flex", alignItems: "center", background: "white" }}
      >
        <Flex style={{ width: "50%" }}>
          <AimOutlined style={{ fontSize: "40px" }} />
          <h1 style={{ margin: "10px" }}> Parrot App </h1>
        </Flex>
        <Flex style={{ width: "40%" }} justify="flex-end">
          <UserOutlined style={{ fontSize: "30px" }} />
          <h2 style={{ margin: "10px" }}>
            {user.firstName} {user.lastName}
          </h2>
        </Flex>
      </Header>
    </Layout>
  );
};

export default HomePage;
