import { z } from "zod";

export const signupSchema = z
  .object({
    fullname: z
      .string()
      .trim()
      .min(1, { message: "Full name is required" }), // Full name required validation

    email: z
      .string()
      .trim()
      .refine((email) => /\S+@\S+\.\S+/.test(email), {
        message: "Please enter a valid email address",
      })
      .min(1, { message: "Email is required" }), // Email required validation

    password: z
      .string()
      .min(6, { message: "Password must be at least 6 characters" })
      .max(20, { message: "Password cannot exceed 20 characters" }),

    confirm_password: z.string(),
  })
  .refine(
    (data) => data.password === data.confirm_password,
    {
      message: "Passwords do not match",
      path: ["confirm_password"],
    }
  );

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


