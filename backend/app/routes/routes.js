import express from "express";
import CategoryController from "../controllers/category/category.controller.js";
import ProductsController from "../controllers/products/products.controller.js";
import AuthController from "../controllers/auth/auth.js";
import UserController from "../controllers/user/user.controller.js";
import Protect from "../middleware/auth.js";

const auth            = express.Router();
const userrouter      = express.Router();
const productrouter   = express.Router();
const categoryrouter  = express.Router();

const routes = (app) => {
  /********** AUTH **************/
  auth.post("/login", AuthController.Login);
  auth.post("/register", AuthController.Register);
  auth.post("/forgot-password", AuthController.Forgotpassword);
  auth.put("/reset-password/:resetToken", AuthController.Resetpassword);

  /********** PRODUCT **************/
  productrouter.get("/", ProductsController.findAll);
  productrouter.post("/", ProductsController.create);
  productrouter.get("/:id", ProductsController.findOne);
  productrouter.put("/:id", ProductsController.update);
  productrouter.delete("/:id", ProductsController.delete);

  /********** CATEGORY **************/
  categoryrouter.get("/", CategoryController.findAll);
  categoryrouter.post("/", CategoryController.create);
  categoryrouter.get("/:id", CategoryController.findOne);
  categoryrouter.put("/:id", CategoryController.update);
  categoryrouter.delete("/:id", CategoryController.delete);

  /********** USER **************/
  userrouter.get("/", UserController.findAll);
  userrouter.post("/", UserController.create);
  userrouter.get("/:id", UserController.findOne);
  userrouter.put("/:id", UserController.update);
  userrouter.delete("/:id", UserController.delete);

  /********** ALIASES **************/
  app.use("/api/auth", auth);
  app.use("/api/v1/category", Protect, categoryrouter);
  app.use("/api/v1/products", Protect, productrouter);
  app.use("/api/v1/users", Protect, userrouter);
};
export default routes;
