import { Button, Checkbox, Form, Input, Col, Row } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import React, { useEffect } from "react";
import { connect } from "react-redux";
import { LoginUser, LogOutUser, getCompany } from "../../redux/actions";
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useState } from 'react';
import Register from './Register';

const Login = (props) => {

  const [id, setId] = useState()
  const [form] = Form.useForm();
  const { LoginUser, loggedIn, getCompany, user } = props;

  useEffect(() => {
    // form.setFieldsValue({
    //   email: "company1@gmail.com",
    //   password: "12345",
    // });
  }, []);

  // const randomId = Math.floor(Math.random() * 55562147963)

  const onFinish = (values) => {
    LoginUser(values.email, values.password, values.remember);
  };

  let navigate = useNavigate()
    let location = useLocation()
    // console.log(location)

  const RegisterFunc = () => {
    if(loggedIn === false){
      navigate('/register')
    }
  }

  //   "email": "eve.holt@reqres.in",
  //     "password": "cityslicka"

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Row
        justify='center'
        align='middle'
        id='components-form-normal-login'
        style={{ height: "100vh" }}
      >
        
        <Col span={12}>
        <h1 className='text-center'>Login</h1>
          <Form
            form={form}
            name='normal_login'
            className='login-form'
            initialValues={{
              remember: true,
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete='off'
          >
            <Form.Item
              name='email'
              rules={[
                {
                  required: true,
                  message: "Please input your username!",
                },
              ]}
            >
              <Input
                prefix={<UserOutlined className='site-form-item-icon' />}
                placeholder='Username'
                defaultValue={"company1@gmail.com"}
              />
            </Form.Item>

            <Form.Item
              name='password'
              rules={[
                {
                  required: true,
                  message: "Please input your password!",
                },
              ]}
            >
              <Input.Password
                prefix={<LockOutlined className='site-form-item-icon' />}
                type='password'
                placeholder='Password'
                defaultValue={"12345"}
              />
            </Form.Item>

            <Form.Item name='remember' valuePropName='checked'>
              <Checkbox>Remember me</Checkbox>
            </Form.Item>

            <Form.Item>
              <Button
                type='primary'
                htmlType='submit'
                className='login-form-button'
              >
                Log in
              </Button>
            </Form.Item>
            <Form.Item>
              
              <Link to={`/register`}>
                <Button
                    type='primary'
                    htmlType='button'
                    className='login-form-button'
                    onClick={() => RegisterFunc()}
                >
                    Register
                </Button>
              </Link>
            </Form.Item>
          </Form>
        </Col>
      </Row>
  );
};

const mapStateToProps = ({user , loading}) => {
    return {
      user: user.data,
      loggedIn : user.isLoggedIn,
      registered: user.registered,
      loading
    }
  }

export default connect(mapStateToProps, { LoginUser, LogOutUser, getCompany })(Login);
