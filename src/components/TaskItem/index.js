import React from "react";
import { Card,CardBody } from "reactstrap";

const TaskItem = props => {
  const OnClick = props.isAssigned || props.isAdmin ? 
  () => props.sendTask(props.task,true) : () => {}

  return (
    <Card
      className="mb-sm-2 p-2 m-1"
    >
        <CardBody style={{padding: 0}}>
        <div className="text-muted"       style={{ cursor: "pointer" }} onClick={OnClick}>
        <h6 style={{margin: 0}}>{props.task.name}</h6>
        <p style={{margin: 0}}>due {props.task.dueDate}</p>
      </div>
      <div style={{ display: "flex", flexDirection: "row" }}>
      </div>
        </CardBody>
    </Card>
  );
};

export default TaskItem;
