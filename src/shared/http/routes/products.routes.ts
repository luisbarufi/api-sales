import { Request, Response, Router } from 'express';
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
import { validateRequestSchema } from '../middlewares/validate-request-schema';
import { createProductSchema } from '../schema/product/create-product-schema';
import { deleteProductSchema } from '../schema/product/delete-product-schema';
import { showProductSchema } from '../schema/product/show-product-schema';
import { updateProductSchema } from '../schema/product/update-product-schema';

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

productsRoutes.post(
  '/',
  createProductSchema,
  validateRequestSchema,
  (req: Request, res: Response) => {
    return createProductController.handle(req, res);
  },
);

productsRoutes.get('/', (req, res) => {
  return listProductController.handle(req, res);
});

productsRoutes.get(
  '/:id',
  showProductSchema,
  validateRequestSchema,
  (req: Request, res: Response) => {
    return showProductController.handle(req, res);
  },
);

productsRoutes.put(
  '/:id',
  updateProductSchema,
  validateRequestSchema,
  (req: Request, res: Response) => {
    return updateProductController.handle(req, res);
  },
);

productsRoutes.delete(
  '/:id',
  deleteProductSchema,
  validateRequestSchema,
  (req: Request, res: Response) => {
    return deleteProductController.handle(req, res);
  },
);
