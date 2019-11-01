import React from 'react';
import Card from 'react-bootstrap/Card'
import ReactMarkdown from 'react-markdown'

const Comment = props => {
    const CreatedDateFields = new Date(props.createdAt).toString().split(' ')
    //alert(CreatedDateFields.slice(1,4))

    const createdDate = CreatedDateFields.slice(1,4).toString().replace(/,/,"")
    const createdTime = CreatedDateFields[4]

    return (
        <Card style={{marginTop: "1%",marginBottom: "1%",height: "15vh"}}>
            <Card.Header>
                <p style={{margin: 0}}><b>{props.fname}</b> commented on {createdDate} at {createdTime}
                </p>
                {/* commented on {props.createdAt.slice(0,10)} at {props.createdAt.slice(12,19)} */}
            </Card.Header>
              <Card.Body style={{padding: "1% 0% 1% 4%"}}>
              <ReactMarkdown source={props.content} />
              </Card.Body>
          </Card>
    );
};

export default Comment;