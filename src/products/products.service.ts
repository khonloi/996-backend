import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productsRepository: Repository<Product>,
  ) {}

  create(createProductDto: CreateProductDto): Promise<Product> {
    const { subcategoryId, tagIds, ...rest } = createProductDto;
    
    const product = this.productsRepository.create({
      ...rest,
      subcategory: { id: subcategoryId },
      tags: tagIds ? tagIds.map(id => ({ id })) : [],
    });
    
    return this.productsRepository.save(product);
  }

  findAll(): Promise<Product[]> {
    return this.productsRepository.find({ relations: { subcategory: true, tags: true } });
  }

  async findOne(id: number): Promise<Product> {
    const product = await this.productsRepository.findOne({ 
      where: { id },
      relations: { subcategory: true, tags: true } 
    });
    if (!product) {
      throw new NotFoundException(`Product #${id} not found`);
    }
    return product;
  }

  async update(id: number, updateProductDto: UpdateProductDto): Promise<Product> {
    const { subcategoryId, tagIds, ...rest } = updateProductDto;
    
    const product = await this.productsRepository.preload({
      id: id,
      ...rest,
      ...(subcategoryId && { subcategory: { id: subcategoryId } }),
    });

    if (!product) {
      throw new NotFoundException(`Product #${id} not found`);
    }

    if (tagIds !== undefined) {
      product.tags = tagIds.map(tagId => ({ id: tagId })) as any;
    }

    return this.productsRepository.save(product);
  }

  findByCategory(categoryId: number): Promise<Product[]> {
    return this.productsRepository.find({
      where: {
        subcategory: {
          category: { id: categoryId }
        }
      },
      relations: { subcategory: { category: true }, tags: true }
    });
  }

  findBySubcategory(subcategoryId: number): Promise<Product[]> {
    return this.productsRepository.find({
      where: {
        subcategory: { id: subcategoryId }
      },
      relations: { subcategory: true, tags: true }
    });
  }

  findByTag(tagId: number): Promise<Product[]> {
    return this.productsRepository.find({
      where: {
        tags: { id: tagId }
      },
      relations: { subcategory: true, tags: true }
    });
  }

  async remove(id: number): Promise<void> {
    const product = await this.findOne(id);
    await this.productsRepository.remove(product);
  }
}
