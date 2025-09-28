import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { AttendanceModule } from './attendance/attendance.module';
import { Attendance } from './attendance/attendance.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST || 'localhost',
      port: Number(process.env.DB_PORT) || 5432,
      username: process.env.DB_USER || 'dbuser',
      password: process.env.DB_PASS || 'pass',
      database: process.env.DB_NAME || 'dbname',
      entities: [Attendance],
      synchronize: true,
    }),

    AttendanceModule,
  ],
})
export class AppModule {}
