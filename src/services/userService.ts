import { UserModel } from '#models/User.js';
import { User } from '#types/user.ts';

// 取得所有使用者
export const getUsers = async (): Promise<User[]> => await UserModel.find();

//取得單一使用者
export const getUserById = async (id: number): Promise<User | null> => await UserModel.findById(id);

// 新增使用者
export const createUser = async (name: string, email: string): Promise<User> => {
  const newUser = new UserModel({ name, email });

  const savedUser = await newUser.save();
  return {
    id: Number(savedUser._id),
    name: savedUser.name,
    email: savedUser.email,
  };
}

// 更新使用者資料
export const updateUser = async (id: number, name?: string, email?: string): Promise<User | null> => {
  return await UserModel.findByIdAndUpdate(id, { name, email }, { new: true });
}

// 刪除使用者
export const deleteUser = async (id: number): Promise<boolean> => {
  const result = await UserModel.findByIdAndDelete(id);
  return !!result;
}