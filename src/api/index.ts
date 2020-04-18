import API from './api';
import request from './request';

export { request };

export const products = new API('/classes/Product');
export const test = new API('/classes/Test');

export default API;
