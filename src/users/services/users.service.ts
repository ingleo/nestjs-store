import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';

import { User } from '../entities/user.entity';
import { CreateUserDto, UpdateUserDto } from '../dtos/user.dto';
import { CustomersService } from '../services/customers.service';
import { ProductsService } from '../../products/services/products.service';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepo: Repository<User>,
    private customerService: CustomersService,
    private productsService: ProductsService,
  ) {}

  findAll() {
    return this.userRepo.find({ relations: ['customer'] });
  }

  async findOne(id: number) {
    const user = await this.userRepo.findOneBy({ id });
    if (!user) {
      throw new NotFoundException(`User ${id} not found`);
    }
    return user;
  }

  async findByEmail(email: string) {
    const user = await this.userRepo.findOne({
      where: { email },
      select: {
        id: true,
        email: true,
        role: true,
        password: true,
      },
    });

    if (!user) {
      throw new NotFoundException(`User ${email} not found`);
    }
    return user;
  }

  async create(data: CreateUserDto) {
    const newUser = this.userRepo.create(data);
    const hashPassword = await bcrypt.hash(newUser.password, 10);
    newUser.password = hashPassword;
    if (data.customerId) {
      const customer = await this.customerService.findOne(data.customerId);
      newUser.customer = customer;
    }
    return await this.userRepo.save(newUser).catch((error) => {
      throw new ConflictException(error.detail);
    });
  }

  async update(id: number, changes: UpdateUserDto) {
    const user = await this.findOne(id);
    this.userRepo.merge(user, changes);
    return this.userRepo.save(user);
  }

  async remove(id: number) {
    const user = await this.findOne(id);
    return this.userRepo.delete(user);
  }

  /* getProductsByUser(id: number) {
    const user = this.findOne(id);
    const products = this.productsService.findAll();

    return {
      user,
      products,
    };
  } */
}
