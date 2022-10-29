import React, { useEffect } from "react";
import styled from "styled-components";
import { DragDropContext } from "react-beautiful-dnd";
import DraggableElement from "./DraggableElement";
import { connect } from "react-redux";
import { getTasks, getUser } from "../../redux/actions";
import admin from '../../api/admin';
import { useState } from 'react';


const DragDropContextContainer = styled.div`
  padding: 10px 0;
  border-radius: 6px;
`;

const ListGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 8px;
`;

function DragList({ user, tasks, getTasks }) {
  const [users, setUsers] = useState([])

  const removeFromList = (list, index) => {
    const result = Array.from(list);
    const [removed] = result.splice(index, 1);
    return [removed, result];
  };

  const addToList = (list, index, element) => {
    const result = Array.from(list);
    result.splice(index, 0, element);
    return result;
  };

  const lists = ["todo", "inProgress", "done"];

  const [elements, setElements] = React.useState({});

  const generateLists = () => {
    if (tasks.length >= 0) {
      let obj = {};
      lists.forEach((value) => {
        obj[value] = tasks
          .filter((f) => {
            return f['status'] === value;
          })
          .map((d) => {
            return {
              ...d,
              ids: `item-${d.id}`,
              prefix: d.status,
            };
          });
      },
      obj
      );
      setElements(obj)
    }
  };

  useEffect(() => {
    getTasks();
    getAllUsers()
  }, []);

  const getAllUsers = async () => {
    await admin.get('/users').then((res)=>{
      setUsers(res.data)
    })
  }

  console.log(users)

  useEffect(() => {
    generateLists(tasks)
  }, [tasks]);

  
  const onDragEnd = (result) => {
      if (!result.destination) {
        return;
      }
      const listCopy = { ...elements };
  
      const sourceList = listCopy[result.source.droppableId];
      const [removedElement, newSourceList] = removeFromList(
        sourceList,
        result.source.index
      );
  
      if (removedElement) {
        admin.put(`tasks/${removedElement.id}` , {
            ...removedElement,
            status:result.destination.droppableId,
            prefix:result.destination.droppableId
        }).then(() =>{
            getTasks()
        })
    }
      listCopy[result.source.droppableId] = newSourceList;
      const destinationList = listCopy[result.destination.droppableId];
      listCopy[result.destination.droppableId] = addToList(
        destinationList,
        result.destination.index,
        removedElement
      );
  
      setElements(listCopy);
    
  };

  return (
    <DragDropContextContainer>
      <DragDropContext onDragEnd={onDragEnd}>
        <ListGrid>
          {lists.map((listKey) => (
            <DraggableElement
              elements={elements[listKey]}
              key={listKey}
              prefix={listKey}
              users={users}
            />
          ))}
        </ListGrid>
      </DragDropContext>
    </DragDropContextContainer>
  );
}

const mapStateToProps = ({ user, tasks }) => {
  return {
    user: user.data,
    tasks: tasks.data,
  };
};


export default connect(mapStateToProps, { getTasks, getUser })(DragList);
