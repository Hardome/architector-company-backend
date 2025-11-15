import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
// import compression from 'compression';
// import rateLimit from 'express-rate-limit';

import {config} from '#config';
import {projects, media} from '#routes';
import {errorHandler, injectExtensions} from '#middlewares';

const app = express();

// Security middleware
app.use(helmet());
app.use(cors({
  origin: config.frontendUrl,
  credentials: true
}));

// Rate limiting
// const limiter = rateLimit({
//   windowMs: 15 * 60 * 1000, // 15 minutes
//   max: 100, // limit each IP to 100 requests per windowMs
//   message: 'Too many requests from this IP, please try again later.',
// });

// app.use(limiter);

// Body parsing middleware
app.use(express.json({limit: '10mb'}));
app.use(express.urlencoded({extended: true}));

// Compression
// app.use(compression());

// Logging
app.use(morgan('combined'));

app.use(injectExtensions);

app.use('/uploads', express.static(config.uploadsDir));
app.use('/api/projects', projects);
app.use('/api/media', media);

app.use(errorHandler);

app.get('/api/health', (req, res) => {
  res.json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    environment: config.nodeEnv
  });
});

app.listen(config.port, () => {
  // eslint-disable-next-line no-console
  console.log(`Backend server running on port ${config.port}`);
  // eslint-disable-next-line no-console
  console.log(`Environment: ${config.nodeEnv}`);
  // eslint-disable-next-line no-console
  console.log(`Uploads directory: ${config.uploadsDir}`);
});