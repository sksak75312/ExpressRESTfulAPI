import { Request, Response, NextFunction } from 'express';
import { ErrorMessages } from '#constants/errorMessages.ts';

export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({"message": ErrorMessages.INTERNAL_SERVER_ERROR})
}