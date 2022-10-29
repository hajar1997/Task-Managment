import { Droppable } from "react-beautiful-dnd";
import ListItem from "./ListItem";
import React from "react";
import styled from "styled-components";

const ColumnHeader = styled.div`
  text-transform: uppercase;
  margin-bottom: 20px;
  font-size: 16px;
  font-weight: 500;
  color: #505051;
`;

const DroppableStyles = styled.div`
  padding: 10px;
  border-radius: 6px;
  background: #f0f2f5;
`;

const DraggableElement = ({ prefix, elements, users }) => (
  <DroppableStyles>
    <ColumnHeader>{prefix}</ColumnHeader>
    <Droppable droppableId={`${prefix}`}>
      {(provided) => (
        <div {...provided.droppableProps} ref={provided.innerRef}>
          {elements?.map((item, index) => (
            <ListItem key={item.id} item={item} index={index} users={users}/>
          ))}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  </DroppableStyles>
);

export default DraggableElement;