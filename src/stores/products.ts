import { products } from "api";
import EntityStore from "./base";

import { Product } from 'entities';

class ProductStore extends EntityStore<Product> {
  protected api = products;
}

export default new ProductStore();
