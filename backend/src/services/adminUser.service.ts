import { User } from "../models/user.model";
import { ApiError } from "../errors/ApiError";

export const getAllUsers = async () => {
  return User.find({}, "-password");
};

export const updateUserStatus = async (
  userId: string,
  action: "ban" | "unban"
) => {
  const user = await User.findById(userId);
  if (!user) throw ApiError.notFound("User not found");

  user.isActive = action === "unban";
  await user.save();
  return user;
};
