import React, { useEffect, useState } from "react";
import {
  Row,
  Col,
  PageHeader,
  Table,
  Form,
  notification,
  Switch,
  message,
  Button,
  Input,
  Space,
  Popconfirm,
  Tooltip,
  InputNumber,
} from "antd";
import {
  SmileOutlined,
  WarningOutlined,
  EditFilled,
  DeleteFilled,
  LikeOutlined,
  UnorderedListOutlined,
} from "@ant-design/icons";
import admin from "../../api/admin";
import { connect } from "react-redux";
import { getUser } from "../../redux/actions";
import AOS from "aos";

const Users = (props) => {
  const [users, setUsers] = useState([])
  const [data, setData] = useState([]);
  const [id, setId] = useState();
  const [status, setStatus] = useState(false);
  const [form] = Form.useForm();

  const { user } = props;

  useEffect(() => {
    getData();
    AOS.init({
      duration: 600,
    });
  }, []);

  const getData = async () => {
    await admin
      .get("/users")
      .then((res) => {
        setUsers(res.data)
        let mydata = [];
        res.data.map((item, i) => {
          if (item.companyId == user.companyId) {
            mydata.push(item);
            setData(mydata);
          }
        });
      })
      // .then((res) => {
      //     setData(res.data);

      //   })
      .finally(() => { });
  };
  console.log(id);
  const onFinish = async (values) => {

    if (id) {
      let editedData = data.find((s) => s.id === id);
      const arr = users.filter((user) => user.email === values.email);
      if (arr.length > 0 && arr[0].email !== editedData.email) {
        notification["error"]({
          message: "Operation was unsuccessfull!",
          description: "Email is already registered",
        });
      }
      else {
        await admin
          .put(`/users/${id}`, {
            companyId: user.companyId,
            companyname: user.companyname,
            name: values.name,
            surname: values.surname,
            username: values.username,
            email: values.email,
            phone: values.phone,
            password: values.password,
            isCompany: false,
            role: {
              admin: false,
              editTask: values.editTask,
              deleteTask: values.deleteTask,
              addTask: values.addTask,
              changeStatus: values.changeStatus,
              changeSettings: values.changeSettings,
            },
          })
          .then((res) => {
            notification.open({
              message: "Successfully edited",
              description: `User name: ${res.data.username}`,
              icon: <LikeOutlined style={{ color: "#108ee9" }} />,
            });
            setId(null);
            getData();
            onCancel();
          })
          .finally(() => {
            //   setLoading(false);
          });
      }


    }
    else {
      const arr = users.filter((user) => user.email === values.email);
      if (arr.length > 0 ) {
        notification["error"]({
          message: "Operation was unsuccessfull!",
          description: "Email is already registered",
        });
      }
      else {
        await admin
          .post("/users", {
            companyId: user.companyId,
            companyname: user.companyname,
            name: values.name,
            surname: values.surname,
            username: values.username,
            email: values.email,
            phone: values.phone,
            password: values.password,
            isCompany: false,
            role: {
              admin: false,
              editTask: values.editTask,
              deleteTask: values.deleteTask,
              addTask: values.addTask,
              changeStatus: values.changeStatus,
              changeSettings: values.changeSettings,
            },
          })
          .then((res) => {
            notification.open({
              message: "Successfully added",
              description: `User name: ${res.data.username}`,
              icon: <SmileOutlined style={{ color: "#108ee9" }} />,
            });
            getData();
            onCancel();
          })
          .finally(() => { });
      }
     
    }
  };

  const onCancel = () => {
    form.resetFields();
  };

  //   Table

  const columns = [
    {
      title: "#",
      dataIndex: "id",
      key: "number",
      sorter: (a, b) => a.id - b.id,
      render: (id, record, index) => {
        ++index;
        return index;
      },
    },
    {
      sorter: (a, b) => a.id - b.id,
      title: "Ad",
      dataIndex: "username",
      key: "username",
    },
    {
      sorter: (a, b) => a.id - b.id,
      title: "Soyad",
      dataIndex: "surname",
      key: "surname",
    },
    {
      title: "Actions",
      dataIndex: "id",
      key: "id",
      render(id) {
        return (
          <div className='d-flex'>
            <Tooltip title='Edit'>
              <Button
                onClick={() => {
                  editData(id);
                }}
                type='primary'
                className='me-2'
                shape='circle'
                icon={<EditFilled />}
              />
            </Tooltip>

            <Popconfirm
              placement='bottomLeft'
              title={"Are you sure for delete?"}
              onConfirm={() => {
                deleteData(id);
              }}
              okText='Yes'
              cancelText='No'
            >
              <Tooltip title='Delete'>
                <Button
                  type='text'
                  className='bg-danger text-white'
                  shape='circle'
                  icon={<DeleteFilled />}
                />
              </Tooltip>
            </Popconfirm>
          </div>
        );
      },
    },
  ];
  const deleteData = async (id) => {
    // setLoading(true)
    await admin
      .delete(`/users/${id}`)
      .then((res) => {
        notification.open({
          message: "Successfully deleted",
          icon: <SmileOutlined style={{ color: "#108ee9" }} />,
        });
        getData();
      })
      .catch(() => {
        notification.open({
          message: "Some error ocurred",
          icon: <WarningOutlined style={{ color: "#108ee9" }} />,
        });
      })
      .finally(() => {
        // setLoading(false)
      });
  };

  const editData = (id) => {
    let editedData = data.find((s) => s.id === id);
    setId(id);

    form.setFieldsValue({
      name: editedData.username,
      surname: editedData.surname,
      username: editedData.username,
      email: editedData.email,
      phone: editedData.phone,
      password: editedData.password,
      editTask: editedData.role.editTask,
      deleteTask: editedData.role.deleteTask,
      addTask: editedData.role.addTask,
      changeStatus: editedData.role.changeStatus,
      changeSettings: editedData.role.changeSettings,
    });


  };
  return (
    <div>
      <Row gutter={[15, 15]}>
      <Col xs={24} data-aos="fade-down">
          <div className="page-header-style">
            <div className="wrapped-icon-title">
              <UnorderedListOutlined className="unordered-list-outlined" />
              <span>Users</span>
            </div>
          </div>
        </Col>
        <Col xs={12} data-aos="fade-right">
          <Table
            columns={columns}
            dataSource={data.filter((d) => d.isCompany === false)}
          />
        </Col>
        <Col xs={12} data-aos="fade-down">
          <Form
            // initialValues={{ size: "large" }}
            form={form}
            layout='vertical'
            onFinish={onFinish}
            // onFinishFailed={onFinishFailed}
            autoComplete='off'
          >
            <Form.Item
              label='Name'
              name='name'
              rules={[
                { required: true, message: "Fill name field" },
                {
                  type: "string",
                  min: 3,
                  message: "Name must be a minimum of 3 chars",
                },
              ]}
            >
              <Input size='large' />
            </Form.Item>
            <Form.Item
              label='Surname'
              name='surname'
              rules={[
                { required: true, message: "Fill surname field" },
                {
                  type: "string",
                  min: 5,
                  message: "Name must be a minimum of 5 chars",
                },
              ]}
            >
              <Input size='large' />
            </Form.Item>
            <Form.Item
              label='Username'
              name='username'
              rules={[
                { required: true, message: "Fill username field" },
                {
                  type: "string",
                  min: 5,
                  message: "Name must be a minimum of 5 chars",
                },
              ]}
            >
              <Input size='large' />
            </Form.Item>
            <Form.Item
              label='Phone'
              name='phone'
              rules={[{ required: true, message: "Enter phone number" }]}
            >
              <InputNumber size='large' />
            </Form.Item>
            <Form.Item
              label='Email'
              name='email'
              rules={[
                { required: true, message: "Enter email" },
                {
                  type: "email",
                  message: "Enter a valid email address",
                },
              ]}
            >
              <Input size='large' />
            </Form.Item>
            <Form.Item
              label='Password'
              name='password'
              rules={[
                { required: true, message: "Please enter your password!" },
              ]}
            >
              <Input.Password size='large' />
            </Form.Item>
            <Row className='users_permission mt-3'>
              <Col xs={12}>
                <Form.Item
                  label='Edit task'
                  valuePropName='checked'
                  name='editTask'
                  initialValue={false}
                >
                  <Switch />
                </Form.Item>
              </Col>
              <Col xs={12}>
                <Form.Item
                  label='Add Task'
                  valuePropName='checked'
                  name='addTask'
                  initialValue={false}
                >
                  <Switch />
                </Form.Item>
              </Col>
              <Col xs={12}>
                <Form.Item
                  label='Delete Task'
                  valuePropName='checked'
                  name='deleteTask'
                  initialValue={false}
                >
                  <Switch />
                </Form.Item>
              </Col>
              <Col xs={12}>
                <Form.Item
                  label='Change Settings'
                  valuePropName='checked'
                  name='changeSettings'
                  initialValue={false}
                >
                  <Switch />
                </Form.Item>
              </Col>
              <Col xs={12}>
                <Form.Item
                  label='Change Status'
                  valuePropName='checked'
                  name='changeStatus'
                  initialValue={false}
                >
                  <Switch />
                </Form.Item>
              </Col>
            </Row>

            <Form.Item>
              <Space>
                <Button
                  //   disabled={fileList.length <= 0}
                  type='success'
                  htmlType='submit'
                >
                  Save
                </Button>
                <Button onClick={onCancel}>Cancel</Button>
              </Space>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </div>
  );
};

const mapStateToProps = ({ user }) => {
  return {
    user: user.data,
  };
};

export default connect(mapStateToProps, { getUser })(Users);