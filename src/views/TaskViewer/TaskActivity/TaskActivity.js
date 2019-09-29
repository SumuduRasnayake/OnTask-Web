import React, { useState,useEffect } from 'react'
import { Card, CardHeader, CardBody} from 'reactstrap'
import pusher from "../../../utils/PusherObject";
import TaskActivityItem from '../../../components/ActivityItem'
import SENDER from '../../../utils/SENDER'

const TaskActivity = props => {
    const [taskActivities,setTaskActivities] = useState([])
    useEffect(
      () => {
        var channel = pusher.subscribe("task_" + props.taskId);
        channel.bind("new_activity", updateTaskActivityFeed);

        console.log("taskid ",props.taskId)
        SENDER.get('/tasks/'+props.taskId+"/activity").then(
          res => {
            setTaskActivities(res.data)
            console.log("tac:",res.data)
          }
        ).catch(err => console.log(err))
      },[props.taskId]
    )

    function updateTaskActivityFeed (data){
        taskActivities.push(JSON.parse(data))
    };

    return (
        <Card>
              <CardHeader>
                <b>Task Activity</b>
                <div className="card-header-actions" />
              </CardHeader>
              <CardBody style={{ padding: 0 }}>
                {taskActivities.map( taskActivity => {
                  return (
                    <TaskActivityItem 
                    key={taskActivity.id}
                    description={taskActivity.description}
                    createdAt={taskActivity.createdAt}
                  />
                  )
                }
                  )}
              </CardBody>
            </Card>
    )
}

export default TaskActivity