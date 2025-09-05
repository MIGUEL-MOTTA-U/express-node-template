# NodeJS Backend Template

Template  para proyectos backend con Node.js, TypeScript.

Si tienes alguna sugerencia o comentario, no dudes en conactarme o hacer un fork

[Miguel Motta](https://github.com/MIGUEL-MOTTA-U)

## 🚀 Tecnologías

- **Node.js 24** + **TypeScript 5.9**
- **pnpm** - Gestor de paquetes eficiente
- **Biome** - Linting, formateo y organización de imports
- **Vitest** - Testing framework rápido
- **Nodemon** - Hot reload en desarrollo
- **Docker** - Contenerización completa

## 📦 Dependencias

### Producción
- `express` - Framework principal para APIs
- `cors` - Middleware para habilitar CORS
- `helmet` - Seguridad HTTP headers
- `express-rate-limit` - Protección contra abuso de peticiones
- `dotenv` - Variables de entorno

### Desarrollo
- `typescript` - Compilador TypeScript
- `@types/node` - Tipos para Node.js
- `nodemon` - Auto-restart en desarrollo
- `tsx` - Ejecutor TypeScript directo
- `@biomejs/biome` - Linter y formatter
- `vitest` + `@vitest/coverage-istanbul` - Testing y cobertura
- `vitest-mock-extended` - Mocking avanzado
- `typedoc` - Generador de documentación

## ⚙️ Configuración

### Biome (`biome.json`)

### Express y Plugins

El servidor Express está configurado con los siguientes middlewares:

- **Helmet**: Refuerza la seguridad HTTP con políticas como CSP, COEP, COOP, CORP, HSTS y más.
- **CORS**: Permite solicitudes desde cualquier origen (configurable).
- **express-rate-limit**: Limita el número de peticiones por IP para evitar abusos.
- **dotenv**: Carga variables de entorno desde `.env`.
- **express.json()**: Habilita el parseo de JSON en las peticiones.

Ejemplo de configuración en `src/server.ts`:

```typescript
import cors from 'cors';
import { config } from 'dotenv';
import express from 'express';
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';

config();
const server = express();
server.use(cors({ origin: '*', methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'] }));
server.use(helmet({ contentSecurityPolicy: true, hsts: { maxAge: 15552000 } }));
server.use(rateLimit({ windowMs: 15 * 60 * 1000, max: 100 }));
server.use(express.json());
```

### TypeScript (`tsconfig.json`)
- ✅ Target ES2022 con módulos NodeNext
- ✅ Strict mode habilitado
- ✅ Source maps y declaraciones
- ✅ Output en directorio `dist/`

## 🛠️ Scripts Disponibles

```bash
# Desarrollo
pnpm dev          # Ejecutar con hot reload
pnpm build        # Compilar TypeScript
pnpm start        # Ejecutar versión compilada

# Calidad de código
pnpm format       # Formatear código
pnpm lint         # Linter con auto-fix
pnpm check        # Verificación completa

# Testing
pnpm test         # Ejecutar tests
pnpm coverage     # Reporte de cobertura

# Documentación
pnpm doc          # Generar documentación
```

## 🐳 Docker

Este proyecto incluye configuración completa de Docker con múltiples entornos.

**📋 Para información detallada de Docker, consulta [DOCKER.md](./DOCKER.md)**

### Quick Start con Docker
```bash
# Desarrollo
docker-compose -f docker-compose.dev.yml up

# Imagen simple
docker build -t nodejs-back-template .
docker run -p 3000:3000 nodejs-back-template
```

## 🏗️ Estructura del Proyecto

```
├── src/
│   └── server.ts          # Servidor HTTP principal
├── test/
│   └── server.test.ts     # Tests
├── dist/                  # Código compilado
├── docs/                  # Documentación generada
├── Dockerfile             # Imagen de producción
├── Dockerfile.dev         # Multi-stage para dev/prod
├── docker-compose*.yml    # Orquestación de servicios
├── biome.json            # Configuración de linting/formato
├── tsconfig.json         # Configuración TypeScript
└── package.json          # Dependencias y scripts
```

## 🎯 Características

- ⚡ **Hot reload** en desarrollo
- 🔧 **Linting y formateo** automático
- 🧪 **Testing** configurado con Vitest
- 📚 **Documentación** automática con TypeDoc
- 🐳 **Docker** multi-entorno
- 🔒 **TypeScript estricto**
- 📦 **pnpm** para gestión eficiente de dependencias

## 🚦 Endpoints

- `GET /` - Información general del servidor
- `GET /fibonacci?n=10` - Cálculo de fibonacci

Servidor ejecutándose en: `http://localhost:3000`

