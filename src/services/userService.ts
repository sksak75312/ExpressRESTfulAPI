import { UserModel } from '#models/User.js';
import { User } from '#types/user.ts';

// 取得所有使用者
export const getUsers = async (): Promise<User[]> => {

  const data = await UserModel.find().lean();
  const newData = data.map(({ _id, ...rest }) => ({
    id: _id.toHexString(),
    ...rest
  }))
  return newData;
};

//取得單一使用者
export const getUserById = async (id: string): Promise<User | null> => {
  const findUser = await UserModel.findById(id);

  return findUser ? {
    id: findUser._id.toHexString(),
    name: findUser.name,
    email: findUser.email
  } : null
};

// 新增使用者
export const createUser = async (name: string, email: string): Promise<User> => {
  const newUser = new UserModel({ name, email });
  const saveUser = await newUser.save();

  return {
    id: saveUser._id.toHexString(),
    name: saveUser.name,
    email: saveUser.email,
  };
}

// 更新使用者資料
export const updateUser = async (id: string, name?: string, email?: string): Promise<User | null> => {
  const userData = await UserModel.findByIdAndUpdate(id, { name, email }, { new: true });

  return userData ? {
    id: userData._id.toHexString(),
    name: userData.name,
    email: userData.email
  } : null;
}

// 刪除使用者
export const deleteUser = async (id: string): Promise<boolean> => {
  const result = await UserModel.findByIdAndDelete(id);
  return !!result;
}