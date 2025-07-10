const { Product } = require("../../../models/ProductSchema");

const createProductController = async (req, res) => {
    try {
        const data = req.body;
        console.log("creating product...", data);

        Object.keys(data).forEach((key) => {
            if (data[key] == null || data[key] == "") {
                delete data.key;
            }
        });
        
        let newProduct = await Product.create(data);
        res.status(201).json({
            isSuccess: true,
            message: `Product created`,
            data: {
                product: newProduct,
            },
        });
    } catch (err) {
        if (err.name === "ValidationError" || err.code == "11000") {
            res.status(400).json({ isSuccess: false, message: `Err: ${err.message}`, data: {} });
        }
        console.log(" Error in createProductController");
        res.status(501).json({ isSuccess: false, message: "Internal Server Error", data: {} });
    }
};
const getAllProducts = async (req,res)=>{
    try {
        const allProducts = await Product.find();
        res.status(200);
        res.json({
            isSuccess: true,
            message: "products Fetched",
            data: {
                products: allProducts,
            },
        });
    } catch (err){
        console.log("---  error in get products ----");
        console.log(err.message);

        res.status(500);
        res.json({
            isSuccess: false,
            message: "Internal Server error",
            data: {},
        });
    }
}

const updateProductController = async (req,res) => {
    try{
        const {productId} = req.params;
        const newData = req.body;
        const newProduct = await Product.findByIdAndUpdate(productId, newData,{
            new: true, // this shows the latest data 
            runValidators: true, // this run the validators written in Schema on new data
        })
        if (newProduct === null){
            res.status(400);
            res.json({
                isSuccess: false,
                message: "Can't find Product",
                data: {},
            });
        }

        res.status(200);
        res.json({
            isSuccess: true,
            message: "Product Updated",
            data: {
                product: newProduct,
            },
        });
        console.log(newData);

    } catch(err) {
        console.log("---  error in update products ----");
        console.log(err.message);

        res.status(500);
        res.json({
            isSuccess: false,
            message: "Internal Server error",
            data: {},
        });
    }
}

const deleteProductController = async (req,res) => {
    try {
        const {productId} = req.params;
        const deletedId = await Product.findByIdAndDelete(productId);

        if (deletedId == undefined){
            res.status(400);
            res.json({
                isSuccess: false,
                message: "Can't find Item",
                data: {},
            });
        } else {

            res.status(204);
            res.json({
                isSuccess: true,
                message: "Product deleted",
                data: {
                    product: deletedId,
                },
            });
        }
    } catch (err) {
        console.log("---  error in delete products ----");
        console.log(err.message);

        res.status(500);
        res.json({
            isSuccess: false,
            message: "Internal Server error",
            data: {
                errMessage: err.message,
            },
        });
    }

}
module.exports = { createProductController, getAllProducts, updateProductController, deleteProductController};