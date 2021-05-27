const Song = require('../models/Song')
const Album = require('../models/Album')
const Catalog = require('../models/Catalog')
const { v4: uuid } = require('uuid');
const albums = require('../db/albums')

const createSongsFromAlbum = (songs) => {
  return songs.map(({ title, artist, price, url }) => {
    return new Song({
      id: uuid(),
      title,
      artist,
      price,
      url
    })
  })
}

const collection = albums.map(({ title, cover, songs }) => {
  return new Album({
    id: uuid(),
    title,
    cover,
    songs: createSongsFromAlbum(songs)
  })
})

const catalog = new Catalog({ albums: collection })

module.exports = catalog