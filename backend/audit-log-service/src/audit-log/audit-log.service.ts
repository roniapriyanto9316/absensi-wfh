import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AuditLog } from './audit-log.entity';

@Injectable()
export class AuditLogService {
  constructor(
    @InjectRepository(AuditLog)
    private auditLogRepository: Repository<AuditLog>,
  ) {}

  async createLog(
    action: string,
    performedBy?: number,
    payload?: any,
    timestamp?: Date,
  ) {
    const log = this.auditLogRepository.create({
      action,
      performedBy,
      data: payload,
      createdAt: timestamp || new Date(),
    });

    return this.auditLogRepository.save(log);
  }
}
