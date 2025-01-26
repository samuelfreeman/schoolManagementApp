

import { z } from "zod"

export const tutorSignUpFormSchema = z.object({
    firstName: z.string().max(13, "FirstName is too long"),
    lastName: z.string().max(13, "LastName is too long"),
    email: z.string().email("Must be a valid email"),
    password: z.string().min(6, "Password is too short"),
    gender:z.string().max(6,"incorrect"),
    contact:z.string().max(13,"contact number is too short"),
    registeredCode: z.string().min(6,"registeration code is too long ")
})


export const loginFormSchema = z.object({
    email: z.string().email("Must be a Valid email"),
    password: z.string().min(6, "Password is too short")
})