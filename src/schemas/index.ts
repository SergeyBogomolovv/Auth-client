import * as z from 'zod'
export const RegisterSchema = z
  .object({
    name: z.string().min(1, { message: 'Name is required' }),
    email: z.string().email(),
    password: z.string().min(6),
    passwordRepeat: z.string().min(6),
  })
  .superRefine(({ passwordRepeat, password }, ctx) => {
    if (passwordRepeat !== password) {
      ctx.addIssue({
        code: 'custom',
        message: 'The passwords did not match',
      })
    }
  })

export const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
})
