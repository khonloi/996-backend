import { Repository } from 'typeorm';
import { CreateSubcategoryDto } from './dto/create-subcategory.dto';
import { UpdateSubcategoryDto } from './dto/update-subcategory.dto';
import { Subcategory } from './entities/subcategory.entity';
export declare class SubcategoriesService {
    private readonly subcategoriesRepository;
    constructor(subcategoriesRepository: Repository<Subcategory>);
    create(createSubcategoryDto: CreateSubcategoryDto): Promise<Subcategory>;
    findAll(): Promise<Subcategory[]>;
    findOne(id: number): Promise<Subcategory>;
    update(id: number, updateSubcategoryDto: UpdateSubcategoryDto): Promise<Subcategory>;
    remove(id: number): Promise<void>;
}
