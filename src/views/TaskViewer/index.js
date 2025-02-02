import React, { useState, useEffect, useRef } from "react";
import Modal from "react-bootstrap/Modal";
import { withRouter} from 'react-router-dom'
import TaskAsignee from "./TaskAsignee";
import TaskDiscussion from "./TaskDiscussion"
import TaskResources from "./TaskResources"
import SubTasks from "./SubTasks";
import TaskActivity from "./TaskActivity"
import SENDER from "../../utils/SENDER";
import { Clock } from "styled-icons/feather/Clock";
import { Description } from "styled-icons/material/Description";
import { Microsoft } from 'styled-icons/boxicons-logos/Microsoft'
import { Tick} from 'styled-icons/typicons/Tick'
import "./taskviewer.css";
import { Row, Col, Card, CardBody, CardHeader,Button,Progress,UncontrolledDropdown,
  DropdownItem,
  DropdownMenu,
  Input,
  DropdownToggle } from "reactstrap";

const TaskViewer = props => {
  const [show, setShow] = useState(false);
  const [subtaskTotal, setSubtaskTotal] = useState(1);
  const [percentage,setPercentage] = useState(0)

  const [description, setDescription] = useState("");
  const [task, setTask] = useState([]);
  const [desEditable, setDesEditable] = useState(false);
  const [EditTaskInfo, setEditTaskInfo] = useState(false);
  const desc = useRef(null);

  function deleteTask(){
    if(window.confirm("All task data will be permanently deleted.Continue?")){
      SENDER.delete('/tasks/'+props.taskId).then(
        res => {
          alert("Task Deleted")
          window.location.reload()
        }
      ).catch(err => console.log(err))
    }
  }

  function handleDesChange() {
    setDesEditable(false);
    SENDER.post("/tasks/edit-desc", {
      editedBy: localStorage.getItem('id'),
      taskId: props.taskId,
      description: desc.current.innerText,
    })
      .then(res => console.log("Description Updated"))
      .catch(err => alert("Error"));
  }

  const closeModal = () => {
    setShow(false);
  };

  const getSubTaskStats = (completed,total) => {
    setSubtaskTotal(total)
    if (total !== 0){
      const value = ( completed / total ) * 100
      setPercentage(value)
    }
  }

  function editDueDate(e){
    SENDER.post("/tasks/"+props.taskId+"/edit-due",{
        editedBy: localStorage.getItem('id'),
        date: e.target.value
    }).then(
      res => {
        setEditTaskInfo(false)
      } 
    ).catch(
      err => console.log(err)
    )
  }


  function toggleTaskCompletedStatus(){
    SENDER.post("/tasks/completed/" + localStorage.getItem('id') +"/"+props.taskId)
    .then(res => {
      console.log("com_st",res.status)
      console.log("dt:",res.data)
      if(res.status === 200 || res.status === 201){
        if(res.data){
          getSubTaskStats(1,1)
        }
        else{
          getSubTaskStats(0,1)
        }
      }
    })
    .catch(err => console.log(err));
  }

 

  useEffect(() => {
    if (props.i) {
      setShow(true);
    }

    SENDER.get("/tasks/" + props.taskId)
      .then(res => {
        setTask(res.data);
        setDescription(res.data.description);
      })
      .catch(err => console.log(err))
    
  }, [props.i,props.taskId]);

  return (
    <>
      <Modal
        size="lg"
        show={show}
        onHide={closeModal}
        backdrop="static"
        dialogClassName="task_viewer_modal"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-lg">
            <div style={{display: "flex",flexDirection: "row"}}>
            <h3>
            {props.name}{" "}
            <span style={{ color: "gray", fontSize: "0.8em" }}>
              in {props.groupName}
            </span>
            </h3>
            <UncontrolledDropdown direction="right" style={{marginTop: "-1.5%"}}>
            <DropdownToggle nav>
            <i className="fa fa-ellipsis-h"></i>  
            </DropdownToggle>
            <DropdownMenu left="true">
            <DropdownItem>Add to another group</DropdownItem>
                  <DropdownItem onClick={deleteTask}>Delete Task</DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
            
            </div>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
           <Row style={{ marginTop: "0.5%" }}>
            <Col xs="12" sm="12" lg="3">
            <Card style={{border: 0,padding: 0}}>
                <CardBody>
                <i
                      className="fa fa-edit float-right"
                      title="Edit"
                      onClick={() => setEditTaskInfo(!EditTaskInfo)}
                      style={{
                        cursor: "pointer",
                        display: props.isAdmin ? "block" : "none",
                      }}
                    />
                  <div style={{ display: "flex", flexDirection: "row",padding: "1%" }}>
                    <Clock size={15} />
                    <h6 style={{ marginLeft: "2.5%" }}>
                      <b>Due </b> {EditTaskInfo ? <Input type="date" onChange={editDueDate} /> :task.dueDate}
                    </h6>
                  </div>
                  <div style={{ display: "flex", flexDirection: "row",padding: "1%"  }} onClick={() => {}}>
                    <Microsoft size={15} />
                    <h6 style={{ marginLeft: "2.5%" }}>
                      Add to Outlook
                    </h6>
                  </div>
                  <div style={{ display: "flex", flexDirection: "row",padding: "1%"  }}>
                    <Tick size={20} style={{display: subtaskTotal === 0 ? "block": "none"}}/>
                    <h6 style={{ display: subtaskTotal === 0 ? "block": "none",marginLeft: "1%",cursor: "pointer" }} onClick={toggleTaskCompletedStatus}>
                      {task.isCompleted ? "Mark as not completed" : "Mark as completed"} 
                    </h6>
                  </div>
                  <div style={{display: "flex",flexDirection: "column"}}>
                <Progress className="progress-xs mt-2" color="success" value={percentage} />
                </div>
                </CardBody>
              </Card>
              
              <TaskResources taskId={props.taskId} />              

              <TaskAsignee isAdmin={props.isAdmin} taskId={props.taskId} groupId={props.groupId}/>
            </Col>
            <Col xs="12" sm="12" lg="5">
              <Card>
                <CardHeader>
                  <Description size={20} />
                  <b>Description</b>
                  <div className="card-header-actions">
                    <i
                      className="fa fa-edit float-right"
                      onClick={() => setDesEditable(true)}
                      title="Edit description"
                      style={{
                        cursor: "pointer",
                        display: props.isAdmin ? "block" : "none",
                      }}
                    />
                  </div>
                </CardHeader>
                <CardBody style={{ padding: "1%" }}>
                  <div
                    ref={desc}
                    contentEditable={desEditable}
                    suppressContentEditableWarning={true}
                    style={{
                      border: desEditable ? "1px solid gray" : "none",
                      padding: "3%",
                      textAlign: "justify",
                      borderRadius: "5px",
                    }}
                  >
                    {description}
                  </div>
                  <div style={{display: "flex",flexDirection: "row"}}>
                  <Button style={{marginTop: "1%",display: desEditable ? "block" : "none"}} onClick={handleDesChange} color="success">update</Button>
                  <p style={{margin: "3% 0% 0% 1%",color: "red",display: desEditable ? "block" : "none",cursor: "pointer"}} onClick={() => {
                    desc.current.innerText = description
                    setDesEditable(false)
                  }}>Cancel</p>
                  </div>
                </CardBody>
              </Card>
              <TaskActivity taskId={props.taskId}/>
            </Col>
            <Col xs="12" sm="12" lg="4">
            <SubTasks isAdmin={props.isAdmin} isAssigned={props.isAssigned} taskId={props.taskId} sendSubTaskStats={getSubTaskStats}/> 
            <TaskDiscussion taskId={props.taskId} />
            </Col>
          </Row> 
        </Modal.Body>
      </Modal>
    </>
  );
};

export default withRouter(TaskViewer)
