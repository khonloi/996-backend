import { Subcategory } from '../../subcategories/entities/subcategory.entity';
import { Tag } from '../../tags/entities/tag.entity';
import { ProductStatus } from '../enums/product-status.enum';
export declare class Product {
    id: number;
    name: string;
    description: string;
    price: number;
    count: number;
    images: string[];
    status: ProductStatus;
    subcategory: Subcategory;
    tags: Tag[];
}
