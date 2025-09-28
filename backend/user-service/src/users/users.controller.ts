import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { UsersService } from './users.service';

@Controller()
export class UsersController {
  constructor(
    private readonly usersService: UsersService) {}

  @MessagePattern({ cmd: 'create-user' })
  async register(data: any) {
    return this.usersService.register(data);
  }

  @MessagePattern({ cmd: 'get-user-by-email' })
  async findByEmail(email: string) {
    return this.usersService.findByEmail(email);
  }

  @MessagePattern({ cmd: 'get-all-users' })
  async findAll() {
    return this.usersService.findAll();
  }

  @MessagePattern({ cmd: 'update-user' })
  async update(data: any) {

    return this.usersService.update(data.id, data);
  }
}
