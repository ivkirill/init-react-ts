import API from './api';
import request from './request';

export { request };

export const products = new API('/classes/Product');

export default API;
