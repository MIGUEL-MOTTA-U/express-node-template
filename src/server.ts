import cors from 'cors';
import { config } from 'dotenv';
import express, { type Express } from 'express';
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';

config();

const PORT = process.env.PORT || 3000;

const server: Express = express();

const helmetPlugin = helmet({
  // https://github.com/helmetjs/helmet
  contentSecurityPolicy: true, // Enable CSP with default settings
  crossOriginEmbedderPolicy: true, // Enable COEP with default settings
  crossOriginOpenerPolicy: { policy: 'same-origin' }, // Enable COOP with same-origin policy
  crossOriginResourcePolicy: { policy: 'same-origin' }, // Enable CORP with same-origin policy
  dnsPrefetchControl: { allow: false }, // Disable DNS prefetching
  frameguard: { action: 'deny' }, // Prevent clickjacking by denying framing
  hidePoweredBy: true, // Remove the X-Powered-By header
  hsts: { maxAge: 15552000 }, // Enable HSTS with a max age of 180 days
});

// Enable CORS for all origins (you can customize this as needed)
const corsPlugin = cors({
  origin: '*', // Allow all origins
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Allowed methods
  allowedHeaders: ['Content-Type', 'Authorization'], // Allowed headers
});

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
});

// Register middlewares o plugins
server.use(corsPlugin);
server.use(helmetPlugin);
server.use(limiter);
server.use(express.json());

server.get('/fibonacci', (req, res) => {
  const n = parseInt((req.query.n as string) || '10', 10);
  const result = fibo(n);
  res.json({
    message: `Fibonacci of ${n} is: ${result}`,
    value: result,
    timestamp: new Date().toISOString(),
  });
});

server.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`📊 Try: http://localhost:${PORT}/fibonacci?n=10`);
});

const fibo = (n: number): number => {
  if (n <= 1) return n;
  return fibo(n - 1) + fibo(n - 2);
};

// Servidor HTTP básico con Node.js nativo
export { fibo };
export default server;
