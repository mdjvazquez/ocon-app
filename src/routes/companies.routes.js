import { Router } from "express";

import {
  getAll,
  getById,
  createOne,
  deleteOne,
  updateOne,
} from "../controllers/companies.controllers.js";
export const table = "companies";

const router = Router();

router.get(`/${table}`, getAll);

router.get(`/${table}/:id/`, getById);

router.post(`/${table}/`, createOne);

router.delete(`/${table}/:id/`, deleteOne);

router.put(`/${table}/:id/`, updateOne);

export default router;
