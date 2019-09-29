import React, {useState} from "react";
import useForm from "../../utils/useForm";
import SENDER from "../../utils/SENDER";
import { Row, Col, Input, Button,Form } from "reactstrap";
import IntlTelInput from "react-bootstrap-intl-tel-input";

const ContactInfoSettings = props => {
  const { values, handleChange, handleSubmit } = useForm(updateContactInfo);
  const [mobile,setMobile] = useState("")

  function updateContactInfo() {
     SENDER.post('/user/contact',{
         userId: localStorage.getItem('id'),
         mobile: mobile.replace(/-/g,""),
         email: values.email
    }).then(res => {
      alert("Contact info updated");
    }).catch(err => console.log(err))
  }

  return (
    <>
      <h5>Contact Info</h5>
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col>
            mobile
            <IntlTelInput
        preferredCountries={["LK"]}
        defaultCountry={"LK"}
        defaultValue={"+1 555-555-5555"}
        onChange={mobi => setMobile(mobi.intlPhoneNumber)}
      />
          </Col>
          <Col>
            email address
            <Input name="email" placeholder="" type="email" onChange={handleChange}></Input>
          </Col>
          <Col>
          <Button color="success" style={{ marginTop: "5%" }} type="submit">
            Update
          </Button>
        </Col>
        </Row>
      </Form>
    </>
  );
};

export default ContactInfoSettings;
