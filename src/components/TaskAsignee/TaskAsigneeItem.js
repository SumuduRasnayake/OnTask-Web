import React from "react";
import { ListGroupItem } from "reactstrap";
import { Minus } from "styled-icons/boxicons-regular/Minus";
import SENDER from "../../utils/SENDER";

const TaskAsigneeItem = props => {
  function removeAsignee() {
    SENDER.post("/task-asignee/remove/" + props.userId, {
        taskId: props.taskId,
        removedBy: localStorage.getItem('id')
    } )
      .then(res => {
        props.onRemove();
      })
      .catch(err => console.log(err));
  }

  return (
    <ListGroupItem
      action
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        minHeight: "4vh",
      }}
    >
      {props.propic ? (
        <img src={props.propic} height="20" width="20" alt="" />
      ) : (
        <img className="img-avatar" src={"https://www.gravatar.com/avatar/"+props.emailHash+"?d=retro&s=30"} alt=""/>
      )}
      <h6 style={{ margin: "0% 0% 0% 5%" }}>{props.name}</h6>
      <div style={{ flexGrow: 1 }} />
      <Minus
        size={20}
        style={{ cursor: "pointer" }}
        alt="Remove"
        onClick={removeAsignee}
      />
    </ListGroupItem>
  );
};

export default TaskAsigneeItem;
