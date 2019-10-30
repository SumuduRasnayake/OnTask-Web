import React, { Component } from "react";
import pusher from "../../utils/PusherObject";
import GroupTasks from './components/GroupTasks'
import GroupActivityItem from "../../components/ActivityItem";
import RequireAuth from "../../utils/PrivateRoute";
import GroupHeader from "./components/GroupHeader";

import SENDER from "../../utils/SENDER";

import GroupMembers from './components/GroupMembers'

import {
  Progress,
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Row,
} from "reactstrap";
import NewNoticeForm from "../../components/NewNoticeForm";
import NoticeViewer from "../../components/NoticeViewer/NoticeViewer";

class Group extends Component {
  constructor(props) {
    super(props);
    this.groupDesc = React.createRef();

    var channel = pusher.subscribe("group_" + this.props.match.params.gid);
    channel.bind("new_activity", this.updateGroupActivityFeed);
  }

  updateGroupActivityFeed = data => {
    this.setState(prevState => ({
      groupActivities: [...prevState.groupActivities, JSON.parse(data)],
    }));
  };

  handleDescriptionChange = () => {
    this.setState({ desEditable: false });
    SENDER.post("/groups/" + this.props.match.params.gid + "/edit-desc", null, {
      params: {
        editedBy: localStorage.getItem("id"),
        desc: this.groupDesc.current.innerText,
      },
    })
      .then(res => {})
      .catch(err => alert("Error"));
  };

  state = {
    trig: false,
    inviteLink: "",
    groupData: [],
    announcements: [],
    notices: [],
    groupActivities: [],
    completedTaskCount: 0,
    taskCount: 0,
    isAdmin: false,
    selectedNotice: null,
    percentage: 0,
    description: "",
    desEditable: false,
  };

  componentDidMount() {
    SENDER.get("/exists/group/" + this.props.match.params.gid).then(res => {
      if (res.status > 400) {
        this.props.history.push("/");
      }
    });
    const params = new URLSearchParams(this.props.location.search);
    const itoken = params.get("itoken");

    if (itoken) {
      SENDER.post("/member/" + itoken, null, {
        params: {
          user_id: localStorage.getItem("id"),
        },
      })
        .then(res => {
          alert("You have been added to group");
          this.setState(prevState => ({ trig: !prevState.trig }));
        })
        .catch(err => console.log(err));
    }

    SENDER.get("/groups/" + this.props.match.params.gid)
      .then(res => {
        this.setState({
          groupData: res.data,
          description: res.data.description,
        });
      })
      .catch(err => console.log(err));

    SENDER.get("/groups/" + this.props.match.params.gid + "/activity")
      .then(res => {
        this.setState({ groupActivities: res.data });
      })
      .catch(err => console.log(err));

    SENDER.get(
      "/member/" +
        this.props.match.params.gid +
        "/is-admin/" +
        localStorage.getItem("id")
    )
      .then(res => {
        this.setState({ isAdmin: res.data });
      })
      .catch(err => console.log(err));

  

    

    SENDER.get("/notices/group/" + this.props.match.params.gid)
      .then(res => {
        this.setState({ notices: res.data });
      })
      .catch(err => console.log(err));


  }

  

  updateTaskList = () => {
    SENDER.get("/" + this.props.match.params.gid + "/tasks")
      .then(res => {
        this.setState({ tasks: res.data, TaskCount: res.data.length });
      })
      .catch(err => console.log(err));
  };

  updateNoticeList = () => {
    SENDER.get("/notices/group/" + this.props.match.params.gid)
      .then(res => {
        this.setState({ notices: res.data });
      })
      .catch(err => console.log(err));
  };

