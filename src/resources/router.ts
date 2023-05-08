// router v1
import { Router } from "express";
import PaymentRouter from "./payment/payment.router";

const router = Router();

// payment router
router.use("/payment", PaymentRouter);

router.get("/", (req, res) => {
  res.send("Welcome to AudioBook");
});

export default router;
