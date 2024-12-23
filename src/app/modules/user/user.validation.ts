import { z } from 'zod';
import { UserStatus } from './user.constant';

const userValidationSchema = z.object({
  password: z
    .string({
      invalid_type_error: 'Password must be string',
    })
    .max(20, { message: "Password can't be more then 20 characters" })
    .optional(),
  // needsPasswordChange: z.boolean().optional().default(true),
  // role: z.enum(['student', 'faculty', 'admin']),
  // status: z.enum(['in-progress', 'blocked']).default('in-progress'),
  // isDeleted: z.boolean().optional().default(false),
});

const changeStatusValidationSchema = z.object({
  body: z.object({
    status: z.enum([...UserStatus] as [string, ...string[]]),
  }),
});

// export default userValidationSchema;
export const UserValidation = {
  userValidationSchema,
  changeStatusValidationSchema,
};
