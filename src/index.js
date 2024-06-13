import express, { json } from "express";
//import { jsonwebtocken } from "jsonwebtocken";
import { PORT } from "./config.js";
import userRoutes from "./routes/users.routes.js";
import ticketsRoutes from "./routes/tickets.routes.js";
import companiesRoutes from "./routes/companies.routes.js";

const app = express();
//const jwt = jsonwebtocken;

app.use(express.json());
app.use(ticketsRoutes);
app.use(userRoutes);
app.use(companiesRoutes);

app.listen(PORT);
console.log("Servidor escuchando desde el puerto", PORT);
