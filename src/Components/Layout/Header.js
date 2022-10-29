import { connect } from "react-redux";
import { Layout, Menu, Popconfirm, Popover, Avatar, Button } from "antd";
import {
  UserOutlined,
  SettingOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import React from "react";
import { LogOutUser } from "../../redux/actions";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

const { Header } = Layout;

function AdminHeader(props) {
  
  const [open, setOpen] = useState(false);
  const { user, LogOutUser } = props;

  const navigate = useNavigate();

  const hide = () => {
    setOpen(false);
  };

  const handleOpenChange = (newOpen) => {
    setOpen(newOpen);
  };

  const text = <span>{user?.username}</span>;
  const content = (
    <div className='profil-info'>
      <div>
        <p className='mb-0'>
          <b>{user?.companyname + ' - ' +user?.username}</b>
        </p>
        <p className='mb-0'>
          Email: <em>{user?.email}</em>
        </p>
        <p>
          Role: <em>{user?.role.admin ? "Admin" : "User"}</em>
        </p>
      </div>
      <hr />
      <div className='d-flex justify-content-between'>
        <Link to={"/user-settings"}>
          <Button onClick={hide} className='d-flex align-items-center'>
            <SettingOutlined className='me-2' />
            Settings
          </Button>
        </Link>
        <Button
          onClick={() => {
            LogOut();
          }}
          className='d-flex align-items-center'
        >
          <LogoutOutlined className='me-2' />
          LogOut
        </Button>
      </div>
    </div>
  );

  const LogOut = () => {
    LogOutUser();
    navigate("/");
  };

  return (
    <Header className='header'>
      <div className='logo' />
      <Menu
        theme='dark'
        direction='rtl'
        mode='horizontal'
        defaultSelectedKeys={["1"]}
      >
        <Menu.Item key={1}>
          <Popover
          overlayStyle={{width: 300}}
            placement='bottomLeft'
            content={content}
            trigger='click'
            open={open}
            onOpenChange={handleOpenChange}
            
          >
            <span className='me-3 d-inline-block'>{text}</span>
              <Avatar
                style={{
                  backgroundColor: "#87d068",
                }}
                icon={<UserOutlined />}
              />
          </Popover>
        </Menu.Item>
      </Menu>
    </Header>
  );
}

const mapStateToProps = ({ user }) => {
  return {
    user: user.data,
  };
};

export default connect(mapStateToProps, { LogOutUser })(AdminHeader);