import React, { useState,useEffect } from 'react'
import { Card,CardHeader,CardBody} from 'reactstrap'
import NewTaskForm from "../../../components/NewTaskForm";
import TaskItem from "../../../components/TaskItem";
import TaskViewer from "../../TaskViewer";
import SENDER from '../../../utils/SENDER'

export default function GroupTasks(props){
    const [i,setI] = useState(0)
    const [assignedTasks,setAssignedTasks] = useState([])
    const [selectedTask,setSelectedTask] = useState("")
    const [isSelectedTaskAssigned,setSelectedTaskAssigned] = useState("")
    const [groupTasks,setGroupTasks] = useState([])

    useEffect(
        () => {

            SENDER.get("/" + props.groupId + "/tasks")
            .then(res => {
                setGroupTasks(res.data)
            })
            .catch(err => console.log(err));

            SENDER.get("/user/" + localStorage.getItem("id") + "/tasks")
        .then(res => {
          setAssignedTasks(res.data)
          
        })
        .catch(err => console.log(err));
        }
        ,[props.groupId]
    )

    const getClickedTask = (task,isAssigned) => {
        setI(i+1)
        setSelectedTask(task)
        setSelectedTaskAssigned(isAssigned)
    };

    return (
            <Card className="border-light">
              <CardHeader>
                <b>Tasks</b>
                <div className="card-header-actions">
                  <NewTaskForm
                    groupId={props.groupId}
                    //onAdd={this.updateTaskList}
                    //isAdmin={this.state.isAdmin}
                  />
                </div>
              </CardHeader>
              <CardBody style={{ backgroundColor: "#D6E0E3", padding: 0 }}>
                {groupTasks.length > 0 ? (
                  groupTasks.map(task => {
                    const isAssigned = assignedTasks.filter(t => t.id === task.id).length > 0  
                    return (
                      <TaskItem
                        style={{
                          cursor: "pointer",
                          padding: "2.5%",
                          margin: 0,
                        }}
                        key={task.id}
                        isAdmin={props.isAdmin}
                        isAssigned={isAssigned}
                        task={task}
                        sendTask={getClickedTask}
                      />
                    );
                  })
                ) : (
                  <div
                    className="text-center p-2"
                    style={{ display: props.isAdmin ? "block" : "none" }}
                  >
                    No tasks. Add some tasks from top right + sign in this
                    widget
                  </div>
                )}
              </CardBody>
              <TaskViewer
                name={selectedTask && selectedTask.name}
                groupId={props.groupId}
                isAssigned={isSelectedTaskAssigned}
                isAdmin={props.isAdmin}
                taskId={selectedTask && selectedTask.id}
                i={i}
                // isAdmin={this.state.isAdmin}
                // isAssigned={this.state.isSelectedTaskAssigned}
                // group={this.state.groupData.name}
              />
            </Card>
    )
}