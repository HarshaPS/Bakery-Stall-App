import ProductModel from '../model/Product';
import BakeryHandler from '../handler/BakeryHandler';
import BakeryService from '../service/BakeryService';

const product = new ProductModel();
const bakeryHandler = new BakeryHandler();
const bakeryService = new BakeryService();

export { bakeryHandler, bakeryService, product };