import { Product } from '../../products/entities/product.entity';
export declare class Tag {
    id: number;
    name: string;
    description: string;
    image: string;
    products?: Product[];
}
