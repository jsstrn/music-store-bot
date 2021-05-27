class Album {
    constructor({ id, title, cover, songs = [] }) {
        this._id = id
        this._title = title
        this._cover = cover
        this._songs = songs
    }

    get id() {
        return this._id
    }

    get title() {
        return this._title
    }

    get name() {
        return this._title
    }

    get artists() {
        const artists = this.songs.map(s => s.artist)
        return new Set(artists)
    }

    get cover() {
        return this._cover
    }

    get price() {
        return this.songs.reduce((a, b) => {
            return {price: a.price + b.price}
        }).price
    }

    get songs() {        
        return this._songs
    }

    get songCount() {
        return this._songs.length
    }
}

module.exports = Album