class Song {
    constructor({title, artist, price, url}) {
        this._title = title
        this._artist = artist
        this._price = price
        this._url = url
    }

    get title() {
        return this._title
    }

    get name() {
        return this._title
    }

    get artist() {
        return this._artist
    }

    get price() {
        return this._price
    }

    get url() {
        return this._url
    }
}

module.exports = Song
