import xendit from "xendit-node";
import { Request, Response } from "express";
import { Prisma, PrismaClient } from "@prisma/client";
import axios from "axios";

const x = new xendit({
  secretKey: process.env.XENDIT_SECRET || "",
});
const prisma = new PrismaClient();

/**
 * Create a virtual account === "PENDING" >
 * Callback created === ("ACTIVE" | "INACTIVE")>
 * Callback paid === "PAID"
 */

export const createVaController = async (req: Request, res: Response) => {
  try {
    const transaction = await prisma.transaction.create({
      data: {
        amount: req.body.amount,
        status: "PENDING",
        bankCode: req.body.bankCode,
        name: req.body.name,
      },
    });

    const va = new x.VirtualAcc({});
    const resp = await va.createFixedVA({
      externalID: transaction.id,
      bankCode: req.body.bankCode,
      name: req.body.name,
      isSingleUse: true,
      suggestedAmt: req.body.amount,
      expectedAmt: req.body.amount,
      isClosed: true,
    });

    res.json(resp);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const getVaController = async (req: Request, res: Response) => {
  try {
    const va = new x.VirtualAcc({});
    const resp = await va.getFixedVA({
      id: req.query.id as string,
    });

    // TODO: format the response

    res.json(resp);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const getTransactionController = async (req: Request, res: Response) => {
  try {
    let where: Prisma.TransactionWhereInput = {};

    // get one transaction
    if (req.query.id) {
      where = {
        id: req.query.id as string,
      };
    }

    const transactions = await prisma.transaction.findMany({
      where,
    });

    res.json(transactions);
  } catch (error) {
    res.status(500).json(error);
  }
};

/**
 * Callback for created or updated status
 */
export const callbackVaCreatedController = async (
  req: Request,
  res: Response
) => {
  // TODO: validate the callback

  try {
    const transaction = await prisma.transaction.update({
      where: {
        id: req.body.external_id,
      },
      data: {
        status: req.body.status,
        virtualAccountID: req.body.id,
        virtualAccountNumber: req.body.account_number,
      },
    });

    res.json(transaction);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      res.status(500).json(error?.response?.data);
    } else {
      res.status(500).json(error);
    }
  }
};

/**
 * Specific callback for paid status
 */
export const callbackVaPaidController = async (req: Request, res: Response) => {
  try {
    const transaction = await prisma.transaction.update({
      where: {
        id: req.body.external_id,
      },
      data: {
        status: req.body.status,
      },
    });

    // Do something with the transaction

    res.json(transaction);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      res.status(500).json(error?.response?.data);
    } else {
      res.status(500).json(error);
    }
  }
};

/**
 * Simulate payment for testing
 */
export const testVaPaymentController = async (req: Request, res: Response) => {
  try {
    const transaction = await prisma.transaction.findFirst({
      where: {
        virtualAccountID: req.query.id as string,
      },
    });
    const buff = Buffer.from(`${process.env.XENDIT_SECRET}:`, "utf-8");
    const paymentResponse = await axios.post(
      `https://api.xendit.co/callback_virtual_accounts/external_id=${transaction?.id}/simulate_payment`,
      {
        amount: req.body.amount,
      },
      {
        headers: {
          Authorization: `Basic ${buff.toString("base64")}`,
        },
      }
    );

    res.json(paymentResponse.data);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      res.status(500).json(error?.response?.data);
    } else {
      res.status(500).json(error);
    }
  }
};
