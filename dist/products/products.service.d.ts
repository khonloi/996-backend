import { Repository } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';
export declare class ProductsService {
    private readonly productsRepository;
    constructor(productsRepository: Repository<Product>);
    create(createProductDto: CreateProductDto): Promise<Product>;
    findAll(): Promise<Product[]>;
    findOne(id: number): Promise<Product>;
    update(id: number, updateProductDto: UpdateProductDto): Promise<Product>;
    findByCategory(categoryId: number): Promise<Product[]>;
    findBySubcategory(subcategoryId: number): Promise<Product[]>;
    findByTag(tagId: number): Promise<Product[]>;
    remove(id: number): Promise<void>;
}
