import { NextFunction, Request, Response } from "express";
import { AnyZodObject, ZodError } from "zod";
import { formatResponse } from "./formatter";
import jwt from "jsonwebtoken";
import "dotenv/config";

export const validation =
  (schema: AnyZodObject) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.parseAsync({
        body: req.body,
        query: req.query,
        params: req.params,
      });
      return next();
    } catch (error) {
      if (typeof error === "string") {
        res.status(400).send(error);
      } else if (error instanceof ZodError) {
        const resErr = formatResponse({
          errors: error.issues,
        });
        res.status(400).json(resErr);
      } else {
        res.status(400).json(res);
      }
    }
  };

export const verifyToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.cookies?.token;

  if (!token) {
    res.status(403).json(
      formatResponse({
        message: "No token provided!",
      })
    );
  }

  // @ts-ignore
  jwt.verify(token, process.env.JWT_SECRET ?? "", (err, decoded) => {
    if (err) {
      return res.status(401).json(
        formatResponse({
          message: "Unauthorized!",
        })
      );
    }

    // @ts-ignore
    req.userId = decoded.id;
    next();
  });
};
