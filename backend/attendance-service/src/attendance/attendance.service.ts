import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RpcException } from '@nestjs/microservices';
import { Repository } from 'typeorm';
import { Attendance } from './attendance.entity';

@Injectable()
export class AttendanceService {
  constructor(
    @InjectRepository(Attendance)
    private readonly attendanceRepo: Repository<Attendance>,
  ) {}

  async createAttendance(userId: number, type: 'clockin' | 'clockout', note?: string) {
    
    const last = await this.attendanceRepo.findOne({
      where: { userId },
      order: { id: 'DESC' },
    });

    if (type === 'clockin') {
      if (last?.clockInAt && !last?.clockOutAt) {
        throw new RpcException('You have already clocked in and not clocked out yet.');
      }

      const attendance = this.attendanceRepo.create({
        userId,
        clockInAt: new Date(),
        note,
      });

      return this.attendanceRepo.save(attendance);
    }

    if (type === 'clockout') {
      if (!last?.clockInAt) {
        throw new RpcException('Cannot clock out without clocking in first.');
      }
      if (last.clockOutAt) {
        throw new RpcException('You have already clocked out.');
      }

      last.clockOutAt = new Date();
      if (note) last.note = note;

      return this.attendanceRepo.save(last);
    }

    throw new RpcException('Invalid attendance type.');
  }

  async getAttendanceHistory(
    userId: number,
    startDate?: string,
    endDate?: string,
    ) {
    const query = this.attendanceRepo.createQueryBuilder('attendance')
        .where('attendance.userId = :userId', { userId });

    if (startDate) {
        query.andWhere('attendance.clockInAt >= :startDate', { startDate });
    }

    if (endDate) {
        query.andWhere('attendance.clockInAt <= :endDate', { endDate });
    }

    return query.orderBy('attendance.clockInAt', 'DESC').getMany();
  }
}
