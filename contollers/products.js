const Product = require('../models/product')
const { options } = require('../routes/products')

const getAllProductsStatic = async (req, res) => {
    // const products = await Product.find({ name: { $regex: 'ab', $options: 'i' } })
    const products = await Product.find({}).sort('-name price').select('name price').limit(10)
    res.status(200).json({ products, nbHits: products.length })
}
const getAllProducts = async (req, res) => {
    // const products = await Product.find(req.query)
    const { name, featured, company, sort, fields, numericFilters } = req.query
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

    if (numericFilters) {
        const operatorMap = {
            '>': '$gt',
            '>=': '$gte',
            '<': '$lt',
            '<=': '$lte',
            '=': '$eq',
        }
        const regEx = /\b(<|>|<=|>=|=)\b/g
        const options = ['price', 'rating']
        let filters = numericFilters.replace(regEx, (match) => `-${operatorMap[match]}-`)
        filters = filters.split('.').forEach(item => {
            const [field, operator, value] = item.split('-')
            if (options.includes(field)) {
                queryObject[field] = { [operator]: Number(value) }
            }
        })
    }

    let result = Product.find(queryObject)

    // sort
    if (sort) {
        const sortList = sort.split(',').join(' ')
        result = result.sort(sortList)
    }
    else {
        result = result.sort('createdAt')
    }

    // select
    if (fields) {
        const fieldsList = fields.split(',').join(' ')
        result = result.select(fieldsList)
    }

    // page limit skip
    const page = Number(req.query.page) || 1
    const limit = Number(req.query.limit) || 10
    const skip = (page - 1) * limit

    result = result.skip(skip).limit(limit)

    const products = await result
    res.status(200).json({ products, nbHits: products.length })
}

module.exports = {
    getAllProductsStatic,
    getAllProducts,
}