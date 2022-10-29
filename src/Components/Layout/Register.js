import { Button, Form, Input, Row, Col, message } from "antd";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import { RegisterUser, getData } from "../../redux/actions";
import { useEffect } from 'react';


const Register = (props) => {

  const [form] = Form.useForm();

  const {user, RegisterUser, registered, getData} = props
  const navigate = useNavigate()

  useEffect(() => {
    getData()
  }, [getData])

  const randomId = Math.floor(Math.random() * 55562147963)

  const onFinish = (values) => {
    const arr = user.find((f) => f.email === values.email)
    if(arr){
      message.error('Mail is already registered');
      navigate('/register')
    }
    else{
      RegisterUser(values.companyname, values.username, values.email, values.password, {companyId: randomId, id: randomId});
      navigate('/')
    }
    
  };

  return (
    <Row
      justify='center'
      align='middle'
      id='components-form-normal-login'
      style={{ height: "100vh" }}
    >
      <Col span={12}>
        <h1 className='text-center'>Register</h1>
        <Form
          layout='vertical'
          form={form}
          name='register'
          onFinish={onFinish}
          initialValues={{
            prefix: "86",
          }}
          scrollToFirstError
        >
          <Form.Item
            name='companyname'
            label='Company Name'
            rules={[
              {
                required: true,
                message: "Please input your E-mail!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name='username'
            label='Username'
            rules={[
              {
                required: true,
                message: "Please input your username!",
                whitespace: true,
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name='email'
            label='E-mail'
            rules={[
              {
                type: "email",
                message: "The input is not valid E-mail!",
              },
              {
                required: true,
                message: "Please input your E-mail!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name='password'
            label='Password'
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
            ]}
            hasFeedback
          >
            <Input.Password />
          </Form.Item>

          <Form.Item>
            <Button type='primary' htmlType='submit' className='w-100'>
              Register
            </Button>
          </Form.Item>
          <Form.Item>
            <Link to={`/`}>
              <Button type='primary' htmlType='button' className='w-100'>
                Login
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

export default connect(mapStateToProps, { RegisterUser, getData })(Register);