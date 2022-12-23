const Product = require('../models/product')

const getAllProductsStatic = async (req, res) => {
    // const products = await Product.find({ name: { $regex: 'ab', $options: 'i' } })
    const products = await Product.find({}).sort('-name price')
    res.status(200).json({ products, nbHits: products.length })
}
const getAllProducts = async (req, res) => {
    // const products = await Product.find(req.query)
    const { name, featured, company, sort } = req.query
    queryObject = {}
    if (name) {
        queryObject.name = { $regex: name, $options: 'i' }
    }
    if (company) {
        queryObject.company = company
    }
    if (featured) {
        queryObject.featured = featured === 'true' ? true : false
    }
    let result = Product.find(queryObject)
    if (sort) {
        const sortList = sort.split(',').join(' ')
        result = result.sort(sortList)
    }
    else {
        result = result.sort('createdAt')
    }
    const products = await result
    res.status(200).json({ products, nbHits: products.length })
}

module.exports = {
    getAllProductsStatic,
    getAllProducts,
}