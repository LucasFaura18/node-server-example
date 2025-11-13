import type { Request, Response } from 'express';
import {
  listProfiles,
  findProfileById,
  createProfile,
  updateProfile,
  deleteProfile
} from './profile.service.js';

// Obtener todos los perfiles
export async function listProfilesCtrl(_req: Request, res: Response) {
  try {
    const profiles = await listProfiles();
    res.json(profiles);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

// Obtener un perfil por ID
export async function getProfileCtrl(req: Request, res: Response) {
  try {
    const id = Number(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ message: 'ID inválido' });
    }

    const profile = await findProfileById(id);
    if (!profile) {
      return res.status(404).json({ message: 'Perfil no encontrado' });
    }

    res.json(profile);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

// Crear un nuevo perfil
export async function createProfileCtrl(req: Request, res: Response) {
  try {
    const newProfile = await createProfile(req.body);
    res.status(201).json(newProfile);
  } catch (error: any) {
    if (error.code === 'P2003') {
      return res.status(400).json({ message: 'El usuario asociado no existe' });
    }
    res.status(500).json({ message: error.message });
  }
}

// Actualizar un perfil existente
export async function updateProfileCtrl(req: Request, res: Response) {
  try {
    const id = Number(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ message: 'ID inválido' });
    }

    const updated = await updateProfile(id, req.body);
    res.json(updated);
  } catch (error: any) {
    if (error.code === 'P2025') {
      return res.status(404).json({ message: 'Perfil no encontrado' });
    }
    res.status(500).json({ message: error.message });
  }
}

// Eliminar un perfil
export async function deleteProfileCtrl(req: Request, res: Response) {
  try {
    const id = Number(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ message: 'ID inválido' });
    }

    await deleteProfile(id);
    res.status(204).send();
  } catch (error: any) {
    if (error.code === 'P2025') {
      return res.status(404).json({ message: 'Perfil no encontrado' });
    }
    res.status(500).json({ message: error.message });
  }
}
