import z from "zod";

export const createVaSchema = z.object({
  body: z.object({
    bankCode: z.enum(["BCA", "BNI", "MANDIRI", "BRI"]),
    name: z.string(),
    amount: z.number().min(10000).max(100000000),
  }),
});