  render() {
    return (
      <div style={{}}>
        <GroupHeader
          name={this.state.groupData.name}
          groupId={this.props.match.params.gid}
        />
        <Row>
          <Col xs="12" sm="12" lg="3" style={{ marginTop: "0.5%" }}>
    
            <GroupTasks 
              groupId={this.props.match.params.gid}
              isAdmin={this.state.isAdmin}
              groupName={this.state.groupData.name} />
          </Col>

          <Col xs="12" sm="12" lg="4" style={{ marginTop: "0.5%",paddingLeft: 0 }}>
            <Card style={{ margin: 0 }}>
              <CardHeader>
                <b>Group Activity</b>
                <div className="card-header-actions" />
              </CardHeader>
              <CardBody style={{ padding: 0 }}>
                {this.state.groupActivities.length > 0 ? (
                  this.state.groupActivities.map(activity => (
                    <GroupActivityItem
                      description={activity.description.split("in group")[0].trim()}
                      key={activity.id}
                      createdAt={activity.createdAt}
                    />
                  ))
                ) : (
                  <></>
                )}
              </CardBody>
            </Card>
          </Col>

          <Col xs="12" sm="6" lg="3" style={{marginTop: "0.5%", paddingLeft: 0 }}>
            <Card
              style={{
                padding: "1%",
                marginBottom: 0,
                marginTop: "1%",
                borderBottom: 0,
              }}
            >
              <CardHeader>
                <b>About</b>
                <div className="card-header-actions">
                  <i
                    className="fa fa-edit float-right"
                    onClick={() => this.setState({ desEditable: true })}
                    style={{
                      display: this.state.isAdmin ? "block" : "none",
                      cursor: "pointer",
                    }}
                  />
                </div>
              </CardHeader>
              <CardBody style={{padding: "1%"}}>
                <div
                  ref={this.groupDesc}
                  contentEditable={this.state.desEditable}
                  style={{
                    border: this.state.desEditable ? "1px solid gray" : "none",
                    padding: this.state.desEditable ? "4%" : 0,
                    textAlign: "justify",
                    borderRadius: "5px",
                  }}
                >
                  {this.state.description ? this.state.description : <p style={{marginTop: "1%",color: "gray"}}>No description provided</p>}
                </div>
                <div style={{ display: "flex", flexDirection: "row" }}>
                  <Button
                    style={{
                      marginTop: "1%",
                      display: this.state.desEditable ? "block" : "none",
                    }}
                    onClick={this.handleDescriptionChange}
                    color="success"
                  >
                    update
                  </Button>
                  <p
                    style={{
                      margin: "3% 0% 0% 1%",
                      color: "red",
                      display: this.state.desEditable ? "block" : "none",
                      cursor: "pointer",
                    }}
                    onClick={() => this.setState({ desEditable: false })}
                  >
                    Cancel
                  </p>
                </div>
              </CardBody>
            </Card>
            <Card className="card-accent-secondary" style={{}}>
              <CardHeader>
                <b>Announcements</b>
                <div className="card-header-actions">
                  <NewNoticeForm
                    groupId={this.props.match.params.gid}
                    isAdmin={this.state.isAdmin}
                    updateNoticeList={this.updateNoticeList}
                  />
                </div>
              </CardHeader>
              <CardBody style={{ padding: 0 }}>
                {this.state.notices.map(notice => {
                  return (
                    <Card
                      style={{ margin: 0, cursor: "pointer" }}
                      className="border-light"
                      onClick={() =>
                        this.setState({ selectedNotice: notice.id })
                      }
                      key={notice.id}
                    >
                      <CardBody
                        style={{
                          padding: "3% 0% 3% 2%",
                          flex: 1,
                          alignItems: "center",
                          flexDirection: "column",
                        }}
                      >
                        <h6 style={{ margin: 0 }}>{notice.title}</h6>
                        <i className="fa fa-calendar" />{" "}
                        <b>{notice.date.slice(0, 10)}</b>
                        <i
                          className="fa fa-user"
                          style={{ marginLeft: "5%" }}
                        />{" "}
                        <b>{notice.createdBy}</b>
                      </CardBody>
                    </Card>
                  );
                })}
                <NoticeViewer
                  id={
                    this.state.selectedNotice ? this.state.selectedNotice : ""
                  }
                  groupId={this.props.match.params.gid}
                />
              </CardBody>
            </Card>
          </Col>

          <Col xs="12" sm="6" lg="2" style={{ padding: 0 }}>
            <GroupMembers 
              isAdmin={this.state.isAdmin} 
              groupId={this.props.match.params.gid}/>
          </Col>
        </Row>
      </div>
    );
  }
}

export default RequireAuth(Group);
