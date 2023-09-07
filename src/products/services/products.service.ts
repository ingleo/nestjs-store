import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateProductDto, UpdateProductDto } from '../dtos/product.dto';
import { Product } from '../entities/product.entity';
import { BrandsService } from './brands.service';
import { CategoriesService } from './categories.service';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product) private productRepo: Repository<Product>,
    private brandsService: BrandsService,
    private categoriesService: CategoriesService,
  ) {}

  findAll() {
    return this.productRepo.find({ relations: ['brand', 'categories'] });
  }

  async findOne(id: number) {
    const product = await this.productRepo.findOne({
      where: { id },
      relations: {
        brand: true,
        categories: true,
      },
    });
    if (!product) {
      throw new NotFoundException(`Product ${id} not found`);
    }
    return product;
  }

  async create(data: CreateProductDto) {
    const newProduct = this.productRepo.create(data);
    if (data.brandId) {
      const brand = await this.brandsService.findOneNoProducts(data.brandId);
      newProduct.brand = brand;
    }

    if (data.categoriesIds) {
      const categories = await this.categoriesService.findMultiple(
        data.categoriesIds,
      );
      newProduct.categories = categories;
    }
    return await this.productRepo.save(newProduct).catch((error) => {
      throw new ConflictException(error.detail);
    });
  }

  async update(id: number, changes: UpdateProductDto) {
    const product = await this.findOne(id);
    if (changes.brandId) {
      const brand = await this.brandsService.findOne(changes.brandId);
      product.brand = brand;
    }

    if (changes.categoriesIds) {
      const categories = await this.categoriesService.findMultiple(
        changes.categoriesIds,
      );
      product.categories = categories;
    }
    this.productRepo.merge(product, changes);
    return this.productRepo.save(product);
  }

  async remove(id: number) {
    const product = await this.findOne(id);
    return this.productRepo.delete(product);
  }

  async removeCategoryByProduct(id: number, categoryId: number) {
    const product = await this.findOne(id);
    product.categories = product.categories.filter(
      (category) => category.id !== categoryId,
    );
    return this.productRepo.save(product);
  }

  async addCategoryByProduct(id: number, categoryId: number) {
    const product = await this.findOne(id);
    const category = await this.categoriesService.findOne(categoryId);

    product.categories.push(category);
    return this.productRepo.save(product);
  }
}
