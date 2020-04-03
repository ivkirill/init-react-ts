import API from './api';
import request from './request';

export { API, request };

export const products = new API('/products');
export const payment = new API('/payment');
