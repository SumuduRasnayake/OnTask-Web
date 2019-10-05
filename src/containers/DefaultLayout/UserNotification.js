import React from 'react'
import moment from 'moment'
import { DropdownItem } from "reactstrap";
var HtmlToReactParser = require("html-to-react").Parser;


const UserNotification = props => {
   
    var htmlToReactParser = new HtmlToReactParser();
  
    return (
      <DropdownItem onClick={props.markAsSeen}>
        <div style={{display: "flex",flexDirection: "row"}}>
        <i className="fa fa-bell" />
                    <h6 style={{ margin: 0 }}>
            {htmlToReactParser.parse(props.description)}
          </h6>
        </div>
          <p style={{ margin: 0 }}>
          {moment(new Date(props.createdAt)).fromNow()}
          </p>
      </DropdownItem>
    )
}

export default UserNotification