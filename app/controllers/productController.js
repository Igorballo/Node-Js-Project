const Product = require('../models/product');

const getProduct = async (req, res) => {
    try {
        const products = await Product.find();
        return res.json({
            error: false,
            type: "success",
            message: "Product retrieved successfully",
            products: products
        });
    } catch (e) {
        return res.json({
            error: true,
            type: "error",
            message: e.toString()
        }, 500);
    }
}

const getProductById = async (req, res) => {
    try {
        const product = await Product.findOne({ _id: req.params.id });

        if (!product) {
            return res.status(404).json({
                error: true,
                type: "error",
                message: "Product non trouvé"
            });
        }

        return res.status(200).json({
            error: false,
            type: "success",
            message: "Product récupéré avec succès",
            product: product
        });
    } catch (e) {
        return res.status(500).json({
            error: true,
            type: "error",
            message: e.toString()
        });
    }
};

const saveProducts = async (req, res) => {
    try {
        const product = new Product;
        product.name = req.body.name;
        product.description = req.body.description;
        product.price = req.body.price;
        product.inStock = req.body.inStock;
        await product.save();

        return res.json({
            error: false,
            type: "success",
            message: "Product enrégstré avec succès",
            product: product
        });
    } catch (e) {
        return res.json({
            error: true,
            type: "error",
            message: e.toString()
        }, 500);
    }

}

const updateProducts = async (req, res) => {
    try {
        const product = await Product.findOne({ _id: req.params.id });
        if (!product) {
            res.status(404).json({
                error: true,
                message: "Product not found"
            });
            return;
        }

        product.name = req.body.name;
        product.description = req.body.description;
        product.price = req.body.price;
        product.inStock = req.body.inStock;
        await product.save();

        res.json({
            error: false,
            type: "success",
            message: "Product modifié avec succès",
            product: product
        });
    } catch (e) {
        res.status(500).json({
            error: true,
            type: "error",
            message: e.toString()
        });
    }
};

const deleteProducts = async (req, res) => {
    try {
        const product = await Product.findOne({ _id: req.params.id });
        if (!product) {
            res.status(404).json({
                error: true,
                message: "Product not found"
            });
            return;
        }

        await Product.deleteOne({ _id: req.params.id });

        res.json({
            error: false,
            type: "success",
            message: "Product supprimé avec succès",
        });
    } catch (e) {
        res.status(500).json({
            error: true,
            type: "error",
            message: e.toString()
        });
    }
};
module.exports = { getProduct, getProductById, saveProducts, updateProducts, deleteProducts }