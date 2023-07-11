import express from "express";
import { Server } from "socket.io";
import handlebars from "express-handlebars";
import viewsRouter from "./routes/views.router.js";
import __dirname from "./utils.js";
import productsRouter from "./routes/products.router.js";
import cartsRouter from "./routes/carts.router.js";
import displayRoutes from "express-routemap";
import connectDatabase from './services/mongodb.service.js';

import ProductManager from "./dao/managers/fsproductmanager.js";
import CartModel from "./dao/models/carts.model.js";
import MongoProductManager from "./dao/managers/mongoproductmanager.js";

// Conexión a la base de datos
connectDatabase()
  .then(() => {
    // Crear instancias de los managers y modelos después de que se haya establecido la conexión a la base de datos

    const productManager = new MongoProductManager();
    const cartModel = new CartModel();

    // Crear la aplicación Express y configurarla

    const app = express();
    const port = 8008;
    app.use(express.static(`${__dirname}/public`));
    app.engine("handlebars", handlebars.engine());
    app.set("views", `${__dirname}/views`);
    app.set("view engine", "handlebars");
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use("/api/products", productsRouter);
    app.use("/api/carts", cartsRouter);
    app.use("/", viewsRouter);

    const server = app.listen(port, () => {
      displayRoutes(app);
      console.log(`Server listening on port ${port}`);
    });

    const io = new Server(server);

    io.on("connection", (socket) => {
      console.log("Nuevo cliente conectado");

      // Emitir los productos actuales al cliente cuando se conecta
      const products = productManager.getProducts();
      socket.emit("currentProducts", products);

      socket.on("createProduct", (product) => {
        try {
          // Crear un nuevo producto utilizando los datos recibidos del cliente
          console.log("Producto recibido en el servidor:", product);

          // Agregar el nuevo producto a la base de datos
          productManager.addProduct(product);

          // Emitir el evento 'newProduct' a todos los clientes con el nuevo producto
          io.emit("newProduct", product);

          console.log("Producto creado:", product);
        } catch (error) {
          console.error(error);
        }
      });
    });
  })
  .catch((error) => {
    console.error('Error al conectar a la base de datos:', error);
  });

