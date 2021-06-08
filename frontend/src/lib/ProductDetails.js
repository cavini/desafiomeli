import Author from './Author';
import Product from './Product';

export default class ProductDetails {
  constructor(product) {
    this.author = new Author('Arthur', 'Cavini');
    this.item = {
      ...new Product(product),
      ...{
        sold_quantity: product.sold_quantity,
        description: product.plain_text,
      },
    };
  }
}
