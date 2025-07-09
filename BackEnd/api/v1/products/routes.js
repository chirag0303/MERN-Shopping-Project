const express = require("express");
const {createProductController, getAllProducts, updateProductController, deleteProductCOntroller} = require("./controller.js");

const productRouter = express.Router();

// productRouter.get("/",(req,res)=>{
//     res.json({
//         isSuccess: true,
//         message: "Product List fetched",
//         data: {},
//     });
// });
productRouter.post("/",createProductController);
productRouter.get("/",getAllProducts);
productRouter.patch("/:productId",updateProductController);
productRouter.delete("/:productId", deleteProductCOntroller);

module.exports = {productRouter};