import { Layout} from "antd";
import React from "react";
import AdminHeader from "../Layout/Header";
import LeftSide from "./LeftSide";

const { Content } = Layout;

const MyLayout = (props) => {
  return (
    <Layout>
      <AdminHeader />
      <Layout>
        <LeftSide />
        <Layout
          style={{
            padding: "0 24px 24px",
          }}
        >
          <Content
            className='site-layout-background'
            style={{
              padding: 24,
              margin: 0,
              minHeight: 280,
            }}
          >
            {props.children}
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};


export default MyLayout;