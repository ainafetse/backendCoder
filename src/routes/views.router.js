const express = require("express");
const router = express.Router();
const ProductManager = require("../controllers/product-manager.js");
const productManager = new ProductManager("./src/models/products.json")

//Rutas
router.get ("/", async (req, res)=> {
      try{
        const products = await productManager.getProducts();
        res.render("index", {
          products : products
        });
      }catch(error) {
        console.error("Error getting the products", error);
        res.status(500).json({
          error: "Server Internal Error"
        });
      }
});

router.get("/contact", async (req, res) => {
  try {
      res.render("contact", {title: "Get in touch"});
  } catch (error) {
      res.status(500).json({
          error: "Server Internal Error"
      });
  }
})

router.get("/realtimeproducts", async (req, res) => {
  try {
      res.render("realtimeproducts", {title: "Real Time Products"});
  } catch (error) {
      res.status(500).json({
          error: "Error interno del servidor"
      });
  }
})

router.get("/chat", async (req, res) => {
  try {
      res.render("chat", {title: "Chat"});
  } catch (error) {
      res.status(500).json({
          error: "Server Internal Error"
      });
  }
})

module.exports = router;