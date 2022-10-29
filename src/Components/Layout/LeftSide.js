import React from "react";
import { Link } from "react-router-dom";
import { Layout, Menu } from "antd";
import {
  UnorderedListOutlined,
  SettingOutlined,
  UsergroupAddOutlined,
} from "@ant-design/icons";
import { connect } from "react-redux";
import { getUser, getCompany, EditedData } from "../../redux/actions";
import { useEffect } from "react";

const { Sider } = Layout;

const LeftSide = (props) => {
  let token =
    localStorage.getItem("access_token") ||
    sessionStorage.getItem("access_token");

  const { user, getUser } = props;
  useEffect(() => {
    getUser(token);
  }, []);

  return (
    <Sider width={250} className='site-layout-background'>
      <Menu
        mode='inline'
        defaultSelectedKeys={["1"]}
        defaultOpenKeys={["sub1"]}
        style={{
          height: "100%",
          borderRight: 0,
        }}
      >
        <Menu.Item key='1'>
          <Link to={`/tasks`}>
            <UnorderedListOutlined />
            <span>Tasks</span>
          </Link>
        </Menu.Item>
        {user.isCompany && (
          <Menu.Item key='2'>
            <Link to={`/users`}>
              <UsergroupAddOutlined />
              <span>Users</span>
            </Link>
          </Menu.Item>
        )}
        <Menu.Item key='3'>
          <Link to={`/user-settings`}>
            <SettingOutlined />
            <span>User Settings</span>
          </Link>
        </Menu.Item>
      </Menu>
    </Sider>
  );
};

const mapStateToProps = ({ user }) => {
  return {
    user: user.data,
  };
};

export default connect(mapStateToProps, { getUser })(LeftSide);

// export default LeftSide;
