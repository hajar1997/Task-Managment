import { Col, Row, Button, Modal } from "antd";
import React, { useState, useEffect } from "react";
import { UnorderedListOutlined } from "@ant-design/icons";
import DragList from "../Layout/DragList";
import TaskForm from "../Layout/TaskForm";
import { connect } from "react-redux";
import AOS from "aos";

function Tasks(props) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    AOS.init({
      duration: 600,
    });
  });

  const showModal = () => {
    setOpen(true);
  };
  const handleCancel = () => {
    setOpen(false);
  };

  const { user } = props;

  return (
    <div className="Tasks">
      <Row gutter={[25, 25]}>
        <Col xs={24} data-aos="fade-down">
          <div className="page-header-style">
            <div className="wrapped-icon-title">
              <UnorderedListOutlined className="unordered-list-outlined" />
              <span>Tasks</span>
            </div>
            {user.role.addTask && [
              <Button
                key="1"
                type="primary"
                onClick={() => {
                  showModal(true);
                }}
              >
                Add Task
              </Button>,
            ]}
          </div>
        </Col>
        <Col xs={24}>
          <DragList/>
        </Col>
      </Row>
      <Modal title="Add Task" open={open} onCancel={handleCancel} footer={null}>
        <TaskForm  onCancel={handleCancel} />
      </Modal>
    </div>
  );
}

const mapStateToProps = ({ user }) => {
  return {
    user: user.data,
  };
};

export default connect(mapStateToProps, {})(Tasks);
