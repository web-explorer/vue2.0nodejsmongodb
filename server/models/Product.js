var mongoose = require('mongoose');
var productsSchema = require('./../schemas/products');

module.exports = mongoose.model('Product', productsSchema);
