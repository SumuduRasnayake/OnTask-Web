import React, { useEffect, useState } from "react";
import SENDER from '../../utils/SENDER'
import { Clock } from "styled-icons/feather/Clock";
import {Github} from 'styled-icons/boxicons-logos/Github'
import ProfilePicture from '../../components/ProfilePicture'
import {Link2} from 'styled-icons/feather/Link2'
import {ScLinkedin} from 'styled-icons/evil/ScLinkedin'
import {StackOverflow} from 'styled-icons/fa-brands/StackOverflow'
import { Row, Col, Card, CardBody } from "reactstrap";
import EducationItem from './EducationItem'
import WorkItem from './WorkItem'

const UserProfile = props => {
  const [userData,setUserData] = useState([])
  const [lname,setLName] = useState("")
  const [education,setEducation] = useState([])
  const [work,setWork] = useState([])

  useEffect(
      () => {
            SENDER.get("/users/" + props.id).then(res => {
              setUserData(res.data);
              setLName(res.data.lname ? res.data.lname: "")  
            });

            SENDER.get('/users/'+props.id+'/education').then(
              res => {
                console.log("Education: ")
                console.log(res.data)
                setEducation(res.data)
              })

              SENDER.get('/users/'+props.id+'/work').then(
                res => {
                  console.log("Work: ")
                  console.log(res.data)
                  setWork(res.data)
                })
      },[]
  )
  return (
    <>
      <Row>
      <Col sm="6" md="3" xs="10" lg="3">
      <ProfilePicture id={props.id}/>
      </Col>
      <Col  sm="12" md="9" xs="12" lg="9">
        <Row>
        <Col sm="6" lg="8" className="middle_column">
      <h3>{(userData.fname ? userData.fname:"") + " "+ (lname ? lname :" ")}</h3>
      {userData.bio ? userData.bio :  localStorage.getItem('id') === props.id ? <h6>Your <i>About me</i> is empty</h6> : ""}
      </Col>
      <Col sm="6" lg="4">
          <div style={{display: "flex",flexDrection: "row"}}>
            <div></div>
            <div></div>
          </div>
          <Card className="border-light">
              <CardBody style={{padding: 0,paddingRight: "3%",paddingLeft: "3%",display: userData.email ? "flex" : "none",flexDirection: "column"}}>
              <div style={{display: "flex",flexDirection: "row",alignItems: "center"}}>
              <i className="fa fa-envelope" style={{fontSize: "20px"}}/>
              <p style={{margin: "0.5%",marginLeft: "1.5%"}}>{userData.email}</p>
              </div>                         
              <div style={{display: userData.mobile ? "flex" : "none",flexDirection: "row",alignItems: "center"}}>
              <i className="fa fa-phone" style={{fontSize: "20px"}}></i>
              <p style={{margin: "0.5%",marginLeft: "1.5%"}}>{userData.mobile}</p>
              </div>
              <div style={{display: "flex",flexDirection: "row",alignItems: "center"}}>
              <i className="fa fa-map-marker" style={{fontSize: "20px"}}></i>
              <p style={{margin: "0.5%",marginLeft: "1.5%"}}>Sri Lanka</p>
              </div>
              <div style={{display: "flex",flexDirection: "row",alignItems: "center"}}>
              <Clock size={15} />
              <p style={{margin: "0.5%",marginLeft: "1.5%"}}>Member for 2 years</p>
              </div>
              <div style={{display: userData.githubLink ? "flex": "none",flexDirection: "row",alignItems: "center"}}>
              <Github size={15} />
              <a href={userData.githubLink} target="_blank" style={{margin: "0.5%",marginLeft: "1.5%",color: "black"}}>{userData.githubLink}</a>
              </div>
              <div style={{display:  userData.websiteLink ? "flex" : "none",flexDirection: "row",alignItems: "center"}}>
              <Link2 size={15} />
              <a href={userData.websiteLink} target="_blank" style={{margin: "0.5%",marginLeft: "1.5%",color: "black"}}>{userData.websiteLink}</a>
              </div>
              <div style={{display:  userData.linkedInLink ? "flex" : "none",flexDirection: "row",alignItems: "center"}}>
              <ScLinkedin size={25} />
              <a href={userData.linkedInLink} target="_blank" style={{margin: "0.5%",marginLeft: "1.5%",color: "black"}}>{userData.linkedInLink}</a>
              </div>
              </CardBody>
          </Card>
      </Col>
        </Row>
        <Card style={{padding: "1%",marginBottom: "1%",marginTop: "1%",display: "flex",backgroundColor: "#1FDC75",flexDirection: "row",alignItems: "center"}}>
      <i className="fa fa-briefcase"></i>
      <h5>Work</h5>
      </Card>
      {work.length > 0 ? work.map( WItem => 
            <WorkItem 
              title={WItem.title}
              w_place={WItem.place}
              from={WItem.startDate}
              to={WItem.endDate}
              description={WItem.description}
            />) :(
              <Card style={{display: "flex",color: "gray",justifyContent: "center",height: "10vh",alignItems: "center"}}>
                <h6>No workplaces to show</h6>
            </Card>
            ) }

    <Card style={{padding: "1%",marginBottom: "1%",display: "flex",backgroundColor: "#1FDC75",flexDirection: "row",alignItems: "center"}}>
        <i className="fa fa-graduation-cap"></i>
          <h5>Education</h5>
        </Card>
        { education.length > 0 ? education.map( EduItem => 
            <EducationItem 
              institute={EduItem.institute}
              from={EduItem.startDate}
              to={EduItem.endDate}
              description={EduItem.description}
            />): (
              <Card style={{display: "flex",color: "gray",justifyContent: "center",height: "10vh",alignItems: "center"}}>
              <h6>No Education to show</h6>
          </Card>
            )}
      </Col>
    </Row>


    </>
  );
};

export default UserProfile;
