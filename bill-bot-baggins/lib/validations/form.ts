import { z } from 'zod'

export const loginFormSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8, { message: "Password must contain at least 8 characters"}),
})