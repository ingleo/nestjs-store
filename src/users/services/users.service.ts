import { Injectable, NotFoundException } from '@nestjs/common';

import { User } from '../entities/user.entity';
import { CreateUserDto, UpdateUserDto } from '../dtos/user.dto';
import { ProductsService } from '../../products/services/products.service';

@Injectable()
export class UsersService {
  constructor(private productsService: ProductsService) {}
  private counterId = 1;
  private users: User[] = [
    {
      id: 1,
      email: 'correo@gmail.com',
      password: '12345',
      role: 'admin',
    },
  ];

  findAll() {
    return this.users;
  }

  findOne(id: number) {
    const user = this.users.find((user) => user.id === id);
    if (!user) {
      throw new NotFoundException(`User ${id} not found`);
    }
    return user;
  }

  create(payload: CreateUserDto) {
    this.counterId = this.counterId + 1;
    const newUser = {
      id: this.counterId,
      ...payload,
    };
    this.users.push(newUser);
    return newUser;
  }

  update(id: number, payload: UpdateUserDto) {
    const user = this.findOne(id);
    const index = this.users.findIndex((user) => user.id === id);
    this.users[index] = {
      ...user,
      ...payload,
    };
    return this.users[index];
  }

  remove(id: number) {
    const index = this.users.findIndex((user) => user.id === id);
    if (index === -1) {
      throw new NotFoundException(`User ${id} not found`);
    }
    this.users.splice(index, 1);
    return true;
  }

  getProductsByUser(id: number) {
    const user = this.findOne(id);
    const products = this.productsService.findAll();

    return {
      user,
      products,
    };
  }
}
