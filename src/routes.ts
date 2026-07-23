import { Router } from "express";
import multer from "multer";
import uploadConfig from "./config/multer";
import { CreateUserController } from "./controllers/user/CreateUserController";
import { validateSchema } from "./middlewares/validateSchema";
import { authUserSchema, createUserSchema } from "./schemas/userSchema";
import { AuthUseController } from "./controllers/user/AuthUseController";
import { DetailUserController } from "./controllers/user/DetailUserController";
import { isAuthenticated } from "./middlewares/isAuthenticated";
import { CreateCategoryController } from "./controllers/category/CreateCategoryController";
import { isAdmin } from "./middlewares/isAdmin";
import { createCategorySchema } from "./schemas/categorySchema";
import { ListCategoryController } from "./controllers/category/ListCategoryController";
import { CreateProductController } from "./controllers/product/CreateProductController";
import {
  createProductSchema,
  listProductByCategorySchema,
  listProductsSchema,
} from "./schemas/productSchema";
import { ListProductController } from "./controllers/product/ListProductController";
import { DeleteProductController } from "./controllers/product/DeleteProductController";
import { ListProductByCategoryController } from "./controllers/product/ListProductByCategoryController";
import { CreateOrderController } from "./controllers/order/CreateOrderController";
import { createOrderSchema } from "./schemas/orderSchema";

const router = Router();
const upload = multer(uploadConfig);

// Rotas users
router.post(
  "/users",
  validateSchema(createUserSchema),
  new CreateUserController().handle,
);

router.post(
  "/session",
  validateSchema(authUserSchema),
  new AuthUseController().handle,
);

router.get("/me", isAuthenticated, new DetailUserController().handle);

// Rotas category

router.post(
  "/category",
  isAuthenticated,
  isAdmin,
  validateSchema(createCategorySchema),
  new CreateCategoryController().handle,
);

router.get("/category", isAuthenticated, new ListCategoryController().handle);

// Rotas Product

router.post(
  "/product",
  isAuthenticated,
  isAdmin,
  upload.single("file"),
  validateSchema(createProductSchema),
  new CreateProductController().handle,
);

router.get(
  "/products",
  isAuthenticated,
  validateSchema(listProductsSchema),
  new ListProductController().handle,
);

router.delete(
  "/product",
  isAuthenticated,
  isAdmin,
  new DeleteProductController().handle,
);

router.get(
  "/category/product",
  isAuthenticated,
  validateSchema(listProductByCategorySchema),
  new ListProductByCategoryController().handle,
);

// Rotas Order
router.post(
  "/order",
  isAuthenticated,
  validateSchema(createOrderSchema),
  new CreateOrderController().handle,
);

export { router };
