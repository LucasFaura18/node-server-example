import swaggerJsdoc from 'swagger-jsdoc';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { env } from './env.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API Express + PostgreSQL',
      version: '1.0.0',
      description: 'API REST con autenticación JWT, validación Zod, rate limiting y testing completo',
      contact: {
        name: 'API Support',
      },
    },
    servers: [
      {
        url: `http://localhost:${env.PORT}`,
        description: 'Servidor de desarrollo',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
      schemas: {
        /** USER SCHEMAS */
        User: {
          type: 'object',
          properties: {
            id: {
              type: 'integer',
              description: 'ID del usuario',
            },
            email: {
              type: 'string',
              format: 'email',
              description: 'Email del usuario',
            },
            name: {
              type: 'string',
              description: 'Nombre del usuario',
            },
            createdAt: {
              type: 'string',
              format: 'date-time',
              description: 'Fecha de creación',
            },
          },
        },
        RegisterInput: {
          type: 'object',
          required: ['email', 'name', 'password'],
          properties: {
            email: {
              type: 'string',
              format: 'email',
              description: 'Email del usuario',
            },
            name: {
              type: 'string',
              minLength: 2,
              description: 'Nombre del usuario',
            },
            password: {
              type: 'string',
              minLength: 8,
              description: 'Contraseña del usuario',
            },
          },
        },
        LoginInput: {
          type: 'object',
          required: ['email', 'password'],
          properties: {
            email: {
              type: 'string',
              format: 'email',
              description: 'Email del usuario',
            },
            password: {
              type: 'string',
              minLength: 8,
              description: 'Contraseña del usuario',
            },
          },
        },
        AuthResponse: {
          type: 'object',
          properties: {
            user: {
              $ref: '#/components/schemas/User',
            },
            token: {
              type: 'string',
              description: 'JWT token',
            },
          },
        },
        UpdateProfileInput: {
          type: 'object',
          properties: {
            email: {
              type: 'string',
              format: 'email',
              description: 'Email actualizado del usuario',
            },
            name: {
              type: 'string',
              minLength: 2,
              description: 'Nombre actualizado del usuario',
            },
          },
        },
        ChangePasswordInput: {
          type: 'object',
          required: ['currentPassword', 'newPassword'],
          properties: {
            currentPassword: {
              type: 'string',
              description: 'Contraseña actual del usuario',
            },
            newPassword: {
              type: 'string',
              minLength: 8,
              description: 'Nueva contraseña del usuario',
            },
          },
        },
        /** PROFILE SCHEMAS */
        Profile: {
          type: 'object',
          properties: {
            id: {
              type: 'integer',
              description: 'ID del perfil',
            },
            userId: {
              type: 'integer',
              description: 'ID del usuario asociado',
            },
            bio: {
              type: 'string',
              description: 'Biografía del usuario',
              nullable: true,
            },
            avatarUrl: {
              type: 'string',
              description: 'URL del avatar del usuario',
              nullable: true,
            },
            location: {
              type: 'string',
              description: 'Ubicación del usuario',
              nullable: true,
            },
            createdAt: {
              type: 'string',
              format: 'date-time',
              description: 'Fecha de creación del perfil',
            },
            updatedAt: {
              type: 'string',
              format: 'date-time',
              description: 'Fecha de actualización del perfil',
            },
            user: {
              $ref: '#/components/schemas/User',
            },
          },
        },
        CreateProfileInput: {
          type: 'object',
          required: ['userId'],
          properties: {
            userId: {
              type: 'integer',
              description: 'ID del usuario asociado',
            },
            bio: {
              type: 'string',
              description: 'Biografía del usuario',
              nullable: true,
            },
            avatarUrl: {
              type: 'string',
              description: 'URL del avatar del usuario',
              nullable: true,
            },
            location: {
              type: 'string',
              description: 'Ubicación del usuario',
              nullable: true,
            },
          },
        },
        UpdateProfileProfileInput: { 
          type: 'object',
          properties: {
            bio: {
              type: 'string',
              description: 'Biografía actualizada del usuario',
              nullable: true,
            },
            avatarUrl: {
              type: 'string',
              description: 'URL del avatar actualizado',
              nullable: true,
            },
            location: {
              type: 'string',
              description: 'Ubicación actualizada del usuario',
              nullable: true,
            },
          },
        },
        Error: {
          type: 'object',
          properties: {
            message: {
              type: 'string',
            },
          },
        },
      },
    },
    tags: [
      {
        name: 'Auth',
        description: 'Endpoints de autenticación',
      },
      {
        name: 'Users',
        description: 'Gestión de usuarios',
      },
      {
        name: 'Profiles',
        description: 'Gestión de perfiles de usuario',
      },
    ],
  },
  apis: [join(__dirname, '../modules/**/*.routes.js')],
};

export const swaggerSpec = swaggerJsdoc(options);
