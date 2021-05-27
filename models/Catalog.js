class Catalog {
    constructor({albums = []}) {
        this._albums = albums
    }

    get albums() {
        return this._albums
    }

    getAlbumById(id) {
        return this.albums.find(a => a.id === id)
    }

    getAlbumByTitle(title) {
        return this.albums.find(a => a.title === title)
    }
}

module.exports = Catalog
