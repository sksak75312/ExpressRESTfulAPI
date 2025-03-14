import { Router } from 'express';
import * as userController from '#controllers/userController.ts';
const router = Router();


// 取得全部使用者
router.get('/', userController.getUsers);

// 取得特定使用者
router.get('/:id', userController.getUserById);

// 新增使用者
router.post('/', userController.createUser);

// 修改使用者
router.put('/:id', userController.updateUser);

// 刪除使用者，不用回傳東西就給 send
router.delete('/:id', userController.deleteUser);

export default router;