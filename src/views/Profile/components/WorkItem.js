import React from "react";
import { Card, CardBody } from "reactstrap";

const WorkItem = props => {
  return (
    <Card style={{ marginBottom: "1%" }}>
      <CardBody style={{ padding: "1%" }}>
        <h6><b>{props.title}</b> at <b>{props.w_place}</b></h6>
        <p>
          From <b>{props.from.slice(0, 10)}</b> -{" "}
          <b>{props.to ? props.to.slice(0, 10) : "Present"}</b>
        </p>

        <p>{props.description}</p>
      </CardBody>
    </Card>
  );
};

export default WorkItem;
