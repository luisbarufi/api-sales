import { Router } from 'express';
import { ProductsRepository } from '../../../modules/products/typeorm/repositories/ProductsRepository';
import { CreateProductController } from '../../../modules/products/useCases/createProduct/CreateProductController';
import { CreateProductUseCase } from '../../../modules/products/useCases/createProduct/CreateProductUseCase';
import { DeleteProductController } from '../../../modules/products/useCases/deleteProduct/DeleteProductController';
import { DeleteProductUseCase } from '../../../modules/products/useCases/deleteProduct/DeleteProductUseCase';
import { ListProductsController } from '../../../modules/products/useCases/listProducts/ListProductsController';
import { ListProductsUseCase } from '../../../modules/products/useCases/listProducts/ListProductsUseCase';
import { ShowProductController } from '../../../modules/products/useCases/showProduct/ShowProductController';
import { ShowProductUseCase } from '../../../modules/products/useCases/showProduct/ShowProductUseCase';
import { UpdateProductController } from '../../../modules/products/useCases/updateProduct/UpdateProductController';
import { UpdateProductUseCase } from '../../../modules/products/useCases/updateProduct/UpdateProductUseCase';
import { validate } from '../middlewares/validation';

export const productsRoutes = Router();
const producstRepository = new ProductsRepository();

const createProductUseCase = new CreateProductUseCase(producstRepository);
const createProductController = new CreateProductController(
  createProductUseCase,
);

const listProductUseCase = new ListProductsUseCase(producstRepository);
const listProductController = new ListProductsController(listProductUseCase);

const showProductUseCase = new ShowProductUseCase(producstRepository);
const showProductController = new ShowProductController(showProductUseCase);

const updateProductUseCase = new UpdateProductUseCase(producstRepository);
const updateProductController = new UpdateProductController(
  updateProductUseCase,
);

const deleteProductUseCase = new DeleteProductUseCase(producstRepository);
const deleteProductController = new DeleteProductController(
  deleteProductUseCase,
);

const schemaProduct = {
  name: { required: 'Name is required' },
  // price: { type: 'decimal' },
  quantity: { type: 'int' },
};

productsRoutes.post('/', validate(schemaProduct), (req, res) => {
  return createProductController.handle(req, res);
});

productsRoutes.get('/', (req, res) => {
  return listProductController.handle(req, res);
});

productsRoutes.get('/:id', (req, res) => {
  return showProductController.handle(req, res);
});

productsRoutes.put('/:id', (req, res) => {
  return updateProductController.handle(req, res);
});

productsRoutes.delete('/:id', (req, res) => {
  return deleteProductController.handle(req, res);
});
