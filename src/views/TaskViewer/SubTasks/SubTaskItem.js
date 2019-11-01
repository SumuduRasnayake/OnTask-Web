import React from 'react';
import { Input,ListGroupItem } from 'reactstrap'
import SENDER from '../../../utils/SENDER'

const SubTaskItem = props => {

    function handleChange(e,id){
        //alert(e.target.checked)
        SENDER.post('/subtasks/'+id+"/"+e.target.checked).then(
            res => {
                props.notifySubtaskStatusChange()
            }
        ).catch(err => console.log(err))
    }    

    return (
        <ListGroupItem action style={{display: "flex",flexDirection: "row",alignItems: "center",minHeight: "4vh"}}>
            <Input onChange={e => handleChange(e,props.id)} style={{margin: 0}} type="checkbox" defaultChecked={props.isComplete} id="checkbox2" />
        <h6 style={{margin: "0% 0% 0% 5%"}}>{props.name}</h6>
</ListGroupItem>
    );
};

export default SubTaskItem;