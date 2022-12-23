

const getAllProductsStatic = async (req, res) => {
    res.status(200).json({ msg: 'getAll testing route' })
}
const getAllProducts = async (req, res) => {
    res.status(200).json({ msg: 'getAll' })
}

module.exports = {
    getAllProductsStatic,
    getAllProducts,
}