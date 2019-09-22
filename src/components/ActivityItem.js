import React from "react";
import { Card, CardBody } from "reactstrap";
var HtmlToReactParser = require("html-to-react").Parser;

const GroupActivityItem = props => {
  const CreatedDateFields = new Date(props.createdAt).toString().split(" ");

  const createdDate = CreatedDateFields.slice(1, 4)
    .toString()
    .replace(/,/, "");
  const createdTime = CreatedDateFields[4];
  var htmlToReactParser = new HtmlToReactParser();

  return (
    <Card style={{ margin: 0 }}>
      <CardBody style={{ padding: "2%" }}>
        <h6 style={{ margin: 0 }}>
          {htmlToReactParser.parse(props.description)}
        </h6>
        <p style={{ margin: 0 }}>
          {createdDate} at {createdTime}
        </p>
      </CardBody>
    </Card>
  );
};

export default GroupActivityItem;
