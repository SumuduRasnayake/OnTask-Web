import React from 'react'
import SENDER from '../../../utils/SENDER'
import moment from 'moment'
var HtmlToReactParser = require("html-to-react").Parser;


const FeedItem = props => {
    const CreatedDateFields = new Date(props.createdAt).toString().split(" ");

    const createdDate = CreatedDateFields.slice(1, 4)
      .toString()
      .replace(/,/, "");
    const createdTime = CreatedDateFields[4];
    var htmlToReactParser = new HtmlToReactParser();
  
    return (
      <div onClick={props.markAsSeen} style={{height: "10vh"}}>
        <div style={{display: "flex",flexDirection: "row"}}>
        <i className="fa fa-bell" />
                    <h6 style={{ margin: 0 }}>
            {htmlToReactParser.parse(props.description)}
          </h6>
        </div>
          <p style={{ margin: 0 }}>
            {moment(new Date(props.createdAt)).fromNow()}
          </p>
      </div>
    )
}

export default FeedItem