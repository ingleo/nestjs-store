import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProductDto, UpdateProductDto } from '../dtos/product.dto';
import { Product } from '../entities/product.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product) private productRepo: Repository<Product>,
  ) {}
  /* private counterId = 1;
  private products: Product[] = [
    {
      id: 1,
      name: 'Product 1',
      description: 'Is a product',
      price: 150,
      image: '',
      stock: 12,
    },
  ]; */

  findAll() {
    //return this.products;
    return this.productRepo.find();
  }

  async findOne(id: number) {
    const product = await this.productRepo.findOneBy({ id });
    if (!product) {
      throw new NotFoundException(`Product ${id} not found`);
    }
    return product;
  }

  async create(data: CreateProductDto) {
    /* const newProduct = new Product();
    newProduct.name = payload.name;
    newProduct.description = payload.description;
    newProduct.price = payload.price;
    newProduct.stock = payload.stock;
    newProduct.image = payload.image; */

    const newProduct = this.productRepo.create(data);
    return await this.productRepo.save(newProduct).catch((error) => {
      throw new ConflictException(error.detail);
    });
  }

  async update(id: number, changes: UpdateProductDto) {
    const product = await this.findOne(id);
    this.productRepo.merge(product, changes);
    return this.productRepo.save(product);
  }

  async remove(id: number) {
    const product = await this.findOne(id);
    return this.productRepo.delete(product);
  }
}
