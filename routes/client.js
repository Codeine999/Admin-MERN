import express from "express";
import { getProducts, getCustomers,  getTransaction } from "../controller/client.js";


const router = express.Router();

router.get("/products", getProducts);
router.get("/customers", getCustomers);
router.get("/transaction", getTransaction);


export default router;