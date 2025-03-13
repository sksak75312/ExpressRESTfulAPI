// 我們現在要新增：

// GET /users 👉 取得所有使用者
// GET /users/:id 👉 取得特定使用者
// POST /users 👉 新增使用者
// PUT /users/:id 👉 更新使用者
// DELETE /users/:id 👉 刪除使用者


import { Router } from 'express';
import { User } from '../types/user.ts'

const router = Router();

const users: User[] = [
  { id: 1, name: "Alice", email: "alice@example.com" },
  { id: 2, name: "Bob", email: "bob@example.com" }
]

// 取得全部使用者
router.get('/', (req, res) => {
  res.json(users)
})

// 取得特定使用者
router.get('/:id', (req, res) => {
  const { id } = req.params;
  const findUser = users.find(user => user.id === Number(id));
  console.log(findUser)
  if (!findUser) res.status(404).json({ "message": "User not found" })
  res.json(findUser)
})

// 新增使用者
router.post('/', (req, res) => {
  const { name, email } = req.body;
  const id = users.length + 1
  users.push({
    id,
    name,
    email
  })

  res.status(201).json(users);
})

// 修改使用者
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { body } = req;
  const findUser = users.find(user => user.id === Number(id));

  if (!findUser) res.status(404).json({ "message": "User Not found" })

  findUser!.name = body.name ?? findUser?.name;
  findUser!.email = body.email ?? findUser?.email;

  res.json(findUser);
})

// 刪除使用者，不用回傳東西就給 send
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  const userIndex = users.findIndex(user => user.id === Number(id));
  if (userIndex >= 0) {
    users.splice(userIndex, 1);
  }

  res.status(204).send({})
})

export default router;