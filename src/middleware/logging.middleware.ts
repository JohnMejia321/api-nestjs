import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggingMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const { method, originalUrl } = req;
    const userAgent = req.get('User-Agent') || '';
    const ip = req.ip || req.connection.remoteAddress;

    // Log sensitive operations (e.g., POST, PUT, DELETE)
    if (['POST', 'PUT', 'DELETE'].includes(method)) {
      console.log(`[SENSITIVE OPERATION] ${method} ${originalUrl} - IP: ${ip} - User-Agent: ${userAgent}`);
    }

    next();
  }
}