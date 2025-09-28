import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { AttendanceService } from './attendance.service';

@Controller()
export class AttendanceController {
  constructor(private readonly attendanceService: AttendanceService) {}

  @MessagePattern({ cmd: 'attendance_action' })
  async handleAttendance(data: { userId: number; type: 'clockin' | 'clockout'; note?: string }) {
    return this.attendanceService.createAttendance(data.userId, data.type, data.note);
  }

  @MessagePattern({ cmd: 'get-attendance-history' })
  async history(data: { userId: number; startDate?: string; endDate?: string }) {
    return this.attendanceService.getAttendanceHistory(data.userId, data.startDate, data.endDate);
  }
}
