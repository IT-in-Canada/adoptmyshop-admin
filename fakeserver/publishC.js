
const getPublish = (req, res) => {
  const shopsToValidate = [
    {
      name    : "first shop",
      city    : "Vanbcouver",
      address : "somewhere"
    },
    {
      name    : "seconD",
      city    : "VAN",
      phone   : "123-456-7890"
    },
    {
      name: "3 Quarters Full Cafe",
      address: "1789 Comox Street",
      city: "Vancouver",
      country: "CA",
      phone: "123123",
      description: "It may be called 3 Quarters Full, ...",
      tags: ["delivery", "pickup","taiwaneese"],
      active: true,
      featured_image: "",
      images: [],
      support_options: [{
          type: "gitfcard",
          link: "https://www.instagram.com/3quartersfullcafe/"
      },{
          type: "online_order",
          link: "https://www.instagram.com/p/B97b-E9hBOg/"
      }]
    }
  ];

  return res.send({
    count   : shopsToValidate.length,
    message : "success",
    content : shopsToValidate
  });
}


const postPublish = (req, res) => {
  // set true for success OR false to fail
  const condition = false;

  return(condition 
    ? res.json({
        count   : 1,
        message : "success",
        content : "post Validated"
      })
    : res.json({
        count   : 0,
        err     : { message : "fail"},
        content : "ERROR"
      })
  );
};


module.exports = {
  getPublish,
  postPublish
};