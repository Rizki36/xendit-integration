import { Router } from "express";
import {
  callbackVaCreatedController,
  callbackVaPaidController,
  createVaController,
  getVaController,
  testVaPaymentController,
} from "./payment.controller";

const router = Router();

// TODO: add validation and verifyToken middleware
router.get("/va/one", getVaController);
router.post("/va/test", testVaPaymentController);
router.post("/va", createVaController);
router.post("/va/callback-created", callbackVaCreatedController);
router.post("/va/callback-paid", callbackVaPaidController);

export default router;
