import { Router } from 'express';
import { body, param } from 'express-validator';
import * as userController from '#controllers/userController.ts';
import { validateRequest } from '#middlewares/validateRequest.ts';

const router = Router();

// 取得全部使用者
router.get('/', userController.getUsers);

// 取得特定使用者
router.get('/:id',
  param("id").isInt().withMessage("User ID must be an integer"),
  validateRequest,
  userController.getUserById
);

// 新增使用者
router.post('/',
  [
    body("name").notEmpty().withMessage("Name is required"),
    body("email").isEmail().withMessage("Invalid email format")
  ],
  validateRequest,
  userController.createUser
);

// 修改使用者
router.put('/:id',
  [
    param("id").isInt().withMessage("User ID must be an integer"),
    body("name").optional().notEmpty().withMessage("Name cannot be empty"),
    body("email").optional().isEmail().withMessage("Invalid email format")
  ],
  validateRequest,
  userController.updateUser
);

// 刪除使用者，不用回傳東西就給 send
router.delete('/:id',
  param("id").isInt().withMessage("User ID must be an integer"),
  validateRequest,
  userController.deleteUser
);

export default router;