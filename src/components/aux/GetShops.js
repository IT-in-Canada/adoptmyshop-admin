import React, { useState, useEffect } from 'react'
import axios from "axios";
import { Dropdown } from "react-bootstrap";

const tempShops = [
  {
    name: "first shop",
    city: "Vanbcouver"
  },
  {
    name: "seconD",
    city: "VAN"
  }
];

/**
 * this componenet queries for shops documents
 * there are 2 possible APIs:
 *  - toValidate shops, or
 *  - to PublishShops
 * @param {*} props 
 */
export default function GetShops(props)  {

    const [shops, setshops] = useState("");
    const [errorMessage, seterrorMessage] = useState("");


  useEffect(async() => {
    /**
     * it queries the API for all current shops
     * this component is going to receive a parameter that specifies what type of shop to query (Nominee to Validate or to Publish)
     */
    
    /*
    const url = props.type === "toValidate" ? "/API_toValidate" : "/API_toPublish";
    
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
          //proceed accordingly
        }
      } catch(err) {
          //proceed accordingly
          seterrorMessage(err.message);
      }
    */
      setshops(tempShops);
      // setshops("");
    }, []);


    const populateDropbox = () => {
    return(
      <Dropdown>
        <Dropdown.Toggle variant="success" id="dropdown-basic">
          {(props.shop && props.shop.name) || `Select Shop` }
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


  return (
    <div>
      { shops
        ? populateDropbox()
        : errorMessage
          ? props.errorMsg(errorMessage)
          : "No shops to validate" }
    </div>
  )
}

