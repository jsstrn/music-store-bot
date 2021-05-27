const Song = require('./Song')
const Album = require('./Album')
const Catalog = require('./Catalog')
const Invoice = require('./Invoice')

const catalog = require('../db/seed')

module.exports = {
    catalog,
    Song,
    Album,
    Catalog,
    Invoice,
}
