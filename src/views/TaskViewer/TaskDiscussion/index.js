import React, { useState, useEffect} from "react";
import SENDER from "../../../utils/SENDER";
import { Card, CardHeader, CardBody } from "reactstrap";
import CommentBox from "./CommentBox";
import Comment from './Comment'
import pusher from '../../../utils/PusherObject'

const TaskDiscussion = props => {
  const [comments, setComments] = useState([]);

  function addComments(data){
    SENDER.get("/comments/" + parseInt(props.taskId))
    .then(res => {
      setComments(res.data);
    })
    .catch(err => console.log(err));
  }
      var channel = pusher.subscribe("chat_"+props.taskId);
      channel.bind('new_comment',addComments);

  useEffect(() => {
    SENDER.get("/comments/" + parseInt(props.taskId))
      .then(res => {
        setComments(res.data);
      })
      .catch(err => console.log(err));
  }, [props.taskId]);

  return (
    <Card className="border-light">
      <CardHeader>
        <i className="icon-speech" />
        <b>Discussion</b>
      </CardHeader>
      <CardBody style={{ padding: 0,overflowY: "auto",paddingTop: "1%" }}>
      {comments.length > 0 ? comments.map(comment => {
          return (
            <Comment
              key={comment.id}
              content={comment.content}
              createdAt={comment.createdAt}
              fname={comment.fname}
            />
          );
        }): <h6 style={{textAlign: "left",color: "gray",paddingTop: "1%"}}>Be the first to post a comment</h6>}
        <CommentBox taskId={props.taskId} />
      </CardBody>
    </Card>
  );
};

export default TaskDiscussion;
