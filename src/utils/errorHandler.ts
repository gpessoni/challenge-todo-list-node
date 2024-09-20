import { Response } from "express";

export const handleError = (res: Response, err: any, message: string) => {
  return res.status(500).json({ message, error: err.message });
};
