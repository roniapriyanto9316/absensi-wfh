import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcryptjs';
import { EventPattern } from '@nestjs/microservices';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepo: Repository<User>,
  ) {}

  // Create user
  async register(data: any) {
    const hashed = bcrypt.hashSync(data.password, 10);
    const user = this.userRepo.create({ ...data, password: hashed });
    return this.userRepo.save(user);
  }

  async findByEmail(email: string) {
    return this.userRepo.findOneBy({ email });
  }

  async findAll() {
    return this.userRepo.find();
  }

  async update(uid: number, data: any) {
    
    if (!data) throw new Error('No data provided');
    
    const user = await this.userRepo.findOne({ where: { id: uid } });
    if (!user) throw new Error('User not found');

    if (data.phone !== undefined) user.phone = data.phone;
    if (data.photo !== undefined) user.photo = data.photo;
    if (data.password !== undefined) {
      user.password = await bcrypt.hash(data.password, 10);

    return this.userRepo.save(user);
    
    }
  }

}
