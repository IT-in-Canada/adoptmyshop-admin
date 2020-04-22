import React, { useState, useRef } from 'react'
import Card   from "react-bootstrap/Card";
import Form   from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row    from "react-bootstrap/Row";
import Col    from "react-bootstrap/Col";

import GetShops from "./aux/GetShops.js";

import axios from "axios";


export default function Validate(props) {
  const { user } = props;

  /** cons dataStructure = [{
  "shop": {
      "name": "3 Quarters Full Cafe",
      "address": "1789 Comox Street",
      "city": "Vancouver",
      "country": "CA",
      "phone": "123123",
      "description": "It may be called 3 Quarters Full, ...",
      "tags": ["delivery", "pickup","taiwaneese"],
      "active": true,
      "featured_image": "",
      "images": [],
      "support_options": [{
          "type": "gitfcard",
          "link": "https://www.instagram.com/3quartersfullcafe/"
      },{
          "type": "online_order",
          "link": "https://www.instagram.com/p/B97b-E9hBOg/"
      }]
  }
}]*/
  // ];

  const dataStructure = [
    "name",
    "address",
    "city",
    "country",
    "phone",
    "description",
    "tags",
    "active",
    "featured_image",
    "images",
  ];

  const nameRef         = useRef(null);
  const addressRef      = useRef(null);
  const cityRef         = useRef(null);
  const phoneRef        = useRef(null);
  const countryRef      = useRef(null);
  const descriptionRef  = useRef(null);

  // setting the variables to handle shop's data
  const [
    {
      name, 
      address, 
      city,
      country,
      phone,
      description
    }, setState] = useState({
      name: "", address: "", city: "", country: "", phone: "", description: ""});
      

  // function to handle the changes on the form.controlls
  const handleChange = ({target: {name, value}}) => {
    setState(prevState => ({ ...prevState, [name]: value }));
  };

  // variable to hold shop info and pass to the GetShop component
  const [shop, setshop] = useState("")

  // it can be set as either successMessage or failMessage (this is a CSS classname)
  const [classNameMessage, setclassNameMessage] = useState("");

  // a status message shown after a submit, or when trying to procedee one
  const [submitMessage, setsubmitMessage] = useState("");


  // function to clean the form and the message
  const clearForm = (cleanScreen) => {
    setTimeout(() => {

      // it cleans up all values for the data structure
      const cleanValues = Object.values(dataStructure);
      cleanValues.forEach(item => setState(prevState =>
        ({ ...prevState, [item]: "" })
      ));
      
      cleanScreen && setshop("");
      setsubmitMessage("");
    }, 1500);
  };


  const clearMessage = () => {
    setTimeout(() => {
      setsubmitMessage("");
    }, 1500);
  };


  // it is called by the submit button
  const handleSubmit = async(event) => {
    event.preventDefault();
    nameRef.current.focus();

    if (!name) {    // add more validations
      setsubmitMessage("Please, fill the form accordingly.");
      setclassNameMessage("message-success");
      clearMessage();
    } else {  // call API to register a new shop on shop's collection
      // this is a temp API for test purpose
      const url = "http://localhost:3333/toValidate";

      try {
        const postShops = await axios.post(
          url, 
          {  
            headers: { 
              "Content-Type": "application/json",
              "Authorization" : `Bearer ${props.user.token}`
            }
          },
        );
        
        if (postShops.data.count) {
          //if procedure is okay:
          setclassNameMessage("message success");
          setsubmitMessage("Nominee Shop has been validated.");
          // setshop("");
          clearForm(true);
          // window.location.reload(true);
          clearForm(true);
        } else {
          throw(postShops.data.err);
        }
      } catch(err) {
          setclassNameMessage("message fail");
          setsubmitMessage(err.message);
          clearMessage();
      }

    }
  };


  /**
   * method to receive data from GetShops componenet and fullfil the form with shop's data
   * @param {*} shop 
   */
  const getShopInfo = shop => {    
    // it cleans up all values for the data structure
    const cleanValues = Object.values(dataStructure);
    cleanValues.forEach(item => setState(prevState =>
      ({ ...prevState, [item]: "" })
    ));

    // it loads the new values coming from GetShops component
    const setValues = Object.entries(shop);
    setValues.forEach(item => setState(prevState =>
      ({ ...prevState, [item[0]]: [item[1]] })
    ));

    setshop(shop);
  };



  return (
    <div className="formPosition">
      <Card className="cardSettings">
        <Card.Header>
          <h2>New Shop to be Validated</h2>
        </Card.Header>
        <br />

        <div className="gridShopBtContainer">
          <GetShops
            shop        = { shop}
            user        = { user}
            type        = { "toValidate"}
            getShopInfo = { getShopInfo}
          />
        </div>
  
        { shop &&
          <Form
            autoComplete  = {"off"}
            className     = "formPosition"
            style         = {{width: "50rem"}}
            onSubmit      = { handleSubmit}
          >

            <Form.Group as={Row} controlId="formName">
              <br />
              <Form.Label column sm="2" className="cardLabel">Shop's Name</Form.Label>
              <Col sm="10">
                <Form.Control
                  autoFocus   = {true}
                  type        = "text"
                  placeholder = "* Shop's name"
                  name        = "name"
                  onChange    = { handleChange}
                  // onChange    = { e => setname(e.target.value)}
                  value       = { name}
                  ref         = { nameRef}
                />
              </Col>
            </Form.Group>

            <Form.Group as={Row} controlId="formAddress">
              <br />
              <Form.Label column sm="2" className="cardLabel">Address</Form.Label>
              <Col sm="10">
                <Form.Control
                  type        = "text"
                  placeholder = "* Shop's Address"
                  name        = "address"
                  onChange    = { handleChange}
                  // onChange    = { e => setaddress(e.target.value)}
                  value       = { address}
                  ref         = { addressRef}
                />
              </Col>
            </Form.Group>

            <Form.Group as={Row} controlId="formCity">
              <br />
              <Form.Label column sm="2" className="cardLabel">City</Form.Label>
              <Col sm="10">
                <Form.Control
                  type        = "text"
                  placeholder = "* Shop's City"
                  name        = "city"
                  onChange    = { handleChange}
                  value       = { city}
                  ref         = { cityRef}
                />
              </Col>
            </Form.Group>

            <Form.Group as={Row} controlId="formCountry">
              <br />
              <Form.Label column sm="2" className="cardLabel">Country</Form.Label>
              <Col sm="10">
                <Form.Control
                  type        = "text"
                  placeholder = "* Country"
                  name        = "country"
                  onChange    = { handleChange}
                  value       = { country}
                  ref         = { countryRef}
                />
              </Col>
            </Form.Group>

            <Form.Group as={Row} controlId="formPhone">
              <br />
              <Form.Label column sm="2" className="cardLabel">Phone</Form.Label>
              <Col sm="10">
                <Form.Control
                  type        = "text"
                  placeholder = "* Phone"
                  name        = "phone"
                  onChange    = { handleChange}
                  value       = { phone}
                  ref         = { phoneRef}
                />
              </Col>
            </Form.Group>

            <Form.Group as={Row} controlId="formDescription">
              <br />
              <Form.Label column sm="2" className="cardLabel">Description</Form.Label>
              <Col sm="10">
                <Form.Control
                  as          = "textarea"
                  rows        = "3"
                  placeholder = "* something to be considered and recorded about this company...."
                  name        = "description"
                  onChange    = { handleChange}
                  value       = { description}
                  ref         = { descriptionRef}
                />
              </Col>
            </Form.Group>

            <Form.Group as={Row} controlId="formMore">
              <br />
              <Form.Label column sm="3" className="cardLabel">...more fields</Form.Label>
              {/* <Col sm="10">
                <Form.Control
                  as          = "textarea"
                  rows        = "3"
                  placeholder = "something to be considered and recorded about this company...."
                  name        = "description"
                  onChange    = { handleChange}
                  value       = { description}
                  ref         = { descriptionRef}
                  // onKeyPress  = {this.handleChange}
                />
              </Col> */}
            </Form.Group>

            <br />
            <Card.Footer className= { classNameMessage}>          
                { submitMessage
                  ? submitMessage
                  : <br /> }
              </Card.Footer>

            <br />
            <div className="d-flex flex-column">
              <Button
                // disabled  = { disabledBtn}
                variant   = "primary" 
                type      = "submit" 
              >
                Proceed Shop's Validation
              </Button>
            </div>

          </Form>
        }
      </Card>

    </div>
  )
}
