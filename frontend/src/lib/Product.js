export default class Product {
  constructor(data) {
    this.id = data.id;
    this.title = data.title;
    this.price = {
      currency: data.currency_id,
      amount: data.price,
      decimals: this.getDecimals(data.price),
    };
    this.picture = data.thumbnail;
    this.condition = data.condition;
    this.free_shipping = data.shipping.free_shipping;
  }

  getDecimals = function (value) {
    if (Math.floor(value) === value) return 0;
    return value.toString().split('.')[1].length || 0;
  };
}
