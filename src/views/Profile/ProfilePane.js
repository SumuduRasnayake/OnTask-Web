import React, { Component } from "react";
import {
  Nav,
  NavItem,
  NavLink,
  Progress,
  TabContent,
  Card,
  CardBody,
  Input,
  Row,
  Col,
  TabPane,
  ListGroup,
  ListGroupItem,
} from "reactstrap";
import BasicInfoSettings from "./BasicInfoSettings";
import WebPresenceSettings from "./WebPresenceSettings";
import ContactInfoSettings from "./ContactInfoSettings";
import WorkSettings from "./WorkSettings";
import EducationSettings from "./EducationSettings";
import PropTypes from "prop-types";
import classNames from "classnames";
import { AppSwitch } from "@coreui/react";
import UserProfile from "./UserProfile";

const propTypes = {
  children: PropTypes.node,
};

const defaultProps = {};

class ProfilePane extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      activeTab: "1",
      trigger: false,
      editEnabled: false,
    };
  }

  toggle(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab,
      });
    }
  }

  componentDidMount() {
    if (this.props.id === localStorage.getItem("id")) {
      this.setState({ editEnabled: true });
    }
  }

  componentDidUpdate(prevProps) {
    if (
      prevProps !== this.props &&
      this.props.id === localStorage.getItem("id")
    ) {
      this.setState({ editEnabled: true });
    }
  }

  triggerUpdate = () => {
    this.setState(prevState => {
      this.setState({ trigger: !prevState.trigger });
    });
  };

  render() {
    // eslint-disable-next-line
    const { children, ...attributes } = this.props;

    return (
      <React.Fragment>
        <Nav tabs>
          <NavItem>
            <NavLink
              className={classNames({ active: this.state.activeTab === "1" })}
              onClick={() => {
                this.toggle("1");
              }}
            >
              {/* <i className="icon-list"></i> */}
              Profile
            </NavLink>
          </NavItem>

          <NavItem>
            <NavLink
              style={{ display: this.state.editEnabled ? "block" : "none" }}
              className={classNames({ active: this.state.activeTab === "3" })}
              onClick={() => {
                this.toggle("3");
              }}
            >
              {/* <i className="icon-settings"></i> */}
              <p style={{ margin: 0 }}>Edit Profile & Settings</p>
            </NavLink>
          </NavItem>
        </Nav>
        <TabContent activeTab={this.state.activeTab}>
          <TabPane tabId="1">
            <UserProfile id={this.props.id} trigger={this.state.trigger} />
          </TabPane>
          <TabPane tabId="3" className="p-3">
            <Card>
              <CardBody>
                <BasicInfoSettings 
                  id={localStorage.getItem("id")}
                  onUpdate={this.triggerUpdate}/>
              </CardBody>
            </Card>

            <Card>
              <CardBody>
                <ContactInfoSettings 
                  onUpdate={this.triggerUpdate}
                />
              </CardBody>
            </Card>

            <Card>
              <CardBody>
                <WebPresenceSettings
                  id={localStorage.getItem("id")}
                  onUpdate={this.triggerUpdate}
                />
              </CardBody>
            </Card>

            <Card>
              <CardBody>
                <WorkSettings
                  id={localStorage.getItem("id")}
                  onUpdate={this.triggerUpdate}
                />
              </CardBody>
            </Card>

            <Card>
              <CardBody>
                <EducationSettings
                  id={localStorage.getItem("id")}
                  onUpdate={this.triggerUpdate}
                />
              </CardBody>
            </Card>
          </TabPane>
        </TabContent>
      </React.Fragment>
    );
  }
}

ProfilePane.propTypes = propTypes;
ProfilePane.defaultProps = defaultProps;

export default ProfilePane;
