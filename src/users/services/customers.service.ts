import { Injectable, NotFoundException } from '@nestjs/common';

import { Customer } from '../entities/customer.entity';
import { CreateCustomerDto, UpdateCustomerDto } from '../dtos/customer.dto';

@Injectable()
export class CustomersService {
  private counterId = 1;
  private customers: Customer[] = [
    {
      id: 1,
      name: 'Leonardo',
      lastName: 'Gonzalez',
      phone: '123456789',
    },
  ];

  findAll() {
    return this.customers;
  }

  findOne(id: number) {
    const customer = this.customers.find((customer) => customer.id === id);
    if (!customer) {
      throw new NotFoundException(`Customer ${id} not found`);
    }
    return customer;
  }

  create(payload: CreateCustomerDto) {
    this.counterId = this.counterId + 1;
    const newCustomer = {
      id: this.counterId,
      ...payload,
    };
    this.customers.push(newCustomer);
    return newCustomer;
  }

  update(id: number, payload: UpdateCustomerDto) {
    const customer = this.findOne(id);
    const index = this.customers.findIndex((customer) => customer.id === id);
    this.customers[index] = {
      ...customer,
      ...payload,
    };
    return this.customers[index];
  }

  remove(id: number) {
    const index = this.customers.findIndex((customer) => customer.id === id);
    if (index === -1) {
      throw new NotFoundException(`Customer ${id} not found`);
    }
    this.customers.splice(index, 1);
    return true;
  }
}
