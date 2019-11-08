import React from "react";
import { Card, CardBody } from "reactstrap";
import moment from "moment";
var HtmlToReactParser = require("html-to-react").Parser;

const GroupActivityItem = props => {

  var htmlToReactParser = new HtmlToReactParser();

  return (
    <div style={{paddingBottom: "2%"}}>
              <h6 style={{ margin: 0 }}>
          {htmlToReactParser.parse(props.description)}
        </h6>
        <p style={{ margin: 0 }}>
          {moment(new Date(props.createdAt)).fromNow()}
        </p>
    </div>
  );
};

export default GroupActivityItem;
