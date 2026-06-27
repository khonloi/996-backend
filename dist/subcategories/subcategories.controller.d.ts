import { SubcategoriesService } from './subcategories.service';
import { CreateSubcategoryDto } from './dto/create-subcategory.dto';
import { UpdateSubcategoryDto } from './dto/update-subcategory.dto';
export declare class SubcategoriesController {
    private readonly subcategoriesService;
    constructor(subcategoriesService: SubcategoriesService);
    create(createSubcategoryDto: CreateSubcategoryDto | CreateSubcategoryDto[]): Promise<import("./entities/subcategory.entity").Subcategory[]> | Promise<import("./entities/subcategory.entity").Subcategory>;
    findAll(): Promise<import("./entities/subcategory.entity").Subcategory[]>;
    findOne(id: string): Promise<import("./entities/subcategory.entity").Subcategory>;
    update(id: string, updateSubcategoryDto: UpdateSubcategoryDto): Promise<import("./entities/subcategory.entity").Subcategory>;
    remove(id: string): Promise<void>;
}
