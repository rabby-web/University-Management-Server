import { Model } from 'mongoose';

// user name
export type TUserName = {
  firstName: string;
  middleName: string;
  lastName: string;
};

// guardian
export type TGuardian = {
  fatherName: string;
  fatherOccupation: string;
  fatherContactNo: string;
  motherName: string;
  motherOccupation: string;
  motherContactNo: string;
};

// local guardian
export type TLocalGuardian = {
  name: string;
  occupation: string;
  contactNo: string;
  address: string;
};

// student
export type TStudent = {
  id: string;
  name: TUserName;
  gender: 'male' | 'female' | 'other';
  dateOfBirth: string;
  email: string;
  contactNo: string;
  emergencyContactNo: string;
  bloodGroup?: 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';
  presentAddress: string;
  permanentAddress: string;
  guardian: TGuardian;
  localGuardian: TLocalGuardian;
  profileImg?: string;
  isActive: 'active' | 'blocked';
};

export type StudentMethods = {
  // eslint-disable-next-line no-unused-vars
  isUserExists(id: string): Promise<TStudent | null>;
};

export type StudentModel = Model<
  TStudent,
  Record<string, never>,
  StudentMethods
>;
