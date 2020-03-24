import CRUD from './crud';
export { CRUD };

export const products = new CRUD('/products');
export const payment = new CRUD('/payment');
