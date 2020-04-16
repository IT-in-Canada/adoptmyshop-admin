import React, { useState, useEffect } from 'react'
import axios from "axios";
import { Dropdown } from "react-bootstrap";

/**
 * this component queries for shops documents (those that need to be validated or puslished).
 * there are 2 possible APIs:
 *  - toValidate shops, or
 *  - to PublishShops
 * @param {*} props 
 */
export default function GetShops(props)  {
  const [shops, setshops] = useState("");
  const [errorMessage, seterrorMessage] = useState("");


  /**
   * it queries the API for all current shops
   * this component is going to receive a parameter that specifies what type of shop to query (Nominee to Validate or to Publish)
   */
  async function fetchData() {
    const url = props.type === "toValidate" ? "http://localhost:3333/toValidate" : "http://localhost:3333/toPublish";    
    try {
      const getShops = await axios.get( 
        url, 
        {  
          headers: { 
            "Content-Type": "application/json",
            "Authorization" : `Bearer ${props.user.token}`
          }
        },
      );

      if (getShops.data.count) {
        setshops(getShops.data.content);
      } else {
        throw getShops.data.message;
      }
    } catch(err) {
        seterrorMessage(err.message || err);
    }
  }


  useEffect(() => {    
    (fetchData());
  });


  const populateDropbox = () => {
    return(
      <Dropdown>
        <Dropdown.Toggle variant="success" id="dropdown-basic">
          {(props.shop && props.shop.name) || `Select Shop to be Validated` }
        </Dropdown.Toggle>

        <Dropdown.Menu>
          {shops.map( (shop, id) =>
            <Dropdown.Item 
              key = { id } 
              onClick = { (e) => changes(e, shop) }
              name = { shop.name }
            > { shop.name } </Dropdown.Item>
          )}
        </Dropdown.Menu>
      </Dropdown>
    );
  }


  const changes = (event, incommingShop) => {
    event.preventDefault();
    props.getShopInfo(incommingShop);
  }


  const returnErrorMessage = () => {
    return(errorMessage);
  };


  return (
    <div>
      { shops
        ? populateDropbox()
        : errorMessage
          ? returnErrorMessage()
          : "No shops to validate" }
    </div>
  )
}

