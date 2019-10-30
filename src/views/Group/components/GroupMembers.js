import React, { useEffect, useState } from 'react';
import { Card, CardBody, CardHeader, ListGroupItem} from 'reactstrap'
import MemberItem from '../../../components/GroupMemberItem'
import SENDER from "../../../utils/SENDER";

const GroupMembers = props => {
    const [admins,setAdmins] = useState([])
    const [members,setMembers] = useState([])

    useEffect( () => {
        SENDER.get(`/member/${props.groupId}/admin`)
      .then(res => {
        setAdmins(res.data)
      })
      .catch(err => console.log(err));

      SENDER.get(`/member/${props.groupId}`)
      .then(res => {
        setMembers(res.data)
      })
      .catch(err => console.log(err));

    },[props.groupId])

    return (
        <Card style={{ padding: 0,margin: 0, height: "84vh" }}>
        <CardBody style={{ padding: 0 }}>
          <CardHeader>
            <b>Admins</b>
          </CardHeader>
          {admins.map(admin => {
            const lname = admin.lname ? admin.lname : "";
            return (
              <MemberItem
                userId={admin.userId}
                groupId={props.groupId}
                m_role="admin"
                isAdmin={props.isAdmin}
                key={admin.fname}
                img={admin.propicURL}
                emailHash={admin.emailHash}
                name={admin.fname + " " + lname}
              />
            );
          })}
          <CardHeader>
            <b>Members</b>
          </CardHeader>
          {members.length > 0 ? (
           members.map(member => {
              const lname = member.lname ? member.lname : "";
              return (
                <MemberItem
                  userId={member.userId}
                  groupId={props.groupId}
                  isAdmin={props.isAdmin}
                  m_role="member"
                  key={member.fname}
                  emailHash={member.emailHash}
                  img={member.propicURL}
                  name={member.fname + " " + lname}
                />
              );
            })
          ) : (
            <ListGroupItem>
              <div className="text-center">
                No members.Invite someone to join the group
              </div>
            </ListGroupItem>
          )}
        </CardBody>
      </Card>
    );
};

export default GroupMembers;