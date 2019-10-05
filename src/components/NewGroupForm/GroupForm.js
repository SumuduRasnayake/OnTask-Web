import React, { useState } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import useForm from "../../utils/useForm";
import { withRouter } from "react-router-dom";
import { SearchAlt2 } from "styled-icons/boxicons-regular/SearchAlt2";
import InputGroup from "react-bootstrap/InputGroup"
import SENDER from "../../utils/SENDER";
import MemberSearchItem from "../MemberSearchItem";

const GroupForm = props => {
  const { values, handleChange, handleSubmit } = useForm(createNewGroup);
  const groupMembers = [];
  const [trig,setTrig] = useState(true)
  const [searchResults,setSearchResults] = useState([])
  const [NOfChars, setNOfChars] = useState(160);

  const handleMemberSearch = e => {
    if(e.target.value){
      SENDER.get('/user/search/'+e.target.value).then(
        res => {
          let result = res.data

          for (var i = 0, len = groupMembers.length; i < len; i++) { 
            for (var j = 0, len2 = result.length; j < len2; j++) { 
                if (groupMembers[i].userId === result[j].userId) {
                    result.splice(j, 1);
                    len2=result.length;
                }
            }
        }

        console.log(result)  
        setSearchResults(result)
        }
      ).catch(err => console.log(err))
    }
    else{
      setSearchResults([])
    }
  }

  function addMember(data){
      console.log(data)
      const newSR = searchResults.filter(function(value, index, arr){

        return value !== data;
    
    });
    setSearchResults(newSR)
    groupMembers.push(data)
      setTrig(!trig)
      console.log([...groupMembers])
    }


  function createNewGroup(e) {
    e.preventDefault();
    SENDER.post("/groups", {
      userId: localStorage.getItem('id'),
      name: values.name,
      description: values.description,
      members: groupMembers.map( member => member.userId)
    })
      .then(res => {
        if (res.status === 200) {
          props.handleClose();
          props.history.push('/groups/'+res.data)
          window.location.reload()
        }
      })
      .catch(err => {
        alert("There was an error.Please try again")
        console.log(err)
      });
  }

  const handleDesChange = e => {
    if (e.target.value.length === 160) {
      e.preventDefault();
    }
    setNOfChars(160 - e.target.value.length);
  };

  const handleKeyDown = event => {
    if (event.key === 'Enter' && event.shiftKey === false) {
      event.preventDefault();
    }
  };

  return (
    <>
      <Row>
        <Col sm={6}>
          <Form onSubmit={handleSubmit} onKeyDown={e => { handleKeyDown(e) }}>
            <Form.Group>
              <label>Name</label>
              <Form.Control required name="name" onChange={handleChange} />
            </Form.Group>

            <Form.Group>
              <label>Description</label>
              <Form.Control
                as="textarea"
                maxLength="160"
                name="description"
                rows={5}
                onKeyPress={handleDesChange}
                onChange={handleChange}
              />
              <Form.Text>{NOfChars}/160 characters left</Form.Text>
            </Form.Group>
          </Form>
        </Col>
        <Col sm={6}>
          <p style={{marginBottom: "2.5%"}}>
            <b>Add members</b>
          </p>
          <InputGroup>
            <Form.Control
              type="text"
              onChange={handleMemberSearch}
              placeholder="Search"
              aria-describedby="inputGroupPrepend"
            />
            <InputGroup.Append style={{cursor: "pointer"}}>
              <InputGroup.Text id="inputGroupPrepend">
               <SearchAlt2 size={20} /> 
              </InputGroup.Text>
            </InputGroup.Append>
          </InputGroup>
          <div className="selected" style={{paddingTop: "2%"}}>
          {groupMembers ? groupMembers.map( result => {
              const lname = result.lname ? result.lname : " "
              return <MemberSearchItem
                key={result.userId}
                data={result}
                selected={true}
                name={result.fname+" "+lname}
              ></MemberSearchItem>
            }): <></>}
          </div>
          <div className="search_results" style={{paddingTop: "2%"}}> 
            {searchResults.map( result => {
              const lname = result.lname ? result.lname : ""
              return <MemberSearchItem
                key={result.userId}
                data={result}
                selectMember={addMember}
                name={result.fname+" "+lname}
              ></MemberSearchItem>
            })}
          </div>
        </Col>
      </Row>
      <Modal.Footer>
      {/* eslint-disable-next-line */}
        <a
          href=""
          style={{ textDecoration: "none", color: "red" }}
          onClick={props.handleClose}
        >
          Cancel
        </a>
        <Button variant="success" onClick={createNewGroup}>
          Create Group
        </Button>
      </Modal.Footer>
    </>
  );
};

export default withRouter(GroupForm);
