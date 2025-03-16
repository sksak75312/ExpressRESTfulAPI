import { Request, Response } from 'express';

import { ErrorMessages } from '#constants/errorMessages.ts';
import * as userService from '#services/userService.ts';

export const getUsers = async (_: Request, res: Response) => { res.json(await userService.getUsers()) };


export const getUserById = async (req: Request, res: Response) => {
  const user = await userService.getUserById(req.params.id);
  if (!user) res.status(404).json({ "message": ErrorMessages.USER_NOT_FOUND });
  res.json(user);
}

export const createUser = async (req: Request, res: Response) => {
  const { name, email } = req.body;

  if (!name || !email) res.status(400).json({ "message": !name ? ErrorMessages.NAME_REQUIRED : ErrorMessages.EMAIL_REQUIRED });

  const user = await userService.createUser(name, email);
  res.status(201).json(user);
}

export const updateUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, email } = req.body;
  const user = await userService.updateUser(id, name, email);

  if (!user) res.status(404).json({ "message": ErrorMessages.USER_NOT_FOUND });

  res.json(user);
}

export const deleteUser = (req: Request, res: Response) => {
  const { id } = req.params;
  const isSuccess = userService.deleteUser(id);

  if (!isSuccess) res.status(404).json({ "message": ErrorMessages.USER_NOT_FOUND });

  res.status(204).json({ "message": ErrorMessages.USER_DELETE });
}
