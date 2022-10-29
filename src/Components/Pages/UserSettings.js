import React, { useState, useEffect } from "react";
import { Row, Col, List, Button, Form, Input, notification } from "antd";
import admin from "../../api/admin";
import { connect } from "react-redux";
import {
  getUser,
  getCompany,
  EditedCompany,
  EditedUser,
} from "../../redux/actions";
import {UnorderedListOutlined} from '@ant-design/icons';
import AOS from "aos";

const UserSettings = (props) => {
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const [data, setData] = useState([]);
  const [id, setId] = useState();

  let token =
    localStorage.getItem("access_token") ||
    sessionStorage.getItem("access_token");

  useEffect(() => {

    getData();
    // saveData();
    AOS.init({
      duration: 600,
    });
  }, []);

  const getData = async () => {
    setLoading(true);
      getAllUsers()
    getUser(token);
  };

  const { user, getCompany, EditedCompany, EditedUser } = props;

  const getAllUsers = async () => {
    await admin.get("/users").then((res) => {
      setData(res.data);
    });
  };

  const editData = (id) => {
    setId(id);
    form.setFieldsValue(user);
  };


  const saveData = async (values) => {
    const arr = data.filter((f) => f.email === values.email);
    if (arr.length > 0 && arr[0].id !== user.id) {
      notification["error"]({
        message: "Operation was unsuccessfull!",
        description: "Email is already registered",
      });

    } else {
      user.isCompany
        ? EditedCompany(
            id,
            values.companyname,
            values.username,
            values.email,
            values.password,
            user.companyId,
            user.role
          )
        : EditedUser(
            id,
            values.name,
            values.surname,
            values.username,
            values.phone,
            values.email,
            values.password,
            user.companyname,
            user.companyId,
            user.role
          );

      onCancel();
    }

  };

  const onCancel = () => {
    form.resetFields();
  };

  return (
    <div className='userSettings'>
      <Row gutter={[25, 25]}>
      <Col xs={24} data-aos="fade-down">
          <div className="page-header-style">
            <div className="wrapped-icon-title">
              <UnorderedListOutlined className="unordered-list-outlined" />
              <span>User Info</span>
            </div>
          </div>
        </Col>
        <Col
          xs={24}
          data-aos="fade-right"
          className={
            user.role.changeSettings ? "ant-col-lg-12" : "ant-col-lg-24"
          }
        >
          <List bordered>
            <List.Item>
              <div className='d-flex w-100 justify-content-between'>
                <div className='text-bold'>USERNAME</div>
                <div className='text-bold'>{user.username}</div>
              </div>
            </List.Item>
            {user.isCompany ? (
              <>
                <List.Item>
                  <div className='d-flex w-100 justify-content-between'>
                    <div className='text-bold'>COMPANY NAME</div>
                    <div className='text-bold'>{user.companyname}</div>
                  </div>
                </List.Item>
              </>
            ) : (
              <>
                <List.Item>
                  <div className='d-flex w-100 justify-content-between'>
                    <div className='text-bold'>NAME</div>
                    <div className='text-bold'>{user.name}</div>
                  </div>
                </List.Item>
                <List.Item>
                  <div className='d-flex w-100 justify-content-between'>
                    <div className='text-bold'>SURNAME</div>
                    <div className='text-bold'>{user.surname}</div>
                  </div>
                </List.Item>
                <List.Item>
                  <div className='d-flex w-100 justify-content-between'>
                    <div className='text-bold'>PHONE</div>
                    <div className='text-bold'>{user.phone}</div>
                  </div>
                </List.Item>
              </>
            )}
            
            <List.Item>
              <div className='d-flex w-100 justify-content-between'>
                <div className='text-bold'>EMAIL</div>
                <div className='text-bold'>{user.email}</div>
              </div>
            </List.Item>
            <List.Item>
              <div className='d-flex w-100 justify-content-between'>
                <div className='text-bold'>PASSWORD</div>
                <div className='text-bold'>{user.password}</div>
              </div>
            </List.Item>
            <List.Item>
              <div className='d-flex w-100 justify-content-between'>
                <div className='text-bold'>COMPANY ID</div>
                <div className='text-bold'>{user.companyId}</div>
              </div>
            </List.Item>
          </List>
          {user.role.changeSettings && (
            <Button
              className='mt-4 user-settings-btn'
              size='large'
              type='primary'
              block
              onClick={() => {
                editData(user.id);
              }}
            >
              Edit
            </Button>
          )}
        </Col>
        {user.role.changeSettings && (
          <Col xs={24} lg={12} data-aos="fade-down">
            <Form
              form={form}
              onFinish={saveData}
              name='basic'
              layout='vertical'
              labelCol={{
                span: 16,
              }}
              wrapperCol={{
                span: 24,
              }}
            >
              {user.isCompany ? (
                <>
                  <Form.Item
                    label='Company Name'
                    name='companyname'
                    validateTrigger='onChange'
                    rules={[
                      {
                        required: true,
                        message: "Please input your company name!",
                      },
                    ]}
                  >
                    <Input size='large' />
                  </Form.Item>
                </>
              ) : (
                <>
                  <Form.Item
                    label='Name'
                    name='name'
                    validateTrigger='onChange'
                    rules={[
                      { required: true, message: "Please input your name!" },
                    ]}
                  >
                    <Input size='large' />
                  </Form.Item>
                  <Form.Item
                    label='Surname'
                    name='surname'
                    validateTrigger='onChange'
                    rules={[
                      { required: true, message: "Please input your surname!" },
                    ]}
                  >
                    <Input size='large' />
                  </Form.Item>
                  <Form.Item
                    label='Phone'
                    name='phone'
                    validateTrigger='onChange'
                    rules={[
                      { required: true, message: "Please input your phone!" },
                    ]}
                  >
                    <Input size='large' />
                  </Form.Item>
                </>
              )}
              <Form.Item
                label='User Name'
                name='username'
                validateTrigger='onChange'
                rules={[
                  { required: true, message: "Please input your username!" },
                ]}
              >
                <Input size='large' />
              </Form.Item>
              <Form.Item
                label='Email'
                name='email'
                validateTrigger='onChange'
                rules={[
                  { required: true, message: "Please input your email!" },
                  {
                    type: "email",
                    message: "The input is not valid E-mail!",
                  },
                ]}
              >
                <Input size='large' />
              </Form.Item>

              <Form.Item
                label='Password'
                name='password'
                validateTrigger='onChange'
                rules={[
                  { required: true, message: "Please input your password!" },
                  { min: 6, message: "Password must be minimum 6 characters." },
                ]}
              >
                <Input.Password size='large' />
              </Form.Item>

              <Form.Item>
                <div className='d-flex justify-content-end'>
                  <Button
                    className='user-settings-btn'
                    type='primary'
                    htmlType='submit'
                  >
                    Save
                  </Button>
                  <Button onClick={onCancel} className='cancel-btn ms-2'>
                    Cancel
                  </Button>
                </div>
              </Form.Item>
            </Form>
          </Col>
        )}
      </Row>
    </div>
  );
};

const mapStateToProps = ({ user }) => {
  return {
    user: user.data,
  };
};

export default connect(mapStateToProps, {
  getUser,
  getCompany,
  EditedCompany,
  EditedUser,
})(UserSettings);