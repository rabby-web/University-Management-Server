import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { User } from '../user/user.model';
import { TLoginUser } from './auth.interface';
import bcrypt from 'bcrypt';

const loginUser = async (payload: TLoginUser) => {
  // checking if the user is exist

  const user = await User.isUserExistsByCustomId(payload.id);
  if (!user) {
    throw new AppError(httpStatus.FORBIDDEN, 'This user is not found!');
  }

  //   // checking if the user is deleted
  //   const isDeleted = isUserExists?.isDeleted;
  //   if (isDeleted) {
  //     throw new AppError(httpStatus.NOT_FOUND, 'This user is deleted!');
  //   }
  //   // checking if the user is blocked
  //   const userStatus = isUserExists?.status;
  //   if (userStatus === 'blocked') {
  //     throw new AppError(httpStatus.NOT_FOUND, 'This user is blocked!');
  //   }

  // checking if the password is correct
  if (!(await User.isPasswordMatch(payload?.password, user?.password))){
    throw new AppError(httpStatus.FORBIDDEN, 'Password do not match!');
  }
    // access granted: send AccessToken, RefreshToken

    return {};
};

export const AuthService = {
  loginUser,
};
