// import packages
import express from "express";
import morgan from "morgan";
import ViteExpress from "vite-express";
import handlerFunctions from "./controller.js";

// set up app instance
const app = express();

// set up middleware
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false }));
app.use(express.static("public"));
app.use(express.json());

//routes go here
const { getInvoices, addItem, deleteItem, updateItem } = handlerFunctions;
app.get("/invoice", getInvoices);
app.post("/addInvoice", addItem);
app.delete("/removeInvoice/:id", deleteItem);
app.put("/editInvoice/:id", updateItem);

// open up door to server
ViteExpress.listen(app, 2319, () =>
  console.log("We got a 2319! Report to http://localhost:2319")
);
