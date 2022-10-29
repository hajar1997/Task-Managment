import { Button, Form, Input, DatePicker, Select } from "antd";
import moment from "moment";
import admin from "../../api/admin";
import { connect } from "react-redux";
import { getTasks } from "../../redux/actions";
import { useEffect, useState } from "react";

const { Option } = Select;

const TaskForm = (props) => {
  const children = [];
  const [form] = Form.useForm();
  const [users, setUsers] = useState([]);

  const { user, onCancel, tasks, getTasks, id, setId, task } = props;

  
  useEffect(() => {
    getAllUsers();
  }, []);

  useEffect(() => {
    if(id){
      form.setFieldsValue(
        {
          ...task,
          date: moment(task.date)
        }
      )
     }
  }, [task]);


  const getAllUsers = async () => {
    await admin.get("/users").then((res) => {
      setUsers(res.data);
    });
  };

  users.forEach((u) => {
    children.push(<Option key={u.id}>{u.username}</Option>);
  });


  const onFinish = async (values) => {
    if(id) {
      await admin
      .put(`/tasks/${id}`, {
        ...task,
        ...values,
        prefix: task.prefix,
        status: task.status
      })
      .then((res) => {
        getTasks()
        setId(null)
        onCancel();
        form.resetFields()
      });
    } else {
      let id = parseInt(Number(Math.random() * Date.now()));
      await admin
        .post(`/tasks`, {
          id,
          ...values,
          assignedUsers: values.assignedUsers,
          // date: moment(values.date),
          prefix: 'todo',
          status: 'todo'
        })
        .then((res) => {
          getTasks()
        });
      onCancel();
      form.resetFields();
    }
    
  };

  const handleChange = (value) => {
    console.log(`selected ${value}`);
  };

  const disabledDate = (current) => {
    return current && current < moment().endOf("day");
  };

  return (
    <div>
      <Form
        form={form}
        layout='vertical'
        name='form_in_modal'
        initialValues={{
          modifier: "public",
        }}
        onFinish={onFinish}
      >
        <Form.Item
          name='title'
          label='Title'
          rules={[
            {
              required: true,
              message: "The field is required!",
            },
          ]}
        >
          <Input size='large' />
        </Form.Item>
        <Form.Item
          name='description'
          label='Description'
          rules={[
            {
              required: true,
              message: "The field is required!",
            },
          ]}
        >
          <Input.TextArea rows={6} />
        </Form.Item>
        <Form.Item
          name='assignedUsers'
          label='Assigned users'
          rules={[
            {
              required: true,
              message: "The field is required!",
            },
          ]}
        >
          <Select
            mode='multiple'
            allowClear
            style={{
              width: "100%",
            }}
            placeholder='Select users'
            onChange={handleChange}
            size='large'
          >
            {children}
          </Select>
        </Form.Item>
        <Form.Item
          name='date'
          label='DeadLine'
          rules={[
            {
              required: true,
              message: "The field is required!",
            },
          ]}
        >
          <DatePicker size='large' disabledDate={disabledDate} />
        </Form.Item>

        <Form.Item className='d-flex justify-content-end mb-0'>
          <Button
            type='primary'
            htmlType='submit'
            className='login-form-button me-2'
          >
            Save
          </Button>

          <Button
            type='primary'
            htmlType='button'
            className='login-form-button'
            onClick={onCancel}
          >
            Cancel
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

const mapStateToProps = ({ user, tasks }) => {
  return {
    user: user.data,
    tasks: tasks.data,
  };
};

export default connect(mapStateToProps, { getTasks })(TaskForm);