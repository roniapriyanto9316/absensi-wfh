import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { AuditLogModule } from './audit-log/audit-log.module';
import { AuditLog } from './audit-log/audit-log.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.LOG_DB_HOST || 'localhost',
      port: Number(process.env.LOG_DB_PORT) || 5432,
      username: process.env.LOG_DB_USER || 'dbuser',
      password: process.env.LOG_DB_PASS || 'pass',
      database: process.env.LOG_DB_NAME || 'dbname',
      entities: [AuditLog],
      synchronize: true,
    }),

    AuditLogModule,
  ],
})
export class AppModule {}
