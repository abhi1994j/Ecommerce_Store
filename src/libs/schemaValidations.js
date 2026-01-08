import { z } from "zod";

export const signupSchema = z
  .object({
    fullname: z
      .string()
      .trim()
      .min(1, { message: "Full name is required" }),

    email: z
      .string()
      .trim()
      .refine((email) => /\S+@\S+\.\S+/.test(email), {
        message: "Please enter a valid email address",
      })
      .min(1, "Email is required"),


    password: z
      .string()
      .min(6, { message: "Password must be at least 6 characters" })
      .max(20, { message: "Password cannot exceed 20 characters" })
      .regex(/[a-z]/, {
        message: "Password must contain at least one lowercase letter",
      })
      .regex(/[A-Z]/, {
        message: "Password must contain at least one uppercase letter",
      })
      .regex(/[0-9]/, {
        message: "Password must contain at least one number",
      })
      .regex(/[^A-Za-z0-9]/, {
        message: "Password must contain at least one special character",
      }),

    confirm_password: z.string(),
  })
  .refine((data) => data.password === data.confirm_password, {
    message: "Passwords do not match",
    path: ["confirm_password"],
  });


export const loginSchema = z.object({
  email: z
    .string()
    .trim()
    .refine((email) => /\S+@\S+\.\S+/.test(email), {
      message: "Please enter a valid email address",
    })
    .min(1, "Email is required"),


  password: z
    .string()
    .min(1, "Password is required"),
});

export const forgotPasswordSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, 'Email is required')
    .refine((email) => /\S+@\S+\.\S+/.test(email), {
      message: 'Please enter a valid email address',
    }),
});

