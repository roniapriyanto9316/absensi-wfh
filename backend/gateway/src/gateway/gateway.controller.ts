import { Controller, Post, Body, UseGuards, Req, Put  } from '@nestjs/common';
import { GatewayService } from './gateway.service';
import { JwtAuthGuard } from '../jwt-auth.guard';

@Controller()
export class GatewayController {
  constructor(private gatewayService: GatewayService) {}

  @Post('auth/login')
  async login(@Body() body: { email: string; password: string }) {
    return this.gatewayService.login(body);
  }

  @UseGuards(JwtAuthGuard)
  @Post('users')
  async createUser(
    @Req() req,
    @Body() body: any,
  ) {
    const userId = req.user.sub;
    return this.gatewayService.createUser(userId, body);
  }

  @Post('users/bypass')
  async createUserbp(
    @Body() body: any,
  ) {
    const userId = 0;
    return this.gatewayService.createUser(userId, body);
  }
  
  @UseGuards(JwtAuthGuard)
  @Put('users')
  async updateUser(
    @Req() req,
    @Body() body: { id: number; phone?: string; photo?: string; password?: string },
  ) {
    const userId = req.user.sub;
    return this.gatewayService.updateUser(userId, body);
  }

  @UseGuards(JwtAuthGuard)
  @Post('attendance')
  async attendance(
    @Req() req,
    @Body() body: { type: 'clockin' | 'clockout'; note?: string },
  ) {
    const userId = req.user.sub;
    return this.gatewayService.createAttendance({ userId, ...body });
  }

  @UseGuards(JwtAuthGuard)
  @Post('attendance/history')
  async attendanceHistory(
    @Req() req,
    @Body() body: { startDate?: string; endDate?: string; userId?: number },
  ) {
    const userId = body.userId ?? req.user.sub;
    return this.gatewayService.historyAttendance({ userId, ...body });
  }

}
