import { Module, MiddlewareConsumer } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LoggingMiddleware } from './middleware/logging.middleware';
import { PermissionGuard } from './guards/permission.guard';
import { User } from './entities/User.entity';
import { Role } from './entities/role.entity';
import { Module as ModuleEntity } from './entities/module.entity';
import { Permission } from './entities/permission.entity';
import { Link } from './entities/link.entity';
import { UserController } from './controllers/user.controller';
import { UserService } from './services/user.service';
import { DatabaseSeeder } from './seeders/database.seeder';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'database.sqlite',
      entities: [User, Role, ModuleEntity, Permission, Link],
      synchronize: true, // Solo para desarrollo
    }),
    TypeOrmModule.forFeature([User, Role, ModuleEntity, Permission, Link]),
  ],
  controllers: [AppController, UserController],
  providers: [AppService, PermissionGuard, UserService, DatabaseSeeder],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggingMiddleware).forRoutes('*'); // Apply to all routes
  }
}
