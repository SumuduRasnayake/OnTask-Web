import React, { useState } from "react";
import useForm from "../../../utils/useForm";
import SENDER from "../../../utils/SENDER";
import { Row, Col, Input, Button, Form } from "reactstrap";
import IntlTelInput from "react-bootstrap-intl-tel-input";

const styles = {
  column: {
    display: "flex",
    alignItems: "center",
  },
  label: { marginRight: "2%", marginTop: "2%" },
  cont: {
    display: "flex",
    height: "6vh",
    flexDirection: "row",
    width: "100%",
  }
};

const ContactInfoSettings = props => {
  const { values, handleChange, handleSubmit } = useForm(updateContactInfo);
  const [mobile, setMobile] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [errMsg, setErrMsg] = useState("");

  function updateContactInfo() {
    SENDER.post("/user/contact", {
      userId: localStorage.getItem("id"),
      mobile: mobile.replace(/-/g, ""),
      email: values.email,
    })
      .then(res => {
        setErrMsg("")
        setSuccessMsg("Contact info updated successfully.");
        props.onUpdate();
      })
      .catch(err => {
        setSuccessMsg("")
        setErrMsg("An error occured. Please try again.")
        console.log(err)
      });
  }

  return (
    <>
      <h5>Contact Info</h5>
      <div style={{display: successMsg || errMsg ? "block" : "none"}}>
        <p style={{display: successMsg ? "block" : "none",color: "green"}}>{successMsg}</p>
        <p style={{display: errMsg ? "block" : "none",color: "red"}}>{errMsg}</p>
      </div>
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col style={styles.column} sm={12} md={5}>
            <div style={styles.cont}>
              <p style={styles.label}>mobile</p>
              <IntlTelInput
                preferredCountries={["LK"]}
                defaultCountry={"LK"}
                defaultValue={"+1 555-555-5555"}
                onChange={mobi => setMobile(mobi.intlPhoneNumber)}
              />
            </div>
          </Col>
          <Col style={styles.column} sm={12} md={5}>
            <div style={styles.cont}>
              <p style={styles.label}>email</p>
              <Input
                name="email"
                placeholder=""
                type="email"
                onChange={handleChange}
              ></Input>
            </div>
          </Col>
          <Col>
            <Col style={styles.column} sm={12} md={2}>
              <Button color="success" type="submit">
                Update
              </Button>
            </Col>
          </Col>
        </Row>
      </Form>
    </>
  );
};

export default ContactInfoSettings;
