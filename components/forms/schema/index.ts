import { z } from "zod";
const PASSWORD_REGEX =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+[\]{};':"\\|,.<>/?-]).*$/;

export const validationMessages = {
  name: {
    required: "Name is required",
  },
  email: {
    required: "Email is required",
  },
  password: {
    required: "Password is required",
    minimumLength: "Password must be at least 3 characters",
    validation:
      "Password must contain at least one lowercase letter (a-z), one uppercase letter (A-Z), one digit (0-9), and one special character",
  },
};

export const zodForLogin = z.object({
  email: z
    .string()
    .trim()
    .min(3, { message: validationMessages.email.required })
    .refine(
      (data) => {
        if (data.includes("@")) {
          const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Basic email pattern
          return emailPattern.test(data);
        }
        return true; // If "@" is not present, skip validation
      },
      {
        message: "Invalid email",
      }
    ),
  password: z
    .string()
    .trim()
    .min(1, { message: validationMessages.password.required })
    .regex(PASSWORD_REGEX, {
      message: validationMessages.password.validation,
    })
    .min(3, { message: validationMessages.password.minimumLength })
    .refine((val) => !val.includes(" "), {
      message: "Password cannot contain spaces",
    }),
});

export const zodForRegister = z.object({
  name: z.string().trim().min(1, { message: validationMessages.name.required }),
  email: z
    .string()
    .trim()
    .min(3, { message: validationMessages.email.required })
    .refine(
      (data) => {
        if (data.includes("@")) {
          const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Basic email pattern
          return emailPattern.test(data);
        }
        return true; // If "@" is not present, skip validation
      },
      {
        message: "Invalid email",
      }
    ),
  password: z
    .string()
    .trim()
    .min(1, { message: validationMessages.password.required })
    .regex(PASSWORD_REGEX, {
      message: validationMessages.password.validation,
    })
    .min(8, { message: validationMessages.password.minimumLength })
    .refine((val) => !val.includes(" "), {
      message: "Password cannot contain spaces",
    }),
});
