const express = require("express")
const router = express.Router();
const upload = require("../config/multer-config");
const productModel = require("../models/product-model");

router.get("/",function (req,res) {
    res.send("Hey It's working 2!!!")
})

if (process.env.NODE_ENV === "development") {
router.post("/create", upload.single("image"), async function (req,res) {

    try{
    let {image,name,price,discount,bgcolor,panelcolor,textcolor} = req.body;
    let product = await productModel.create({
        image: req.file.buffer,
        name,
        price,
        discount,
        bgcolor,
        panelcolor,
        textcolor
    });

    req.flash("success", "Product created successfully")
    res.redirect("/owners/admin")
    } catch (err) {
       res.send(err.message);
    }
})
}

router.get("/admin", function (req,res) {
    let success = req.flash("success");
    res.render("createproducts", { success })
})

module.exports = router