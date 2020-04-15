import React, { useState, useEffect } from 'react'
// import axios from "axios";
import { Dropdown } from "react-bootstrap";

const tempShops = [
  {
    name: "first shop",
    city: "Vanbcouver",
  },
  {
    name: "seconD",
    city: "VAN"
  },
  {
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
];

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


  // useEffect(async() => {
    useEffect(() => {
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

    if (1)
      setshops(tempShops);
    else
      seterrorMessage("not possible for a random reason")
    }, []);


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

