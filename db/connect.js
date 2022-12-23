const mongoose = require('mongoose')
const connectDB = (url) => {
    return mongoose
        .set('strictQuery', false)
        .connect(url)
        // .then(() => console.log('connected to db'))
        // .catch(err => console.log(err))
}

module.exports = connectDB