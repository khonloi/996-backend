export class CreateCategoryDto {
  name: string;
  description?: string;
  image?: string;
  subcategories?: {
    name: string;
    description?: string;
    image?: string;
  }[];
}
