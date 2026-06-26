import { Subcategory } from '../../subcategories/entities/subcategory.entity';
export declare class Category {
    id: number;
    name: string;
    description: string;
    image: string;
    subcategories: Subcategory[];
}
