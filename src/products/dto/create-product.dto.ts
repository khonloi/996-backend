import { ProductStatus } from '../enums/product-status.enum';

export class CreateProductDto {
  name: string;
  description?: string;
  price?: number;
  count?: number;
  images?: string[];
  status?: ProductStatus;
  subcategoryId: number;
  tagIds?: number[];
}
