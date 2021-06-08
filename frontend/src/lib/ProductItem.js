import Product from './Product';

export default class ProductItem extends Product {
  constructor(data) {
    super(data);
    this.state_name = data.address.state_name;
  }
}
