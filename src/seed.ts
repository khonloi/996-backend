import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DataSource } from 'typeorm';
import { Category } from './categories/entities/category.entity';
import { Subcategory } from './subcategories/entities/subcategory.entity';

async function bootstrap() {
  console.log('Starting database seeding...');
  const app = await NestFactory.createApplicationContext(AppModule);

  try {
    const dataSource = app.get(DataSource);
    const categoryRepo = dataSource.getRepository(Category);
    const subcategoryRepo = dataSource.getRepository(Subcategory);

    // 1. Seed 'Grocery' Category
    let category = await categoryRepo.findOne({ where: { name: 'Grocery' } });
    if (!category) {
      category = categoryRepo.create({
        name: 'Grocery',
        description: 'Fresh groceries, beverages, pantry items, and more',
      });
      category = await categoryRepo.save(category);
      console.log(`[Success] Created category: "${category.name}"`);
    } else {
      console.log(`[Info] Category "${category.name}" already exists.`);
    }

    // 2. Seed Grocery Subcategories
    const subcategoriesToSeed = [
      'Fresh Produce',
      'Dairy & Eggs',
      'Meat & Seafood',
      'Pantry',
      'Canned',
      'Beverages',
      'Snack',
    ];

    for (const subcategoryName of subcategoriesToSeed) {
      let subcategory = await subcategoryRepo.findOne({
        where: {
          name: subcategoryName,
          category: { id: category.id },
        },
      });

      if (!subcategory) {
        subcategory = subcategoryRepo.create({
          name: subcategoryName,
          category: category,
        });
        await subcategoryRepo.save(subcategory);
        console.log(
          `[Success] Created subcategory: "${subcategoryName}" under Grocery`,
        );
      } else {
        console.log(
          `[Info] Subcategory "${subcategoryName}" already exists under Grocery.`,
        );
      }
    }

    console.log('Seeding completed successfully!');
  } catch (error) {
    console.error('[Error] Seeding failed:', error);
  } finally {
    await app.close();
    console.log('Nest application context closed.');
  }
}

bootstrap();
