import { Draggable } from "react-beautiful-dnd";
import React, { useState } from "react";
import styled, { css } from "styled-components";
import {
  AntDesignOutlined,
  UserOutlined,
  EditFilled,
  DeleteFilled,
} from "@ant-design/icons";
import { Avatar, Tooltip, Button, Popconfirm, Modal } from "antd";
import TaskForm from "./TaskForm";
import admin from "../../api/admin";
import { connect } from "react-redux";
import { getTasks } from "../../redux/actions";
import moment from "moment";

const CardHeader = styled.div`
  font-weight: 500;
`;

const Author = styled.div`
  display: flex;
  align-items: center;
`;
const CardFooter = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const DragItem = styled.div`
  padding: 10px;
  border-radius: 6px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  background: white;
  margin: 0 0 8px 0;
  display: grid;
  grid-gap: 20px;
  flex-direction: column;
`;

const ListItem = ({ item, index, users, tasks, getTasks, user }) => {
  const [open, setOpen] = useState(false);
  const [id, setId] = useState();
  const [task, setTask] = useState();

  const handleCancel = () => {
    setOpen(false);
  };

  const deleteTask = async (id) => {
    await admin.delete(`/tasks/${id}`).then((res) => {
      getTasks();
    });
  };

  const editTask = (item) => {
    setTask(item);
    setOpen(true);
    setId(item.id);
  };
  console.log(user);

  return (
    <Draggable draggableId={user.role.changeStatus && item.ids} index={index}>
      {(provided, snapshot) => {
        return (
          <DragItem
            ref={provided.innerRef}
            snapshot={snapshot}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
          >
            <CardHeader>
              <div>
                <b>Title</b>
              </div>
              {item.title}
            </CardHeader>
            <div>
              <span className='d-block'>
                <b>Description</b>
              </span>
              {item.description}
            </div>
            <div>
              <span className='me-3'>
                <b>DeadLine</b>
              </span>
              {moment(item.date).format("DD.MM.YYYY")}
            </div>
            <div className='d-flex justify-content-between align-items-center'>
              <div>
                <span className='me-3'>
                  <b>Task id</b>
                </span>
                {item.id}
              </div>
              <div className='d-flex align-items-center'>
                {user.role.editTask && (
                  <Tooltip className='ml-5' title='Edit' placement='topRight'>
                    <Button
                      onClick={() => editTask(item)}
                      className='btn d-flex justify-content-center align-items-center'
                      type='text'
                      shape='circle'
                    >
                      <EditFilled />
                    </Button>
                  </Tooltip>
                )}
                {user.role.deleteTask && (
                  <Popconfirm
                    placement='topLeft'
                    title='Are you sure to delete this task?'
                    onConfirm={() => deleteTask(item.id)}
                    okText='Yes'
                    cancelText='No'
                  >
                    <Tooltip
                      className='ml-5'
                      title='Delete'
                      placement='topRight'
                    >
                      <Button
                        className='btn d-flex justify-content-center align-items-center'
                        type='text'
                        shape='circle'
                      >
                        <DeleteFilled />
                      </Button>
                    </Tooltip>
                  </Popconfirm>
                )}
              </div>
            </div>
            <CardFooter>
              <span>
                <b>Assigned users</b>
              </span>

              <Avatar.Group
                maxCount={2}
                maxStyle={{
                  color: "#f56a00",
                  backgroundColor: "#fde3cf",
                }}
              >
                {users.map((u, i) => {
                  if (item.assignedUsers.includes(u.id.toString())) {
                    return (
                      <Tooltip key={i} title={u.username} placement='top'>
                        <Avatar
                          style={{
                            backgroundColor: "#f56a00",
                          }}
                        >
                          {u.username[0].toUpperCase()}
                        </Avatar>
                      </Tooltip>
                    );
                  }
                })}
              </Avatar.Group>
            </CardFooter>

            <Modal
              title='Add Task'
              open={open}
              onCancel={handleCancel}
              footer={null}
            >
              <TaskForm
                id={id}
                setId={setId}
                task={task}
                onCancel={handleCancel}
              />
            </Modal>
          </DragItem>
        );
      }}
    </Draggable>
  );
};

const mapStateToProps = ({ user, tasks }) => {
  return {
    user: user.data,
    tasks: tasks.data,
  };
};

export default connect(mapStateToProps, { getTasks })(ListItem);
