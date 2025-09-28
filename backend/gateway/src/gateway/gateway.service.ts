import { Injectable, Inject, Body } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class GatewayService {
  constructor(
    @Inject('AUTH_SERVICE') private authClient: ClientProxy,
    @Inject('LOG_SERVICE') private logClient: ClientProxy,
    @Inject('USER_SERVICE') private userClient: ClientProxy,
    @Inject('ATTENDANCE_SERVICE') private attendanceClient: ClientProxy,
    private jwtService: JwtService,
  ) {}

  // JWT validation
  verifyToken(token: string) {
    try {
      return this.jwtService.verify(token);
    } catch {
      return null;
    }
  }

  async login(data: { email: string; password: string }) {
    return firstValueFrom(this.authClient.send({ cmd: 'login' }, data));
  }

  async createUser(userId: number, body: any) {
    // kirim log ke logging service
    this.logClient.emit('log_event', {
      action: 'create_user',
      performedBy: userId,
      payload: body,
      timestamp: new Date(),
    });

    // kirim data ke user service
    return firstValueFrom(this.userClient.send({ cmd: 'create-user' }, body));
  }

  async updateUser(userId: number, body: any) {
    // kirim log ke logging service
    this.logClient.emit('log_event', {
      action: 'update_user',
      performedBy: userId,
      payload: body,
      timestamp: new Date(),
    });

    // kirim data ke user service
    return firstValueFrom(this.userClient.send({ cmd: 'update-user' }, body));
  }

  async findUserByEmail(email: string) {
    return firstValueFrom(this.userClient.send({ cmd: 'get-user-by-email' }, email));
  }

  async createAttendance(data: { userId: number; type: 'clockin' | 'clockout'; note?: string }) {
    const userId = data.userId;
    const observable = this.attendanceClient.send(
      { cmd: 'attendance_action' },
      { userId, type: data.type, note: data.note }
    );
    try {
      return await firstValueFrom(observable);
    } catch (err) {
      // Tangkap pesan error dari microservice
      return { status: 'error', message: err.message || 'Internal server error' };
    }
  }

  async historyAttendance(data: { userId: number; startDate?: string; endDate?: string }) {
    const userId = data.userId;
    const observable = this.attendanceClient.send(
      { cmd: 'get-attendance-history' },
      { userId, startDate: data.startDate, endDate: data.endDate },
    );
    return firstValueFrom(observable);
  }

  
}
