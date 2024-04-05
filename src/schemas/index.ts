import * as z from 'zod'
export const RegisterSchema = z
  .object({
    name: z.string().min(1, { message: 'Name is required' }),
    email: z.string().email(),
    password: z.string().min(6),
    passwordRepeat: z.string().min(6),
  })
  .refine((data) => data.password === data.passwordRepeat, {
    message: "Passwords doesn't match",
    path: ['passwordRepeat'],
  })

export const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
})
