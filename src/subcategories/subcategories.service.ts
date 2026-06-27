import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateSubcategoryDto } from './dto/create-subcategory.dto';
import { UpdateSubcategoryDto } from './dto/update-subcategory.dto';
import { Subcategory } from './entities/subcategory.entity';

@Injectable()
export class SubcategoriesService {
  constructor(
    @InjectRepository(Subcategory)
    private readonly subcategoriesRepository: Repository<Subcategory>,
  ) {}

  create(createSubcategoryDto: CreateSubcategoryDto | CreateSubcategoryDto[]) {
    if (Array.isArray(createSubcategoryDto)) {
      const subcategoriesData = createSubcategoryDto.map(dto => ({
        ...dto,
        category: { id: dto.categoryId }
      }));
      const subcategories = this.subcategoriesRepository.create(subcategoriesData);
      return this.subcategoriesRepository.save(subcategories);
    }
    const subcategory = this.subcategoriesRepository.create({
      ...createSubcategoryDto,
      category: { id: createSubcategoryDto.categoryId }
    });
    return this.subcategoriesRepository.save(subcategory);
  }

  findAll(): Promise<Subcategory[]> {
    return this.subcategoriesRepository.find({ relations: { category: true } });
  }

  async findOne(id: number): Promise<Subcategory> {
    const subcategory = await this.subcategoriesRepository.findOne({ 
      where: { id },
      relations: { category: true }
    });
    if (!subcategory) {
      throw new NotFoundException(`Subcategory #${id} not found`);
    }
    return subcategory;
  }

  async update(id: number, updateSubcategoryDto: UpdateSubcategoryDto): Promise<Subcategory> {
    const subcategory = await this.subcategoriesRepository.preload({
      id: id,
      ...updateSubcategoryDto,
      ...(updateSubcategoryDto.categoryId && { category: { id: updateSubcategoryDto.categoryId } })
    });
    if (!subcategory) {
      throw new NotFoundException(`Subcategory #${id} not found`);
    }
    return this.subcategoriesRepository.save(subcategory);
  }

  async remove(id: number): Promise<void> {
    const subcategory = await this.findOne(id);
    await this.subcategoriesRepository.remove(subcategory);
  }
}
