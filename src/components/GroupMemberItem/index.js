import React, { Component } from 'react';
import { ListGroupItem } from 'reactstrap';

class GroupMemberItem extends Component {
   
    render() {
        return (
            <ListGroupItem action tag="a" href={"/users/"+this.props.id} style={{padding: "1%",alignItems: "center",display: "flex",flexDirection: "row"}} className="list-group-item-accent-warning">
                {
            this.props.img ? 
            <img
            style={{ margin: "1%",borderRadius: "50%" }}
            className="img-avatar"
            width="25"
            height="25"
            src={this.props.img}
            alt=""
          /> :
          <img className="img-avatar" src={"https://www.gravatar.com/avatar/"+this.props.emailHash+"?d=retro&s=25"} alt=""/>
          }
                  <div style={{marginLeft: "1%"}}>{this.props.name} </div>
              </ListGroupItem>
        );
    }
}

export default GroupMemberItem;