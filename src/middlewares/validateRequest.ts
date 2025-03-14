import { validationResult } from "express-validator";

import { Request, Response, NextFunction } from 'express';

export const validateRequest = (req: Request, res: Response, next: NextFunction) => {
  console.log(req)
  const errors = validationResult(req);
  console.log(errors)
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
  }

  next();
}