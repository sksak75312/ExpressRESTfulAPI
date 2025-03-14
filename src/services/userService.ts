import { User } from '#types/user.ts';

const users: User[] = [
  { id: 1, name: "Alice", email: "alice@example.com" },
  { id: 2, name: "Bob", email: "bob@example.com" }
]

// 取得所有使用者
export const getUsers = (): User[] => users;

//取得單一使用者
export const getUserById = (id: number): User | undefined => {
  return users.find(user => user.id === id);
}

// 新增使用者
export const createUser = (name: string, email: string): User => {
  const id = users.at(-1)!.id + 1

  const newUser = {
    id,
    name,
    email
  }

  users.push(newUser)

  return newUser;
}

// 更新使用者資料
export const updateUser = (id: number, name?: string, email?: string): User | null => {
  const findUser = users.find(user => user.id === Number(id));

  if (findUser) {
    findUser!.name = name ?? findUser?.name;
    findUser!.email = email ?? findUser?.email;
  }

  return findUser ?? null
}

// 刪除使用者
export const deleteUser = (id: number): boolean => {
  const initialLength = users.length;
  const userIndex = users.findIndex(user => user.id === Number(id));
  if (userIndex >= 0) {
    users.splice(userIndex, 1);
  }
  return users.length < initialLength;
}