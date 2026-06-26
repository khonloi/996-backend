import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, ManyToMany, JoinTable } from 'typeorm';
import { Subcategory } from '../../subcategories/entities/subcategory.entity';
import { Tag } from '../../tags/entities/tag.entity';
import { ProductStatus } from '../enums/product-status.enum';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column('text', { nullable: true })
  description: string;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  price: number;

  @Column({ type: 'int', default: 0 })
  count: number;

  @Column('text', { array: true, default: [] })
  images: string[];

  @Column({
    type: 'enum',
    enum: ProductStatus,
    default: ProductStatus.DRAFT,
  })
  status: ProductStatus;

  @ManyToOne(() => Subcategory, { onDelete: 'CASCADE' })
  subcategory: Subcategory;

  @ManyToMany(() => Tag, tag => tag.products)
  @JoinTable()
  tags: Tag[];
}
