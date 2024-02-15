const express = require("express");
const router = express.Router();

//Array
const arrayProducts = [
    {
        id: 1,
        title: "Hat",
        description: "This is a hat. Wow. Cool. A hat.",
        price: 600,
        thumbnail: "https://placekitten.com/200/300",
        code: "abc123",
        stock: 30
      },
      {
        id: 2,
        title: "Hoodie",
        description: "This is a hoodie. Wow. Cool. A hoodie.",
        price: 1400,
        thumbnail: "https://placekitten.com/200/300",
        code: "abc124",
        stock: 40
      },
      {
        id: 3,
        title: "Skirt",
        description: "This is a skirt. Wow. Cool. A skirt.",
        price: 1250,
        thumbnail: "https://placekitten.com/200/300",
        code: "abc125",
        stock: 10
      },
]

//Rutas
router.get ("/", (req, res)=> {
    const user = {
        name:"BoJack",
        lastname: "Horseman",
        over18: true,
    }
    res.render("index", {user, arrayProducts, title: "Products"});
});

router.get ("/contact", (req, res) => {
    res.render("contact", {title: "Get in touch"});
});

router.get ("/realtimeproducts", (req, res) => {
  res.render("realTimeProducts", {title: "Real Time Products"});
});

router.get ("/chat", (req, res) => {
  res.render("chat", {title: "Chat"});
});

module.exports = router;