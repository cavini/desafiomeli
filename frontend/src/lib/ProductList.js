import ProductItem from './ProductItem';
import Author from './Author';

export default class ProductList {
  constructor(data, categories) {
    this.author = new Author('Arthur', 'Cavini');

    this.categories = categories;

    this.items = data.map((item) => {
      return new ProductItem(item);
    });
  }
}
