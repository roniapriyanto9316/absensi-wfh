import { Controller } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';
import { AuditLogService } from './audit-log.service';

@Controller()
export class AuditLogController {
  constructor(private auditLogService: AuditLogService) {}

  @EventPattern('log_event')
  async handleLogEvent(data: {
    action: string;
    performedBy?: number;
    payload?: any;
    timestamp?: Date;
  }) {
    return this.auditLogService.createLog(
      data.action,
      data.performedBy,
      data.payload,
      data.timestamp,
    );
  }
}
