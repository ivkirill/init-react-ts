import API from './api';
import request from './request';

export { request };

export const products = new API('/products');
export const payment = new API('/payment');

export default API;
