import { Router } from 'express';
import { auth } from '../../middleware/auth.js';
import { validate } from '../../middleware/validate.js';
import { createProfileSchema, updateProfileProfileSchema } from './profile.schema.js';
import { 
  listProfilesCtrl, 
  getProfileCtrl, 
  createProfileCtrl, 
  updateProfileCtrl, 
  deleteProfileCtrl 
} from './profile.controller.js';

const router = Router();

/**
 * @swagger
 * /api/profiles:
 *   get:
 *     summary: Lista todos los perfiles
 *     tags: [Profiles]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de perfiles
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Profile'
 *       401:
 *         description: No autorizado
 */
router.get('/', auth, listProfilesCtrl);

/**
 * @swagger
 * /api/profiles/{id}:
 *   get:
 *     summary: Obtiene un perfil por ID
 *     tags: [Profiles]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del perfil
 *     responses:
 *       200:
 *         description: Perfil encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Profile'
 *       400:
 *         description: ID inválido
 *       401:
 *         description: No autorizado
 *       404:
 *         description: Perfil no encontrado
 *   patch:
 *     summary: Actualiza un perfil por ID
 *     tags: [Profiles]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del perfil a actualizar
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateProfileProfileInput'
 *     responses:
 *       200:
 *         description: Perfil actualizado
 *       400:
 *         description: ID inválido o datos de entrada inválidos
 *       401:
 *         description: No autorizado
 *       404:
 *         description: Perfil no encontrado
 *   delete:
 *     summary: Elimina un perfil por ID
 *     tags: [Profiles]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del perfil a eliminar
 *     responses:
 *       204:
 *         description: Perfil eliminado exitosamente
 *       400:
 *         description: ID inválido
 *       401:
 *         description: No autorizado
 *       404:
 *         description: Perfil no encontrado
 */

/** Rutas */
router.get('/:id', auth, getProfileCtrl);
router.patch('/:id', auth, validate(updateProfileProfileSchema), updateProfileCtrl);
router.delete('/:id', auth, deleteProfileCtrl);
router.get('/', auth, listProfilesCtrl);
router.post('/', auth, validate(createProfileSchema), createProfileCtrl);

export default router;
