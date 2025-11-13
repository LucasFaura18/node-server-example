// profile.service.ts
import { prisma } from '../../config/db.js';
import type { CreateProfileInput, UpdateProfileProfileInput } from './profile.schema.js'; // <-- renombrado

// Listar todos los perfiles
export async function listProfiles() {
  return prisma.profile.findMany({
    include: {
      user: { select: { id: true, email: true, name: true } }
    },
    orderBy: { id: 'asc' }
  });
}

// Buscar perfil por ID
export async function findProfileById(id: number) {
  return prisma.profile.findUnique({
    where: { id },
    include: {
      user: { select: { id: true, email: true, name: true } }
    }
  });
}

// Crear un perfil nuevo
export async function createProfile(data: CreateProfileInput) {
  const { userId, bio, avatarUrl, location } = data;
  return prisma.profile.create({
    data: {
      userId,
      bio,
      avatarUrl,
      location
    },
    include: {
      user: { select: { id: true, email: true, name: true } }
    }
  });
}

// Actualizar perfil existente
export async function updateProfile(id: number, data: UpdateProfileProfileInput) { 
  return prisma.profile.update({
    where: { id },
    data,
    include: {
      user: { select: { id: true, email: true, name: true } }
    }
  });
}

// Eliminar perfil
export async function deleteProfile(id: number) {
  return prisma.profile.delete({ where: { id } });
}
