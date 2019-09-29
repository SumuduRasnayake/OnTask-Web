import React from "react";
import { Badge,Card,CardBody } from "reactstrap";

const TaskItem = props => {
  return (
    <Card
      className="mb-sm-2 p-2 m-1"
    >
        <CardBody style={{padding: 0}}>
        <div className="text-muted"       style={{ cursor: "pointer" }} onClick={() => props.sendTask(props.task,props.isAsigned)}>
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
