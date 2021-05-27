const MAX_TIP_AMOUNT = 10000
const MAX_SUGGESTED_TIPS = 4
const SUGGESTED_TIP_AMOUNTS = [500, 1000, 1500, 2000]

class Invoice {
    constructor({title, description, photo_url, payload, currency, items = []}) {
        this._title = title
        this._description = description
        this._photo_url = photo_url
        this._payload = payload
        this._currency = currency
        this._items = items
        this._maxTipAmount = MAX_TIP_AMOUNT
        this._suggestedTipAmounts = SUGGESTED_TIP_AMOUNTS
    }

    get maxTipAmount() {
        return this._maxTipAmount
    }

    set maxTipAmount(amount) {
        this._maxTipAmount = amount
    }

    get suggestedTipAmounts() {
        return this._suggestedTipAmounts
    }

    set suggestedTipAmounts(tips) {
        if (tips.length > MAX_SUGGESTED_TIPS) {
            throw new Error(`You may only have up to ${MAX_SUGGESTED_TIPS} suggested tips`)
        }

        if (!this.isWithinMaxTipAmount(tips)) {
            throw new Error(`Tips cannot exceed the max tip amount of ${MAX_TIP_AMOUNT}`)
        }

        this._suggestedTipAmounts = tips
    }

    isWithinMaxTipAmount(tips) {
        sortedTips = tips.sort((a, b) => b - a)
        return sortedTips[0] <= MAX_TIP_AMOUNT
    }

    generateItemizedPriceList(items) {
        return items.map(i => ({ label: i.name, amount: i.price }))
    }

    generateInvoice() {
        return {
            title: this._title,
            description: this._description,
            photo_url: this._photo_url,
            payload: this._payload,
            provider_token: process.env.PROVIDER_TOKEN,
            currency: this._currency,
            prices: this.generateItemizedPriceList(this._items),
            max_tip_amount: this._maxTipAmount,
            suggested_tip_amounts: this._suggestedTipAmounts
        }    
    }
}

module.exports = Invoice
