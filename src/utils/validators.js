/**
 * GyaanSetu — Shared Yup Validation Schemas
 */
import * as Yup from 'yup';

// ─── Field-Level Schemas ────────────────────────────────────────────

export const emailSchema = Yup.string()
  .email('Please enter a valid email address')
  .required('Email is required');

export const passwordSchema = Yup.string()
  .min(8, 'Password must be at least 8 characters')
  .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
  .matches(/[0-9]/, 'Password must contain at least one number')
  .required('Password is required');

export const confirmPasswordSchema = Yup.string()
  .oneOf([Yup.ref('password'), null], 'Passwords must match')
  .required('Please confirm your password');

export const nameSchema = Yup.string()
  .min(2, 'Name must be at least 2 characters')
  .max(50, 'Name must not exceed 50 characters')
  .required('Name is required');

// ─── Form-Level Schemas ─────────────────────────────────────────────

export const loginSchema = Yup.object().shape({
  email: emailSchema,
  password: Yup.string().required('Password is required'),
  rememberMe: Yup.boolean(),
});

export const signupSchema = Yup.object().shape({
  fullName: nameSchema,
  email: emailSchema,
  password: passwordSchema,
  confirmPassword: confirmPasswordSchema,
  languagePreference: Yup.string()
    .oneOf(['en', 'hi', 'gu'], 'Please select a valid language')
    .required('Language preference is required'),
  role: Yup.string()
    .oneOf(['student', 'instructor'], 'Please select a valid role')
    .required('Role is required'),
  agreeToTerms: Yup.boolean()
    .oneOf([true], 'You must agree to the Terms & Privacy Policy')
    .required(),
});

export const forgotPasswordSchema = Yup.object().shape({
  email: emailSchema,
});

export const resetPasswordSchema = Yup.object().shape({
  password: passwordSchema,
  confirmPassword: confirmPasswordSchema,
});

export const contactFormSchema = Yup.object().shape({
  name: nameSchema,
  email: emailSchema,
  category: Yup.string().required('Please select a category'),
  subject: Yup.string()
    .min(3, 'Subject must be at least 3 characters')
    .required('Subject is required'),
  message: Yup.string()
    .min(20, 'Message must be at least 20 characters')
    .required('Message is required'),
});

export const profileSchema = Yup.object().shape({
  displayName: nameSchema,
  username: Yup.string()
    .min(3, 'Username must be at least 3 characters')
    .max(30, 'Username must not exceed 30 characters')
    .matches(/^[a-zA-Z0-9_]+$/, 'Username can only contain letters, numbers, and underscores'),
  bio: Yup.string().max(200, 'Bio must not exceed 200 characters'),
  college: Yup.string().max(100, 'College name must not exceed 100 characters'),
  city: Yup.string().max(50, 'City must not exceed 50 characters'),
  state: Yup.string().max(50, 'State must not exceed 50 characters'),
  githubUrl: Yup.string().url('Please enter a valid URL').nullable(),
  linkedinUrl: Yup.string().url('Please enter a valid URL').nullable(),
});

export const changePasswordSchema = Yup.object().shape({
  currentPassword: Yup.string().required('Current password is required'),
  newPassword: passwordSchema,
  confirmNewPassword: Yup.string()
    .oneOf([Yup.ref('newPassword'), null], 'Passwords must match')
    .required('Please confirm your new password'),
});
