import { ProductStatus } from '../enums/product-status.enum';
export declare class CreateProductDto {
    name: string;
    description?: string;
    price?: number;
    count?: number;
    images?: string[];
    status?: ProductStatus;
    subcategoryId: number;
    tagIds?: number[];
}
