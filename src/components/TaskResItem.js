import React from 'react'
import { ListGroupItem } from 'reactstrap'

const TaskResItem = props => {
    return(
        <ListGroupItem action style={{padding: "1%"}} tag="a" href={props.src}>
            <h6><b>{props.name}</b></h6>
            <h6 style={{fontSize: "0.9em"}}>added by <b>{props.addedBy}</b> on <b>{props.cdate}</b></h6>
            </ListGroupItem>
    )
}

export default TaskResItem