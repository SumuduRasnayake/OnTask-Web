import React, { Component } from "react";
import { Button, ListGroupItem } from "reactstrap";

class MemberSearchItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
        selected: false,
        isDisabled: false
    }
  }

  render() {
    return (
      <div
      style={{
        alignItems: "center",
        display: this.props.id !== parseInt(localStorage.getItem('id'))?"flex":"none",
        flexDirection: "row",
        paddingBottom: "2%"
      }}
      >
        <ListGroupItem
          action
          tag="a"
          href={"/users/" + this.props.id}
          style={{
            padding: "0.5%",
            border: 0,
            alignItems: "center",
            display: "flex",
            flexDirection: "row",
          }}
          className="list-group-item-accent-warning"
        >
          {
            this.props.data.propicURL ? 
            <img
            style={{ borderRadius: "50%" }}
            className="img-avatar"
            width="25"
            height="25"
            src={this.props.data.propicURL}
            alt=""
          /> :
          <img className="img-avatar" src={"https://www.gravatar.com/avatar/"+this.props.data.emailHash+"?d=retro&s=25"} alt=""/>
          }
          <div style={{ marginLeft: "1%" }}>{this.props.name} </div>
        </ListGroupItem>
        <div style={{ flexGrow: 1 }} />
         {this.props.selected ? "" : <Button
            color="success"
            disabled={this.state.isDisabled}
            onClick={() => {
              this.setState({isDisabled: true})
              this.props.selectMember(this.props.data)
            }}
            style={{marginLeft: "1%"}}
          >
            Add
          </Button>}  
      </div>
    );
  }
}

export default MemberSearchItem;
