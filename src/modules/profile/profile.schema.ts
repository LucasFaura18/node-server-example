import { z } from 'zod';

export const createProfileSchema = z.object({
  userId: z
    .number()
    .int('El ID del usuario debe ser un número entero')
    .positive('El ID del usuario debe ser positivo'),
  bio: z
    .string()
    .max(500, 'La biografía no puede tener más de 500 caracteres')
    .optional(),
  avatarUrl: z
    .string()
    .url('La URL del avatar no es válida')
    .optional(),
  location: z
    .string()
    .max(100, 'La ubicación no puede tener más de 100 caracteres')
    .optional()
});

export const updateProfileProfileSchema = z.object({ 
  bio: z
    .string()
    .max(500, 'La biografía no puede tener más de 500 caracteres')
    .optional(),
  avatarUrl: z
    .string()
    .url('La URL del avatar no es válida')
    .optional(),
  location: z
    .string()
    .max(100, 'La ubicación no puede tener más de 100 caracteres')
    .optional()
});

// Types
export type CreateProfileInput = z.infer<typeof createProfileSchema>;
export type UpdateProfileProfileInput = z.infer<typeof updateProfileProfileSchema>; // <-- renombrado
