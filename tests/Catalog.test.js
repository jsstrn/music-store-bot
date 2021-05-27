const { catalog } = require('../models')

describe('Catalog', () => {
  it('gets an album with correct title', () => {
    const album = catalog.getAlbumByTitle('The Music Album')

    expect(album.title).toEqual('The Music Album')
  });

  it('gets all artists for an album', () => {
    const album = catalog.getAlbumByTitle('The Music Album')

    expect(album.artists).toEqual(new Set(['Subtash']))
  });

  it('gets correct price for an album', () => {
    const album = catalog.getAlbumByTitle('The Music Album')

    expect(album.price).toEqual(2000)
  });
});
