

import { z } from "zod"

export const signUpFormSchema = z.object({
    name: z.string().min(2, {
      message: "Username must be at least 2 characters.",
    }),
    email:z.string().email("Must be a valid email"),
    password:z.string().min(6,"Password is too short")
  })


  export const loginFormSchema = z.object({
    email:z.string().email("Must be a Valid email"),
    password:z.string().min(6,"Password is too short")
  })